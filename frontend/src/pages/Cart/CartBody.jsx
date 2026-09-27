import { Link } from 'react-router-dom';

function CartBody({ state, empty_cart, deleteCartItem, dispatch, ACTIONS, subTotal }) {
    return (
        <div className="cart-body">
            {
                state.length === 0 ?
                    <div className="empty-cart-container">
                        <div className="container-top">
                            <img src={empty_cart} alt="emty-cart-image" />
                        </div>
                        <div className="container-bottom">
                            <h1>Your cart is empty</h1>
                            <p>Looks like you haven't added anything to your cart yet.</p>
                            <Link to='/products/computers' className="no-style-link">
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
                    <div className="cart-details">
                        {
                            state &&
                            <div className="details-head">
                                <p className="product">Product</p>
                                <p className="price">Price</p>
                                <p className="quantity">Quantity</p>
                                <p className="subtotal">Subtotal</p>
                                <p></p>
                            </div>
                        }
                        <div className="details-cards">
                            {
                                state.length > 0 &&
                                state.reverse().map((items) => {
                                    return (
                                        <div className={items.availability ? "card" : "card disabel-card"} key={items._id}>
                                            <div className="card-product product">
                                                <div className="thumb">
                                                    <img src={items.image} alt="" />
                                                </div>
                                                <div className="name">
                                                    <p>{items.name}</p>
                                                </div>
                                            </div>
                                            <div className="card-price price">
                                                <p>${items.price}</p>
                                            </div>
                                            {
                                                items.availability ?
                                                    <div className="card-quantity quantity">
                                                        <button className="plus" onClick={() => dispatch({ type: ACTIONS.MIN_QNT, payload: { id: items.productId } })}>−</button>
                                                        <p>{items.quantity}</p>
                                                        <button className="min" onClick={() => dispatch({ type: ACTIONS.ADD_QNT, payload: { id: items.productId } })}>+</button>
                                                    </div>
                                                    :
                                                    <div className="card-quantity quantity">
                                                        <p style={{ fontSize: "12px", width: "100%" }}>sold Out</p>
                                                    </div>
                                            }
                                            <div className="card-subtotal subtotal">
                                                <p>${(items.price * items.quantity).toFixed(2)}</p>
                                            </div>
                                            <button className="delete" onClick={() => deleteCartItem(items.productId, dispatch)}>✕</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
            <div className="cart-details-responsive">
                {
                    state.length > 0 &&
                    state.reverse().map((items) => {
                        return (
                            <div className={items.availability ? "card" : "card disabel-card"}>
                                <div className="image">
                                    <img src={items.image} alt="" />
                                </div>
                                <div className="card-details">
                                    <div className="card-details-header">
                                        <h1>{items.name}</h1>
                                        <button onClick={() => deleteCartItem(items.productId, dispatch)}>✕</button>
                                    </div>
                                    <div className="card-details-footer">
                                        <div className="price">
                                            <p>Price: </p>
                                            <h3>${items.price}</h3>
                                        </div>
                                        <div className="quantity">
                                            <div className="quentity-header">
                                                <p>Quantity: </p>
                                            </div>
                                            <div className="quentity-body">
                                                <button className="plus" onClick={() => dispatch({ type: ACTIONS.MIN_QNT, payload: { id: items.productId } })}>−</button>
                                                <p>{items.quantity}</p>
                                                <button className="min" onClick={() => dispatch({ type: ACTIONS.ADD_QNT, payload: { id: items.productId } })}>+</button>
                                            </div>
                                        </div>
                                        <div className="subtotal">
                                            <p>Subtotal: </p>
                                            <h3>${(items.price * Number(items.quantity)).toFixed(2)}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                state &&
                <div className="total-card">
                    <div className="total-head">
                        <h1>Cart Totals</h1>
                    </div>
                    <div className="total-subtotal info">
                        <h3>Subtotal</h3>
                        <p>${subTotal.toFixed(2)}</p>
                    </div>
                    <div className="total-shipping info">
                        <h3>Shipping</h3>
                        <p>$20.00</p>
                    </div>
                    <div className="total-total info">
                        <h3>Total</h3>
                        <p><span>${subTotal ? (subTotal + 20).toFixed(2) : 0}</span></p>
                    </div>
                    {
                        subTotal ?
                            <Link to='/checkout'>
                                <button>Proceed To Checkout</button>
                            </Link>
                            :
                            <button className="empty-cart-btn">Cart is Empty</button>
                    }
                    <div className="secure-tags">
                        <div className="label">
                            <svg className="w-3.5 h-3.5" fill="none" width="16" height="16" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            <p>Secure Checkout</p>
                        </div>
                        <p>Your data is protected and safe with us.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default CartBody;