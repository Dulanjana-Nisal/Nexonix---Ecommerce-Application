import { Link } from "react-router-dom";

function CheckoutHeader() {
    return (
        <div class="checkout-header">
            <div class="header-content">
                <h1>Checkout</h1>
                <p><span><Link to='/' class="no-style-link">Home</Link> /</span> Checkout</p>
            </div>
        </div>
    )
}

export default CheckoutHeader;