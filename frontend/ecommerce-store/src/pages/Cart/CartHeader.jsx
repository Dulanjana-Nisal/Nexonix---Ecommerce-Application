import { Link } from 'react-router-dom'

function CartHeader() {
    return (
        <div class="cart-header">
            <div class="header-content">
                <h1>Chopping Cart</h1>
                <p><span><Link to="/" style={{ textDecoration: "none", color: "#8f9293" }}>Home</Link> /</span> Shopping Cart</p>
            </div>
        </div>
    )
}

export default CartHeader;