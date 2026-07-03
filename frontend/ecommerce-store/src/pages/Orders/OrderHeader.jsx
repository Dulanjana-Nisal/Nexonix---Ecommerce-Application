import { Link } from "react-router-dom";

function OrderHeader() {
    return (
        <div className="order-header">
            <div className="header-content">
                <h1>Your Orders</h1>
                <p><span><Link to='/' className="no-style-link">Home</Link> /</span> Your Orders</p>
            </div>
        </div>
    )
}

export default OrderHeader;