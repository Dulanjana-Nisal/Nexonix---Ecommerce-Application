import './CheckoutPage.css'
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterCompoennt from '../../components/Footer/FooterComponent';
import { Cart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import api from '../../services/auth';
import { useState } from 'react';
import { deleteCartItem } from '../../api/cartApi';

function CheckoutPage() {

    // use context 
    const { state,dispatch } = Cart()

    //chekout states
    const [loading,setLoading] = useState(false)
    const [orderData,setOrderData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        zipCode: '',
        phoneNumber: '',
        method: 'cash-on-delivery'
    })

    //update prduct quaantity
    const updateProductQuntity = async (productId, qnt) => {
        const result = await api.get(`/products/${productId}`)
        console.log(result.data.data.stock)
        try{
            await api.patch(`/products/${productId}`, {stock: result.data.data.stock - qnt})
        }
        catch(err){
            console.log(err.response)
        }
    }

    //get cart item summery
    let fullPrice = 0
    state.map((items) => {
        if(items.availability){
            fullPrice = fullPrice + (items.price * items.quantity)
        }
    })

    //get user id form localstorage
    const {_id} = JSON.parse(localStorage.getItem("user"))

    //place order to database
    const placeOrder =  () => {
        setLoading(true)
        state.map( async (items)=>{
            try{
                items.availability &&
                await api.post('/orders', {
                    userId: _id,
                    firstName: orderData.firstName,
                    lastName:   orderData.lastName,
                    address: orderData.address,
                    zipCode: orderData.zipCode,
                    phoneNumber: orderData.phoneNumber,
                    method: orderData.method,
                    productId: items.productId,
                    productName: items.name,
                    price: items.price,
                    image: items.image,
                    quantity: items.quantity,
                    totle_price: fullPrice.toFixed(2)
                })
                deleteCartItem(items.productId, dispatch)
                updateProductQuntity(items.productId, items.quantity)
            }
            catch(err){
                console.log(err.response)
            }
            setLoading(false)
        })
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
                                        <input type="text" onChange={(e) => setOrderData({...orderData, firstName: e.target.value})}/>
                                    </div>
                                    <div class="last-name">
                                        <label>Last Name</label>
                                        <input type="text" onChange={(e) => setOrderData({...orderData, lastName: e.target.value})}/>
                                    </div>
                                </div>
                                <div class="address box">
                                    <label>Address</label>
                                    <input type="text" onChange={(e) => setOrderData({...orderData, address: e.target.value})}/>
                                </div>
                                <div class="city box">
                                    <label>City Name</label>
                                    <input type="text" />
                                </div>
                                <div class="zipcode box">
                                    <label>Zip Code</label>
                                    <input type="text" onChange={(e) => setOrderData({...orderData, zipCode: e.target.value})}/>
                                </div>
                                <div class="phone box">
                                    <label>Phone Number</label>
                                    <input type="number" onChange={(e) => setOrderData({...orderData, phoneNumber: e.target.value})}/>
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
                                state.map((items)=>{
                                    if(items.availability){
                                        return(
                                            <div class="product-card" key={items._id}>
                                                <img src={items.image} alt={items.name} />
                                                <p>{items.name}</p>
                                                <span>✕ {items.quantity}</span>
                                            </div>
                                        )
                                    }
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
                            <p>$20.00</p>
                        </div>
                        <div class="total-total info">
                            <h3>Total</h3>
                            <p><span>${fullPrice ? (fullPrice + 20).toFixed(2) : 0}</span></p>
                        </div>
                        <div class="button">
                            <button onClick={() => placeOrder()}>{loading ? "Processing..." : "Place Order"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default CheckoutPage;