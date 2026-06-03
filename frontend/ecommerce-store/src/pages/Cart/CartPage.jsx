import { useState } from 'react';
import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './CartPage.css';
import {Link} from 'react-router-dom'
import { Cart } from '../../context/CartContext';
import { deleteCartItem } from '../../api/cartApi';
import { ACTIONS } from '../../context/CartReducer';

function CartPage() {    

    // use context 
    const {state,dispatch} = Cart()

    //subtotal calculation
    let subTotal = 0;
    state.map((items) => {
        return subTotal = subTotal + (items.price * items.quantity)
    })

    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div class="cart-container">
                <div class="cart-header">
                    <div class="header-content">
                        <h1>Chopping Cart</h1>
                        <p><span><Link to="/" style={{textDecoration: "none", color: "#8f9293"}}>Home</Link> /</span> Shopping Cart</p>
                    </div>
                </div>
                <div class="cart-body">
                    <div class="cart-details">
                        {
                            state &&
                            <div class="details-head">
                                <p class="product">Product</p>
                                <p class="price">Price</p>
                                <p class="quantity">Quantity</p>
                                <p class="subtotal">Subtotal</p>
                                <p></p>
                            </div>
                        }
                        <div class="details-cards">
                            {
                                state.length > 0 &&
                                state.reverse().map((items)=>{
                                    return(
                                        <div class={items.availability ? "card" : "card disabel-card"} key={items._id}>
                                            <div class="card-product product">
                                                <div class="thumb">
                                                    <input type="checkbox"  defaultChecked={items.availability ? true : false}/>
                                                    <img src={items.image} alt="" />
                                                </div>
                                                <div class="name">
                                                    <p>{items.name}</p>
                                                </div>
                                            </div>
                                            <div class="card-price price">
                                                <p>${items.price}</p>
                                            </div>
                                            <div class="card-quantity quantity">
                                                <button class="plus" onClick={() => dispatch({type: ACTIONS.MIN_QNT, payload: {id: items.productId}})}>−</button>
                                                <p>{items.quantity}</p>
                                                <button class="min" onClick={() => dispatch({type: ACTIONS.ADD_QNT, payload: {id: items.productId}})}>+</button>
                                            </div>
                                            <div class="card-subtotal subtotal">
                                                <p>${(items.price * items.quantity).toFixed(2)}</p>
                                            </div>
                                            <button class="delete" onClick={() => deleteCartItem(items.productId, dispatch)}>✕</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div class="cart-details-responsive">
                        {
                            state.length > 0 &&
                            state.reverse().map((items)=>{
                                return(
                                    <div class={items.availability ? "card" : "card disabel-card"}>
                                        <div class="image">
                                            <input type="checkbox" defaultChecked={true} />
                                            <img src={items.image} alt="" />
                                        </div>
                                        <div class="card-details">
                                            <div class="name">
                                                <h1>{items.name}</h1>
                                                <button onClick={() => deleteCartItem(items._id, dispatch)}>✕</button>
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
                                                    <button class="plus" onClick={() => dispatch({type: ACTIONS.MIN_QNT, payload: {id: items.productId}})}>−</button>
                                                <p>{items.quantity}</p>
                                                <button class="min" onClick={() => dispatch({type: ACTIONS.ADD_QNT, payload: {id: items.productId}})}>+</button>
                                                </div>
                                            </div>
                                            <div class="subtotal">
                                                <p>Subtotal: </p>
                                                <h3>${(items.price * Number(items.quantity)).toFixed(2)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        state &&
                        <div class="total-card">
                            <div class="total-head">
                                <h1>Cart Totals</h1>
                            </div>
                            <div class="total-subtotal info">
                                <h3>Subtotal</h3>
                                <p>${subTotal.toFixed(2)}</p>
                            </div>
                            <div class="total-shipping info">
                                <h3>Shipping</h3>
                                <p>$20.00</p>
                            </div>
                            <div class="total-total info">
                                <h3>Total</h3>
                                <p><span>${(subTotal + 20).toFixed(2)}</span></p>
                            </div>
                            <Link to='/checkout'>
                                <button>Proceed To Checkout</button>
                            </Link>
                        </div>
                    }
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default CartPage;