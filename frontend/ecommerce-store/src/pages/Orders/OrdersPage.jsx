import { useEffect, useState } from 'react';
import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './OrdersPage.css';
import empty_order from '../../assets/empty-orders.svg'
import api from '../../services/auth';
import { Link } from 'react-router-dom';
import { Notifications } from '../../Admin/Context/NotificationContext';
import { NOTIFI_ACTIONS } from '../../Admin/Context/NotificationReduce';

function OrdersPage() {

    // load  context 
    const { notifiDispatch } = Notifications() || {};

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
            <div class="order-container">
                <div class="order-header">
                    <div class="header-content">
                        <h1>Your Orders</h1>
                        <p><span>Home /</span> Your Orders</p>
                    </div>
                </div>
                {
                    orders.length === 0 ?
                        <div class="empty-order-container">
                            <div class="container-top">
                                <img src={empty_order} alt="emty-cart-image" />
                            </div>
                            <div class="container-bottom">
                                <h1>Your Order list is empty</h1>
                                <p>Looks like you haven't added anything to your orders yet.</p>
                                <Link to='/products/computers' class="no-style-link">
                                    <button>
                                        Continue Shopping
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    :
                    <div class="order-body">
                        <div class="order-details">
                            <table>
                                <thead>
                                    <tr class="details-head">
                                        <th>Product</th>
                                        <th>Date</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Method</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((items) => {
                                            return (
                                                <tr class="card" key={items._id}>
                                                    <td class="card-product">
                                                        <div class="thumb">
                                                            <img src={items.image} alt="" />
                                                        </div>
                                                        <div class="name">
                                                            <p>{items.productName}</p>
                                                            <p class="order-id">OID: {items._id}</p>
                                                        </div>
                                                    </td>
                                                    <td class="card-date">
                                                        <p>{(items.createdAt).slice(0, 10)}</p>
                                                    </td>
                                                    <td class="card-price">
                                                        <p>${items.price}</p>
                                                    </td>
                                                    <td class="card-quantity">
                                                        <p>{items.quantity}</p>
                                                    </td>
                                                    <td class="card-method">
                                                        <p>{items.method === 'cash-on-delivery' ? 'Cash on Delivery' : "Card Payment"}</p>
                                                    </td>
                                                    <td class="card-total">
                                                        <p>${items.price * items.quantity + (items.tax || 0)}</p>
                                                    </td>
                                                    <td class="card-state">
                                                        {
                                                            items.status === "Cancelled" || items.status === "Processing" ?
                                                                <div class="status-menu">
                                                                    <h4 class={(items.status).toLowerCase()}>{items.status}</h4>
                                                                    <svg class="delete" onClick={() => cancleOrder(items._id, items.name, items.userId, items.status)} fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                                                </div>
                                                                :
                                                                <div class="status-menu">
                                                                    <h4 class={(items.status).toLowerCase()}>{items.status}</h4>
                                                                </div>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div class="order-details-responsive">
                            {
                                orders.map((items) => {
                                    return (
                                        <div class="card" key={items._id} key={items._id}>
                                            <div class="image">
                                                <img src={items.image} alt="" />
                                            </div>
                                            <div class="card-details">
                                                <div class="details-header">
                                                    <h1>{items.productName}</h1>
                                                    <p>OID: {items._id}</p>
                                                </div>
                                                <div class="details-footer">
                                                    <div class="card-date">
                                                        <h3>Date</h3>
                                                        <p>{(items.createdAt).slice(0, 10)}</p>
                                                    </div>
                                                    <div class="card-price">
                                                        <h3>Price: </h3>
                                                        <p>${items.price}</p>
                                                    </div>
                                                    <div class="card-quantity">
                                                        <h3>Quantity: </h3>
                                                        <p>{items.quantity}</p>
                                                    </div>
                                                    <div class="card-method">
                                                        <h3>Method: </h3>
                                                        <p>{items.method === 'cash-on-delivery' ? 'Cash on Delivery' : "Card Payment"}</p>
                                                    </div>
                                                    <div class="card-total">
                                                        <h3>Total: </h3>
                                                        <p>${items.price * items.quantity + (items.tax || 0)}</p>
                                                    </div>
                                                    <div class="card-state">
                                                        <h3>Status: </h3>
                                                        <h4 class={(items.status).toLowerCase()}>{items.status}</h4>
                                                    </div>
                                                </div>
                                                {
                                                    items.status === "Cancelled" || items.status === "Processing" &&
                                                    <svg class="delete" onClick={() => cancleOrder(items._id, items.name, items.userId, items.status)} fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            <FooterCompoennt />
        </>
    )
}

export default OrdersPage;