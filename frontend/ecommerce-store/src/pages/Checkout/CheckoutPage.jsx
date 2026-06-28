import './CheckoutPage.css'
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterCompoennt from '../../components/Footer/FooterComponent';
import { Cart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/auth';
import { useEffect, useState } from 'react';
import { deleteCartItem } from '../../api/cartApi';
import { Message } from '../../context/MessagesContext';
import { Notifications } from '../../Admin/Context/NotificationContext';
import { NOTIFI_ACTIONS } from '../../Admin/Context/NotificationReduce';

function CheckoutPage() {

    // load  context 
    const { state, dispatch, user } = Cart()
    const { setupMessage } = Message();
    const { notifiDispatch } = Notifications() || {};


    const navigate = useNavigate();

    //chekout states
    const [loading, setLoading] = useState(false)
    const [availabilityMap, setAvailabilityMap] = useState({})
    const [orderData, setOrderData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        phoneNumber: '',
        email: '',
        tax: 20,
        method: 'cash-on-delivery'
    })

    //update prduct quaantity
    const updateProductQuntity = async (productId, qnt) => {
        const result = await api.get(`/products/${productId}`)
        try {
            await api.patch(`/products/${productId}`, { stock: result.data.data.stock - qnt })
        }
        catch (err) {
            console.log(err.response)
        }
    }

    // fetch availability for items in cart (Genarated by AI - only this useeffect code)
    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const entries = await Promise.all(
                    state.map(async (item) => {
                        const res = await api.get(`/products/${item.productId}`)
                        const product = res.data.data
                        return [
                            item.productId,
                            {
                                availability: product.availability,
                                stock: product.stock,
                            },
                        ]
                    })
                )
                setAvailabilityMap(Object.fromEntries(entries))
            } catch (err) {
                console.log('Error fetching product availability', err.response || err)
            }
        }

        if (state.length > 0) {
            fetchAvailability()
        }
    }, [state])

    //get cart item summery
    let fullPrice = 0
    state.map((items) => {
        if (items.availability) {
            fullPrice += items.price * items.quantity
        }
    })

    //place order to database
    const placeOrder = async () => {
        setLoading(true)

        try {
            // re-check availability from backend to avoid race conditions
            for (const items of state) {
                const res = await api.get(`/products/${items.productId}`)
                const product = res.data.data

                const isAvailable = product.availability && product.stock >= items.quantity

                if (!isAvailable) {
                    setupMessage('error', `"${items.name}" is no longer available or out of stock.`)
                    setLoading(false)
                    return
                }

                // post notification if product low or out of stock
                if ((product.stock - items.quantity) <= 5) {
                    try {
                        await api.post('notifications/',
                            {
                                "userId": "admin123",
                                "type": "products",
                                "receiver": "admin",
                                "title": `${(product.stock - items.quantity) === 0 ? 'Out' : 'Low'} Stock alert`,
                                "message": `Product ${product.name} (Product ID: ${product._id}) is ${(product.stock - items.quantity) === 0 ? 'out' : 'low'} of stock. ${(product.stock - items.quantity) !== 0 ? `only ${(product.stock - items.quantity)} in stock.` : ''}`
                            }
                        )
                        const getAllNotifi = await api.get('/notifications/all')

                        // create notification in context
                        notifiDispatch(
                            {
                                type: NOTIFI_ACTIONS.GET_ALL_NOTIFICATIONS,
                                payload: getAllNotifi.data.data
                            }
                        )
                    }
                    catch (err) {
                        console.log(err.response)
                    }
                }
            }

            // all items available -> create orders
            for (const items of state) {
                const orderPlaced = await api.post('/orders', {
                    userId: user._id,
                    name: `${orderData.firstName} ${orderData.lastName}`,
                    address: orderData.address,
                    city: orderData.city,
                    zipCode: orderData.zipCode,
                    phoneNumber: orderData.phoneNumber,
                    email: orderData.email,
                    method: orderData.method,
                    productId: items.productId,
                    productName: items.name,
                    price: items.price,
                    tax: orderData.tax,
                    image: items.image,
                    quantity: items.quantity,
                    totle_price: fullPrice.toFixed(2)
                })

                // post notification for order placed
                try {
                    await api.post('notifications/',
                        {
                            "userId": "admin123",
                            "type": "orders",
                            "receiver": "admin",
                            "title": `New order received`,
                            "message": `Order ID: ${orderPlaced.data.data._id} has been placed by ${orderData.firstName} ${orderData.lastName}.`
                        }
                    )
                    const getAllNotifi = await api.get('/notifications/all')
                    // create notification in context
                    notifiDispatch(
                        {
                            type: NOTIFI_ACTIONS.GET_ALL_NOTIFICATIONS,
                            payload: getAllNotifi.data.data
                        }
                    )
                }
                catch (err) {
                    console.log(err.response)
                }

                await updateProductQuntity(items.productId, items.quantity)
                deleteCartItem(items.productId, dispatch)
            }

            setTimeout(() => {
                navigate('/orders')
            }, 1000)
            setupMessage('success', "Order Placed!")

        } catch (err) {
            if (err) {
                setupMessage('error', 'Product Checkout Error!')
            }
            console.log(err.response || err)

        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <HeaderComponent />
            <div class="checkout-container">
                <div class="checkout-header">
                    <div class="header-content">
                        <h1>Checkout</h1>
                        <p><span><Link to='/' class="no-style-link">Home</Link> /</span> Checkout</p>
                    </div>
                </div>
                <div class="checkout-body">
                    <div class="checkout-details">
                        <div class="details-card">
                            <h1>Billing Details</h1>
                            <form>
                                <div class="name box">
                                    <div class="first-name">
                                        <label>First Name</label>
                                        <input type="text" onChange={(e) => setOrderData({ ...orderData, firstName: e.target.value })} />
                                    </div>
                                    <div class="last-name">
                                        <label>Last Name</label>
                                        <input type="text" onChange={(e) => setOrderData({ ...orderData, lastName: e.target.value })} />
                                    </div>
                                </div>
                                <div class="address box">
                                    <label>Address</label>
                                    <input type="text" onChange={(e) => setOrderData({ ...orderData, address: e.target.value })} />
                                </div>
                                <div class="city box">
                                    <label>City Name</label>
                                    <input type="text" onChange={(e) => setOrderData({ ...orderData, city: e.target.value })} />
                                </div>
                                <div class="zipcode box">
                                    <label>Zip Code</label>
                                    <input type="text" onChange={(e) => setOrderData({ ...orderData, zipCode: e.target.value })} />
                                </div>
                                <div class="phone box">
                                    <label>Phone Number</label>
                                    <input type="number" onChange={(e) => setOrderData({ ...orderData, phoneNumber: e.target.value })} />
                                </div>
                                <div class="email box">
                                    <label>Email Address</label>
                                    <input type="email" onChange={(e) => setOrderData({ ...orderData, email: e.target.value })} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="total-card">
                        <div class="total-head">
                            <h1>Your Order</h1>
                        </div>
                        <div class="total-product info">
                            {
                                state.map((items) => {
                                    const info = availabilityMap[items.productId]
                                    const isAvailable = info && info.availability && info.stock >= items.quantity
                                    return (
                                        isAvailable ?
                                            <div class="product-card" key={items._id}>
                                                <img src={items.image} alt={items.name} />
                                                <p>{items.name}</p>
                                                <span>✕ {items.quantity}</span>
                                            </div>
                                            :
                                            <div class="product-card sold-out" key={items._id}>
                                                <img src={items.image} alt={items.name} />
                                                <p>{items.name}</p>
                                                <span>Sold Out</span>
                                            </div>
                                    )
                                })
                            }
                        </div>
                        <div class="total-method info">
                            <h3>Method</h3>
                            <p>Cash on Delivery</p>
                        </div>
                        <div class="total-subtotal info">
                            <h3>Subtotal</h3>
                            <p>${fullPrice.toFixed(2)}</p>
                        </div>
                        <div class="total-shipping info">
                            <h3>Shipping</h3>
                            <p>${state.length * orderData.tax}</p>
                        </div>
                        <div class="total-total info">
                            <h3>Total</h3>
                            <p><span>${fullPrice ? (fullPrice + 20).toFixed(2) : 0}</span></p>
                        </div>
                        <div class="button">
                            <button onClick={() => placeOrder()}>{loading ? "Processing..." : "Place Order"}</button>
                        </div>
                        <div class="secure-tags">
                            <div class="label">
                                <svg class="w-3.5 h-3.5" fill="none" width="16" height="16" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                <p>Secure Checkout</p>
                            </div>
                            <p>Your data is protected and safe with us.</p>
                        </div>
                    </div>
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default CheckoutPage;