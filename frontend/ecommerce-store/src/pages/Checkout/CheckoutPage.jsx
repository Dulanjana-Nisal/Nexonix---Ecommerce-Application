import './CheckoutPage.css'
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterCompoennt from '../../components/Footer/FooterComponent';
import { Cart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/auth';
import { useEffect, useState } from 'react';
import { deleteCartItem } from '../../api/cartApi';
import { Message } from '../../context/MessagesContext';
import { Notifications } from '../../Admin/Context/NotificationContext';
import { NOTIFI_ACTIONS } from '../../Admin/Context/NotificationReduce';
import CheckoutHeader from './CheckoutHeader';
import CheckoutBody from './CheckoutBody';

function CheckoutPage() {

    // load  context 
    const { state, dispatch, user } = Cart()
    const { setupMessage } = Message();
    const { notifiDispatch } = Notifications() || {};

    // use useNavigate hook
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
                    setupMessage('error', `"${items.name}" is no longer available or out of stock.`, "Items is Not Available!")
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
            setupMessage('success', "Successfully Added order to your order list", "Order Placed")

        } catch (err) {
            if (err) {
                setupMessage('error', "Something Wrong while checkout proceed", 'Product Checkout Error!')
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
                {/* checkout header */}
                <CheckoutHeader />

                {/* checkout body */}
                <CheckoutBody setOrderData={setOrderData} orderData={orderData} state={state} availabilityMap={availabilityMap} fullPrice={fullPrice} placeOrder={placeOrder} loading={loading} />
            </div>
            <FooterCompoennt />
        </>
    )
}

export default CheckoutPage;