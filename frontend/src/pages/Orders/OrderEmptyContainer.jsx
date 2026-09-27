import { Link } from "react-router-dom";
import empty_order from '../../assets/empty-orders.svg'

function OrderEmptyContainer() {
    return (
        <div className="empty-order-container">
            <div className="container-top">
                <img src={empty_order} alt="emty-cart-image" />
            </div>
            <div className="container-bottom">
                <h1>Your Order list is empty</h1>
                <p>Looks like you haven't added anything to your orders yet.</p>
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
    )
}

export default OrderEmptyContainer;