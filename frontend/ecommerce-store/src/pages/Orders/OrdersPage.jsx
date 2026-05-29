import { useEffect, useState } from 'react';
import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './OrdersPage.css';
import api from '../../services/auth';

function OrdersPage() {

    //order states
    const [orders,setOrers] = useState([])

    //fetch orders from detabase
    useEffect(()=>{
        const fetchOrders = async () => {
            const result = await api.get('/orders')
            setOrers(result.data.data)
        }
        fetchOrders()
    }, [])

    console.log(orders)

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
                            <div class="card">
                                <div class="card-product product">
                                    <div class="thumb">
                                        <img src="../../images/card-image.png" alt="" />
                                    </div>
                                    <div class="name">
                                        <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                        <p class="order-id">ID: 69dbab0ed4d8c035adc7624e</p>
                                    </div>
                                </div>
                                <div class="card-date date">
                                    <p>2026.02.12</p>
                                </div>
                                <div class="card-price price">
                                    <p>$234.34</p>
                                </div>
                                <div class="card-quantity quantity">
                                    <p>1</p>
                                </div>
                                <div class="card-status status">
                                    <p class="deliverd">Deliverd</p>
                                </div>
                                <button class="delete"><img src="../../images/delete-icon.png" alt="" /></button>
                            </div>
                            <div class="card">
                                <div class="card-product product">
                                    <div class="thumb">
                                        <img src="../../images/card-image.png" alt="" />
                                    </div>
                                    <div class="name">
                                        <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                        <p class="order-id">(ID: 12322344331)</p>
                                    </div>
                                </div>
                                <div class="card-date date">
                                    <p>2026.02.12</p>
                                </div>
                                <div class="card-price price">
                                    <p>$234.34</p>
                                </div>
                                <div class="card-quantity quantity">
                                    <p>1</p>
                                </div>
                                <div class="card-status status">
                                    <p class="deliverd">Deliverd</p>
                                </div>
                                <button class="delete"><img src="../../images/delete-icon.png" alt="" /></button>
                            </div>
                        </div>
                    </div>
                    <div class="order-details-responsive">
                        <div class="card">
                            <div class="image">
                                <img src="../../images/card-image.png" alt="" />
                            </div>
                            <div class="card-details">
                                <div class="name">
                                    <h1>Lenovo Legion 7i Gen 9 Laptop</h1>
                                    <button><img src="../../images/delete-icon.png" alt="" /></button>
                                </div>
                                <div class="price">
                                    <p>Price: </p>
                                    <h3>$234.44</h3>
                                </div>
                                <div class="quantity">
                                    <div class="quentity-header">
                                        <p>Quantity: </p>
                                    </div>
                                    <div class="quentity-body">
                                        <p>1</p>
                                    </div>
                                </div>
                                <div class="subtotal">
                                    <p>Subtotal: </p>
                                    <h3>$234.44</h3>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="image">
                                <img src="../../images/card-image.png" alt="" />
                            </div>
                            <div class="card-details">
                                <div class="name">
                                    <h1>Lenovo Legion 7i Gen 9 Laptop</h1>
                                    <button><img src="../../images/delete-icon.png" alt="" /></button>
                                </div>
                                <div class="price">
                                    <p>Price: </p>
                                    <h3>$234.44</h3>
                                </div>
                                <div class="quantity">
                                    <div class="quentity-header">
                                        <p>Quantity: </p>
                                    </div>
                                    <div class="quentity-body">
                                        <p>1</p>
                                    </div>
                                </div>
                                <div class="subtotal">
                                    <p>Subtotal: </p>
                                    <h3>$234.44</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default OrdersPage;