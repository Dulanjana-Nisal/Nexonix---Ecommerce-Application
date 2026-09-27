import { useEffect, useState } from 'react';
import './Orders.css';
import api from '../../../services/auth';
import { useSearchParams } from 'react-router-dom';
import { Message } from '../../../context/MessagesContext';
import LoadingComponent from '../../Components/Loading/LoadingComponent';
import OrderHeader from './OrderHeader';
import OrderEmptyOrderContainer from './OrderEmptyOrderContainer';
import OrderBodyContainer from './OrderBodyContainer';
import OrderListResponsiveContainer from './OrderListResponsiveContainer';
import OrderFooter from './OrderFooter';

function Orders() {

    //load context
    const { setupMessage } = Message()

    // orders states
    const [orders, setOrders] = useState([])
    const [allOrders, setAllOrders] = useState([])
    const [allOrdersCounts, setAllOrdersCounts] = useState([])
    const [orderSearchValue, setOrderSearchValue] = useState("")
    const [productSearchValue, setProductSearchValue] = useState("")
    const [toggleView, setToggleView] = useState({ toggle: false, orderId: null })
    const [toggleEdit, setToggleEdit] = useState({ toggle: false, orderId: null })
    const [updateDetails, setUpdateDetails] = useState({ orderId: null, status: null })
    const [loading, setLoading] = useState(false)
    const [relaod, setReload] = useState(false)

    // get query data from url
    const [queryData, setQueryData] = useSearchParams()

    // get search value form query data
    const searchQueryByProduct = queryData.get('searchByProduct') || ""
    const searchQueryByUserId = queryData.get('serchByUserId') || ""

    // get Order ID form query data
    const orderId = queryData.get('orderId') || ""

    // get status value form query data
    const statusValue = queryData.get('status') || ""

    // get page from query data
    const page = Number(queryData.get('page')) || 1

    // orders use effescts
    useEffect(() => {
        const fetchOrderData = async () => {
            setLoading(true)
            try {
                const result = await api.get(`/orders/all?searchByProduct=${searchQueryByProduct}&serchByUserId=${searchQueryByUserId}&status=${statusValue}&page=${page}&orderId=${orderId}`)
                const allResult = await api.get(`/orders/all?limit=1`)
                setOrders(result.data.data)
                setAllOrders(allResult.data.data)
                setAllOrdersCounts(result.data)
            }
            catch (err) {
                console.log(err.response)
            }
            finally {
                setLoading(false)
            }
        }
        fetchOrderData();
    }, [searchQueryByProduct, searchQueryByUserId, queryData, statusValue, page, relaod, orderId])

    // update orders
    const updateOrders = async (userId) => {
        try {
            await api.patch(`/orders/${updateDetails.orderId}`,
                {
                    status: updateDetails.status
                }
            )

            const orderMessage = {
                "Delivered": `Your order ID: ${updateDetails.orderId} has been successfully delivered. We hope you enjoy your purchase! Thank you for choosing us`,
                "Shipped": `Good news! Your order ID: ${updateDetails.orderId} has been shipped and is on its way.`,
                "Cancelled": `Your order ID: ${updateDetails.orderId} has been cancelled. If a payment was made, the refund will be processed shortly. For assistance, please contact support`
            }

            // post notification for order placed
            try {
                await api.post('notifications/',
                    {
                        "userId": userId,
                        "type": "orders",
                        "receiver": "user",
                        "title": `Order Status Update`,
                        "message": orderMessage[updateDetails.status]
                    }
                )
            }
            catch (err) {
                console.log(err.response)
            }

            setupMessage('success', `Order (ID: ${updateDetails.orderId}) is Updated Successfully`, 'Order Updated!')
            setReload(prev => !prev)
        }

        catch (err) {
            console.log(err.response)
            setupMessage('error', `Order (ID: ${updateDetails.orderId}) is Faild to update!!`, 'Update Faild!',)
        }
    }

    //delete cancelled order
    const deleteCancelledOrder = async (delOrderId) => {
        try {
            await api.delete(`/orders/${delOrderId}`);
            setupMessage('success', `Cancelled Order (ID: ${delOrderId}) is deleted successfully!`, 'Order Deleted')
        }
        catch (err) {
            console.log(err.response)
            setupMessage('error', `Error while Order (ID: ${delOrderId}) is deletion proseed!`, 'Order Deletion Faild!')
        }
    }

    // Filter orders by status
    const filterbyStatus = (value) => {
        const newQuery = new URLSearchParams(queryData)
        if (value) {
            newQuery.set('status', value)
        }
        if (!value) {
            newQuery.delete('status')
        }
        setQueryData(newQuery)
    }

    // search orders
    const searchOrders = () => {
        const newquery = new URLSearchParams(queryData);
        if (orderSearchValue.length <= 1 && productSearchValue.length <= 1) {
            setupMessage('error', 'Please Enter more than 1 value to search...', "Search Faild!")
            return
        }
        if (orderSearchValue.length > 1) {
            if (orderSearchValue.length !== 24) {
                setupMessage('error', 'User ID must be 24 characters!', "Search Faild!")
                return
            }
            newquery.set('orderId', orderSearchValue)
            newquery.set('page', 1)
        }
        if (productSearchValue.length >= 2) {
            newquery.set('searchByProduct', productSearchValue)
            newquery.set('page', 1)
        }
        setQueryData(newquery)
    }

    // reset button
    const resetOrders = () => {
        setQueryData({})
        setOrderSearchValue("")
        setProductSearchValue("")
    }

    // move to pages
    const prevPage = () => {
        const newquery = new URLSearchParams(queryData);
        if (page <= 0) {
            newquery.set('page', 1)
        }
        newquery.set('page', page - 1)
        setQueryData(newquery)
    }
    const nextPage = () => {
        const newquery = new URLSearchParams(queryData);
        newquery.set('page', page + 1)
        setQueryData(newquery)
    }

    return (
        <>
            <div className="orders-container">
                {/* Order Header */}
                <OrderHeader allOrders={allOrders} filterbyStatus={filterbyStatus} orderSearchValue={orderSearchValue} setOrderSearchValue={setOrderSearchValue} productSearchValue={productSearchValue} setProductSearchValue={setProductSearchValue} searchOrders={searchOrders} resetOrders={resetOrders} statusValue={statusValue} orderId={orderId} searchQueryByProduct={searchQueryByProduct} />
                {
                    loading ?
                        <LoadingComponent />
                        :
                        orders.length === 0 ?
                            // empty order container
                            <OrderEmptyOrderContainer />
                            :
                            // order body container
                            <OrderBodyContainer orders={orders} toggleView={toggleView} setToggleView={setToggleView} deleteCancelledOrder={deleteCancelledOrder} toggleEdit={toggleEdit} setUpdateDetails={setUpdateDetails} setToggleEdit={setToggleEdit} updateOrders={updateOrders} />
                }

                {/* order list responsive */}
                <OrderListResponsiveContainer orders={orders} toggleView={toggleView} setToggleView={setToggleView} deleteCancelledOrder={deleteCancelledOrder} toggleEdit={toggleEdit} setUpdateDetails={setUpdateDetails} setToggleEdit={setToggleEdit} updateOrders={updateOrders} />

                {/* Order footer */}
                <OrderFooter page={page} prevPage={prevPage} allOrdersCounts={allOrdersCounts} nextPage={nextPage} />
            </div>
        </>
    )
}

export default Orders;