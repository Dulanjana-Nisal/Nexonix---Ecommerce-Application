import { useEffect, useState } from 'react';
import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import delete_img from '../../assets/delete-icon.png'
import './OrdersPage.css';
import api from '../../services/auth';

function OrdersPage() {

    //order states
    const [orders,setOrders] = useState([])

    //fetch orders from detabase
    useEffect(()=>{
        const fetchOrders = async () => {
            const result = await api.get('/orders')
            setOrders(result.data.data)
        }
        fetchOrders()
    }, [])

    //calcle order function
    const cancleOrder = async (orderID) => {
        try{
            await api.delete(`/orders/${orderID}`)
            setOrders(orders.filter(items => items._id !== orderID))
        }
        catch(err){
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
                <div class="order-body">
                    <div class="order-details">
                        <div class="details-head">
                            <p class="product">Product</p>
                            <p class="date">Date</p>
                            <p class="price">Price</p>
                            <p class="quantity">Quantity</p>
                            <p class="status">Status</p>
                            <p class="delete"></p>
                        </div>
                        <div class="details-cards">
                            {
                                orders.map((items)=>{
                                    return(
                                        <div class="card" key={items._id}>
                                            <div class="card-product product">
                                                <div class="thumb">
                                                    <img src={items.image} alt="" />
                                                </div>
                                                <div class="name">
                                                    <p>{items.productName}</p>
                                                    <p class="order-id">OID: {items._id}</p>
                                                </div>
                                            </div>
                                            <div class="card-date date">
                                                <p>{(items.createdAt).slice(0, 10)}</p>
                                            </div>
                                            <div class="card-price price">
                                                <p>${items.price}</p>
                                            </div>
                                            <div class="card-quantity quantity">
                                                <p>{items.quantity}</p>
                                            </div>
                                            <div class="card-status status">
                                                <p class={(items.status).toLowerCase()}>{items.status}</p>
                                            </div>
                                            {
                                                (items.status === "Cancelled" || items.status === "Processing") &&
                                                <button class="delete" onClick={() => cancleOrder(items._id)}><img src={delete_img} alt="" /></button>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div class="order-details-responsive">
                        {
                            orders.map((items)=>{
                                return(
                                    <div class="card" key={items._id}>
                                        <div class="image">
                                            <img src={items.image} alt="" />
                                        </div>
                                        <div class="card-details">
                                            <div class="name">
                                                <h1>{items.name}</h1>
                                                <button><img src={delete_img} alt="" /></button>
                                            </div>
                                            <div class="price">
                                                <p>Price: </p>
                                                <h3>${items.price}</h3>
                                            </div>
                                            <div class="quantity">
                                                <div class="quentity-header">
                                                    <p>Quantity: </p>
                                                </div>
                                                <div class="quentity-body">
                                                    <p>{items.quantity}</p>
                                                </div>
                                            </div>
                                            <div class="subtotal">
                                                <p>Subtotal: </p>
                                                <h3>${(items.quantity * items.price).toFixed(2)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default OrdersPage;