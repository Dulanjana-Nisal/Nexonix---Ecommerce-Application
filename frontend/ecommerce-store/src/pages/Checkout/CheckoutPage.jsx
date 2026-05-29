import './CheckoutPage.css'
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterCompoennt from '../../components/Footer/FooterComponent';

function CheckoutPage() {
    return (
        <>
            <HeaderComponent />
            <div class="checkout-container">
                <div class="checkout-header">
                    <div class="header-content">
                        <h1>Checkout</h1>
                        <p><span>Home /</span> Checkout</p>
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
                                        <input type="text" />
                                    </div>
                                    <div class="last-name">
                                        <label>Last Name</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div class="address-1 box">
                                    <label>Address 1</label>
                                    <input type="text" />
                                </div>
                                <div class="address-2 box">
                                    <label>Address 2</label>
                                    <input type="text" />
                                </div>
                                <div class="city box">
                                    <label>City Name</label>
                                    <input type="text" />
                                </div>
                                <div class="zipcode box">
                                    <label>Zip Code</label>
                                    <input type="text" />
                                </div>
                                <div class="phone box">
                                    <label>Phone Number</label>
                                    <input type="number" />
                                </div>
                                <div class="email box">
                                    <label>Email Address</label>
                                    <input type="email" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="total-card">
                        <div class="total-head">
                            <h1>Your Order</h1>
                        </div>
                        <div class="total-product info">
                            <div class="product-card">
                                <img src="../../images/card-image.png" alt="" />
                                <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                <span>✕ 2</span>
                            </div>
                            <div class="product-card">
                                <img src="../../images/card-image.png" alt="" />
                                <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                <span>✕ 2</span>
                            </div>
                            <div class="product-card">
                                <img src="../../images/card-image.png" alt="" />
                                <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                <span>✕ 2</span>
                            </div>
                        </div>
                        <div class="total-method info">
                            <h3>Method</h3>
                            <p>Cash on Delivery</p>
                        </div>
                        <div class="total-subtotal info">
                            <h3>Subtotal</h3>
                            <p>$289.34</p>
                        </div>
                        <div class="total-shipping info">
                            <h3>Shipping</h3>
                            <p>$20.00</p>
                        </div>
                        <div class="total-total info">
                            <h3>Total</h3>
                            <p><span>$302.34</span></p>
                        </div>
                        <div class="button">
                            <button>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default CheckoutPage;