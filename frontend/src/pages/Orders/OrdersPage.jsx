import { useEffect, useState } from 'react';
import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './OrdersPage.css';
import api from '../../services/auth';
import { Notifications } from '../../Admin/Context/NotificationContext';
import { NOTIFI_ACTIONS } from '../../Admin/Context/NotificationReduce';
import { Message } from '../../context/MessagesContext';
import OrderHeader from './OrderHeader';
import OrderEmptyContainer from './OrderEmptyContainer';
import OrderBody from './OrderBody';

function OrdersPage() {

    // load  context 
    const { notifiDispatch } = Notifications() || {};
    const { setupMessage } = Message();

    //order states
    const [orders, setOrders] = useState([])

    //fetch orders from detabase
    useEffect(() => {
        const fetchOrders = async () => {
            const result = await api.get('/orders?limit=-1')
            setOrders(result.data.data)
        }
        fetchOrders()
    }, [])

    // cancel order function
    const cancleOrder = async (orderID, userName, userID, orderStatus) => {
        try {
            await api.delete(`/orders/${orderID}`)
            setOrders(orders.filter(items => items._id !== orderID))

            if (orderStatus === 'Processing') {
                try {
                    await api.post('notifications/',
                        {
                            "userId": "admin123",
                            "type": "deletes",
                            "receiver": "admin",
                            "title": `Order Deletion Notification`,
                            "message": `Order ID: ${orderID} belonging to ${userName} (user ID: ${userID}) has been permanently removed..`
                        }
                    )
                    const postResult = await api.get('/notifications/all');

                    setupMessage('success', `Your order (OID: ${orderID}) is cancelled...`, "Order Cancelled")

                    // create notification in context
                    notifiDispatch(
                        {
                            type: NOTIFI_ACTIONS.GET_ALL_NOTIFICATIONS,
                            payload: postResult.data.data
                        }
                    )
                }
                catch (err) {
                    console.log(err.response)
                }
            }
        }
        catch (err) {
            console.log(err.response)
        }
    }

    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div className="order-container">
                <OrderHeader />
                {
                    orders.length === 0 ?
                        // Empty Order container
                        <OrderEmptyContainer />
                        :
                        // Order body
                        <OrderBody orders={orders} cancleOrder={cancleOrder} />
                }
            </div>
            <FooterCompoennt />
        </>
    )
}

export default OrdersPage;