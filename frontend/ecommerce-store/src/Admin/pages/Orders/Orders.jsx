import { useEffect, useState } from 'react';
import './Orders.css';
import api from '../../../services/auth';
import { useSearchParams } from 'react-router-dom';
import { Message } from '../../../context/MessagesContext';
import LoadingComponent from '../../Components/Loading/LoadingComponent';

function Orders() {

    //load context
    const { setupMessage } = Message()

    // orders states
    const [orders, setOrders] = useState([])
    const [allOrders, setAllOrders] = useState([])
    const [allOrdersCounts, setAllOrdersCounts] = useState([])
    const [userSearchValue, setUserSearchValue] = useState("")
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

    // get status value form query data
    const statusValue = queryData.get('status') || ""

    // get page from query data
    const page = Number(queryData.get('page')) || 1

    // orders use effescts
    useEffect(() => {
        const fetchOrderData = async () => {
            setLoading(true)
            try {
                const result = await api.get(`/orders/all?searchByProduct=${searchQueryByProduct}&serchByUserId=${searchQueryByUserId}&status=${statusValue}&page=${page}`)
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
    }, [searchQueryByProduct, searchQueryByUserId, queryData, statusValue, page, relaod])

    // update orders
    const updateOrders = async (userId) => {
        console.log(userId)
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

            setupMessage('success', 'Order Updated!')
            setReload(prev => !prev)
        }
        
        catch (err) {
            console.log(err.response)
            setupMessage('error', 'Update Faild!')
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
        if (userSearchValue.length <= 1 && productSearchValue <= 1) {
            setupMessage('error', 'Please Enter more than 1 value to search...')
            return
        }
        if (userSearchValue.length > 1) {
            if (userSearchValue.length !== 24) {
                setupMessage('error', 'User ID must be 24 characters!')
                return
            }
            newquery.set('serchByUserId', userSearchValue)
            newquery.set('page', 1)
        }
        if (productSearchValue.length > 1) {
            newquery.set('searchByProduct', productSearchValue)
            newquery.set('page', 1)
        }
        setQueryData(newquery)
    }

    // reset button
    const resetOrders = () => {
        setQueryData({})
        setUserSearchValue("")
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
            <div class="orders-container">
                <div class="orders-container-header">
                    <div class="header-top admin-orders">
                        <div class="status-box">
                            <div class="box-thumb total">
                                <svg class="total" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path></svg>
                            </div>
                            <div class="box-details">
                                <p>Total Orders</p>
                                <h1>{allOrders.length}</h1>
                            </div>
                        </div>
                        <div class="status-box">
                            <div class="box-thumb pending">
                                <svg class="pending" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <div class="box-details">
                                <p>Processing Orders</p>
                                <h1>{(allOrders.filter(item => item.status === "Processing")).length}</h1>
                            </div>
                        </div>
                        <div class="status-box">
                            <div class="box-thumb processing">
                                <svg class="processing" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            </div>
                            <div class="box-details">
                                <p>Shipped Orders</p>
                                <h1>{(allOrders.filter(item => item.status === "Shipped")).length}</h1>
                            </div>
                        </div>
                        <div class="status-box">
                            <div class="box-thumb completed">
                                <svg class="completed" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div class="box-details">
                                <p>Delivered Orders</p>
                                <h1>{(allOrders.filter(item => item.status === "Delivered")).length}</h1>
                            </div>
                        </div>
                        <div class="status-box">
                            <div class="box-thumb cancelled">
                                <svg class="cancelled" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            </div>
                            <div class="box-details">
                                <p>Cancelled Orders</p>
                                <h1>{(allOrders.filter(item => item.status === "Cancelled")).length}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="header-bottom">
                        <div class="filter-methods">
                            <div class="header-filter">
                                <p>Filter By</p>
                                <select onClick={(e) => filterbyStatus(e.target.value)}>
                                    <option value="">Select Status</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div class="find">
                                <p>Search by User ID</p>
                                <input value={userSearchValue} type="text" onChange={(e) => setUserSearchValue(e.target.value)} />
                                {
                                    userSearchValue === "" &&
                                    <div class="placeholder">
                                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <p>Enter User ID</p>
                                    </div>
                                }
                            </div>
                            <div class="search">
                                <p>Search by Product Name</p>
                                <input value={productSearchValue} type="text" onChange={(e) => setProductSearchValue(e.target.value)} />
                                {
                                    productSearchValue === "" &&
                                    <div class="placeholder">
                                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 7v10l10 5V12" />
                                            <path d="M22 7v10l-10 5V12" />
                                            <path d="M7 4.5l10 5" />
                                        </svg>
                                        <p>Enter Product Name</p>
                                    </div>
                                }
                            </div>
                            <div class="buttons">
                                <button onClick={() => searchOrders()}><i class="fa-solid fa-magnifying-glass"></i>Search</button>
                                <button class='reset' onClick={() => resetOrders()}><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path></svg> Reset</button>
                            </div>
                        </div>
                        <div class="filter-keys">
                            {
                                statusValue &&
                                <p>{statusValue}</p>
                            }
                            {
                                searchQueryByUserId &&
                                <p>ID: {searchQueryByUserId}</p>
                            }
                            {
                                searchQueryByProduct &&
                                <p>{searchQueryByProduct}</p>
                            }
                        </div>
                    </div>
                </div>
                {
                    loading ?
                    <LoadingComponent />
                    :
                    <div class="orders-container-body">
                        <div class="order-list-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="order">Order</th>
                                        <th class="user">User</th>
                                        <th class="qunatity">Qunatity</th>
                                        <th class="price">Price</th>
                                        <th class="status">Status</th>
                                        <th class="actions">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.length > 0 &&
                                            orders.map((items) => {
                                                return (
                                                    <>
                                                        {/* Basic info row */}
                                                        <tr class='list-card'>
                                                            <td class="order row">
                                                                <div class="order-thumb">
                                                                    <img src={items.image} alt={items.productName} />
                                                                </div>
                                                                <div class="order-details">
                                                                    <h4>{items.productName}</h4>
                                                                    <p>OID: {items._id}</p>
                                                                </div>
                                                            </td>
                                                            <td class="user row">
                                                                <h4>{items.name}</h4>
                                                                <p>{items.email || "Not found!"}</p>
                                                            </td>
                                                            <td class="quantity row">
                                                                <h4>{items.quantity}</h4>
                                                            </td>
                                                            <td class="price row">
                                                                <h4>${items.price}</h4>
                                                            </td>
                                                            <td class="status row">
                                                                <p class={(items.status).toLowerCase()}>{items.status}</p>
                                                            </td>
                                                            <td class="actions row">
                                                                {
                                                                    toggleView.orderId == items._id && toggleView.toggle ?
                                                                        <button title='View and Update' style={{ backgroundColor: '#2B38D1', color: "#fff" }} class='view' onClick={() => setToggleView({ toggle: !toggleView.toggle, orderId: items._id })}>
                                                                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                                        </button>
                                                                        :
                                                                        <button title='View and Update' class='view' onClick={() => setToggleView({ toggle: !toggleView.toggle, orderId: items._id })}>
                                                                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                                        </button>
                                                                }
                                                                {
                                                                    items.status === 'Cancelled' &&
                                                                    <button title='Delete' class='delete'>
                                                                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                                                    </button>
                                                                }
                                                            </td>
                                                        </tr>

                                                        {/* All detail row */}
                                                        {
                                                            toggleView.orderId == items._id && toggleView.toggle &&
                                                            <tr class='card-details'>
                                                                <td colSpan={7}>
                                                                    <div class='card-details'>
                                                                        <div class="order-details row">
                                                                            <div class="details-header">
                                                                                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                                                                                <p>ORDER DETAILS</p>
                                                                            </div>
                                                                            <div class="details-body">
                                                                                <div>
                                                                                    <h4>Order ID</h4>
                                                                                    <p>{items._id}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Product</h4>
                                                                                    <p>{items.productName}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Quantity</h4>
                                                                                    <p>{items.quantity}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Unit Price</h4>
                                                                                    <p>${items.price}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Status</h4>
                                                                                    <div class="status-box">
                                                                                        <p class={`status ${(items.status).toLowerCase()}`}>{items.status}</p>
                                                                                        {
                                                                                            toggleEdit.toggle && toggleEdit.orderId === items._id &&
                                                                                            <select onClick={(e) => setUpdateDetails({ orderId: items._id, status: e.target.value })}>
                                                                                                <option value="Delivered">Delivered</option>
                                                                                                <option value="Processing">Processing</option>
                                                                                                <option value="Shipped">Shipped</option>
                                                                                                <option value="Cancelled">Cancelled</option>
                                                                                            </select>
                                                                                        }
                                                                                        <button title='Edit' class='edit' onClick={() => setToggleEdit({ toggle: true, orderId: items._id })}>
                                                                                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Order Date</h4>
                                                                                    <p>{(items.createdAt).split("T")[0]}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Order Time</h4>
                                                                                    <p>{new Date(items.createdAt).toLocaleTimeString()}</p>
                                                                                </div>
                                                                            </div>
                                                                            {
                                                                                toggleEdit.toggle && toggleEdit.orderId === items._id &&
                                                                                <div class="details-footer">
                                                                                    <button class='update' onClick={() => updateOrders(items.userId)}>Update</button>
                                                                                    <button class='close' onClick={() => setToggleEdit({ toggle: false, orderId: null })}>Close</button>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                        <div class="product-details row">
                                                                            <div class="details-header">
                                                                                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                                                <p>PRODUCT IMAGE</p>
                                                                            </div>
                                                                            <div class="details-body">
                                                                                <img src={items.image} alt={items.productName} />
                                                                            </div>
                                                                        </div>
                                                                        <div class="customer-details row">
                                                                            <div class="details-header">
                                                                                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                                                <p>CUSTOMER INFORMATION</p>
                                                                            </div>
                                                                            <div class="details-body">
                                                                                <div>
                                                                                    <h4>Name</h4>
                                                                                    <p>{items.name}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Custommer Id</h4>
                                                                                    <p>{items.userId}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Email</h4>
                                                                                    <p>{items.email || 'Email is Not Found!'}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Phone</h4>
                                                                                    <p>{items.phoneNumber}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Address</h4>
                                                                                    <p>{items.address}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>City</h4>
                                                                                    <p>{items.city}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Postal Code</h4>
                                                                                    <p>{items.zipCode}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="payment-details row">
                                                                            <div class="details-header">
                                                                                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                                                                                <p>PAYMENT INFORMATION</p>
                                                                            </div>
                                                                            <div class="details-body">
                                                                                <div>
                                                                                    <h4>Payment Method</h4>
                                                                                    <p>{items.method}</p>
                                                                                </div>
                                                                                <div>
                                                                                    <h4>Payment Status</h4>
                                                                                    <p class={items.method !== 'cash-on-delivery' || items.status === 'Delivered' ? "payment-status paid" : "payment-status no-paid"}>{items.method !== 'cash-on-delivery' || items.status === 'Delivered' ? 'Paid' : 'None Paid'}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        }
                                                    </>
                                                )
                                            })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                <div class="orders-container-footer">
                    <div class="box-buttons">
                        {
                            page !== 1 &&
                            <button class="pre" onClick={() => prevPage()}>‹</button>
                        }
                        <p><span>{page}</span> of {Math.ceil(allOrdersCounts.all_result / 10)} </p>
                        {
                            Math.ceil(allOrdersCounts.all_result / 10) !== page &&
                            <button class="next" onClick={() => nextPage()}>›</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders;