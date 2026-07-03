import empty_product from '../../../assets/empty-products.svg';

function ProductEmptyContainer() {
    return (
        <div className="admin-empty-user-container">
            <div className="container-top">
                <img src={empty_product} alt="emty-cart-image" />
            </div>
            <div className="container-bottom">
                <h1>No Products Here</h1>
                <p>Looks like you haven't any Products here.</p>
            </div>
        </div>
    )
}

export default ProductEmptyContainer;