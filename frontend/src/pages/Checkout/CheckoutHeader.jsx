import { Link } from "react-router-dom";

function CheckoutHeader() {
    return (
        <div className="checkout-header">
            <div className="header-content">
                <h1>Checkout</h1>
                <p><span><Link to='/' className="no-style-link">Home</Link> /</span> Checkout</p>
            </div>
        </div>
    )
}

export default CheckoutHeader;