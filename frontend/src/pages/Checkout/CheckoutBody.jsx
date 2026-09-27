function CheckoutBody({setOrderData,orderData,state,availabilityMap,fullPrice,placeOrder,loading}) {
    return (
        <div className="checkout-body">
            <div className="checkout-details">
                <div className="details-card">
                    <h1>Billing Details</h1>
                    <form>
                        <div className="name box">
                            <div className="first-name">
                                <label>First Name</label>
                                <input type="text" onChange={(e) => setOrderData({ ...orderData, firstName: e.target.value })} />
                            </div>
                            <div className="last-name">
                                <label>Last Name</label>
                                <input type="text" onChange={(e) => setOrderData({ ...orderData, lastName: e.target.value })} />
                            </div>
                        </div>
                        <div className="address box">
                            <label>Address</label>
                            <input type="text" onChange={(e) => setOrderData({ ...orderData, address: e.target.value })} />
                        </div>
                        <div className="city box">
                            <label>City Name</label>
                            <input type="text" onChange={(e) => setOrderData({ ...orderData, city: e.target.value })} />
                        </div>
                        <div className="zipcode box">
                            <label>Zip Code</label>
                            <input type="text" onChange={(e) => setOrderData({ ...orderData, zipCode: e.target.value })} />
                        </div>
                        <div className="phone box">
                            <label>Phone Number</label>
                            <input type="number" onChange={(e) => setOrderData({ ...orderData, phoneNumber: e.target.value })} />
                        </div>
                        <div className="email box">
                            <label>Email Address</label>
                            <input type="email" onChange={(e) => setOrderData({ ...orderData, email: e.target.value })} />
                        </div>
                    </form>
                </div>
            </div>
            <div className="total-card">
                <div className="total-head">
                    <h1>Your Order</h1>
                </div>
                <div className="total-product info">
                    {
                        state.map((items) => {
                            const info = availabilityMap[items.productId]
                            const isAvailable = info && info.availability && info.stock >= items.quantity
                            return (
                                isAvailable ?
                                    <div className="product-card" key={items._id}>
                                        <img src={items.image} alt={items.name} />
                                        <p>{items.name}</p>
                                        <span>✕ {items.quantity}</span>
                                    </div>
                                    :
                                    <div className="product-card sold-out" key={items._id}>
                                        <img src={items.image} alt={items.name} />
                                        <p>{items.name}</p>
                                        <span>Sold Out</span>
                                    </div>
                            )
                        })
                    }
                </div>
                <div className="total-method info">
                    <h3>Method</h3>
                    <p>Cash on Delivery</p>
                </div>
                <div className="total-subtotal info">
                    <h3>Subtotal</h3>
                    <p>${fullPrice.toFixed(2)}</p>
                </div>
                <div className="total-shipping info">
                    <h3>Shipping</h3>
                    <p>${state.length * orderData.tax}</p>
                </div>
                <div className="total-total info">
                    <h3>Total</h3>
                    <p><span>${fullPrice ? (fullPrice + 20).toFixed(2) : 0}</span></p>
                </div>
                <div className="button">
                    <button onClick={() => placeOrder()}>{loading ? "Processing..." : "Place Order"}</button>
                </div>
                <div className="secure-tags">
                    <div className="label">
                        <svg className="w-3.5 h-3.5" fill="none" width="16" height="16" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        <p>Secure Checkout</p>
                    </div>
                    <p>Your data is protected and safe with us.</p>
                </div>
            </div>
        </div>
    )
}

export default CheckoutBody;