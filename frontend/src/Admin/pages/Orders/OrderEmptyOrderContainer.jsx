import empty_user from '../../../assets/empty-orders.svg';

function OrderEmptyOrderContainer() {
    return (
        <div className="admin-empty-order-container">
            <div className="container-top">
                <img src={empty_user} alt="emty-cart-image" />
            </div>
            <div className="container-bottom">
                <h1>Not Orders Here</h1>
                <p>Looks like you haven't any Orders here.</p>
            </div>
        </div>
    )
}

export default OrderEmptyOrderContainer;