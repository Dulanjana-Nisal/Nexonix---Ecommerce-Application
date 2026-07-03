import resize_image from '../../assets/resize-image.svg';
import close_btn_image from '../../assets/close-btn.png';

function DetailsProductContainer({ producatDetails, setFullScreen, fullScreen, ratingsQuery, reviewsResult, quantity, state, minQnt, addQnt, addCartItems, dispatch, setupMessage }) {
    return (
        <div className="container-product">
            <div className="product-image">
                <div className="thumb-image">
                    <img src={producatDetails.image} alt="product-image" />
                    <button onClick={() => { setFullScreen(true) }}><img src={resize_image} alt="" /></button>
                </div>
                {
                    fullScreen &&
                    <div className="full-image">
                        <div className="full-image-background">
                            <button className="close"><img src={close_btn_image} alt="" onClick={() => { setFullScreen(false) }} /></button>
                            <img src={producatDetails.image} alt="" />
                            <div className="product-details">
                                <div className="details-product-data">
                                    <h2>{producatDetails.name}</h2>
                                    <p>
                                        {ratingsQuery[producatDetails.ratings]}<span>( {reviewsResult.all_result || 0} Reviews )</span>
                                    </p>
                                </div>
                                <div className="screen-data">
                                    <h4>Full Screen Mode</h4>
                                    <p>Zoom 100%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="product-details">
                <div className="product-name row">
                    <h1>{producatDetails.name}</h1>
                </div>
                <div className="product-data row">
                    <div className="availability">
                        <p>Availability:</p>
                        <h4 className={producatDetails.availability ? "in-stock" : "out-stock"}>{producatDetails.availability ? "In Stock" : "Out Stock"}</h4>
                    </div>
                    <div className="review">
                        {ratingsQuery[producatDetails.ratings]}<span>( {reviewsResult.all_result || 0} Reviews )</span>
                    </div>
                    <div className="brand">
                        <p>Brand: </p>
                        <h4>{producatDetails.brand}</h4>
                    </div>
                </div>
                <div className="product-price row">
                    <p className="price">${producatDetails.price}</p>
                    <p className="stock">( {producatDetails.stock} items in stock )</p>
                </div>
                <div className="product-qnt row">
                    <div className="qnt-tag">
                        <p>Quantity: </p>
                    </div>
                    <div className="qnt-counter">
                        <button className="min" onClick={() => minQnt()}>−</button>
                        <p>{quantity}</p>
                        <button className="plus" onClick={() => addQnt()}>+</button>
                    </div>
                </div>
                <div className="product-description row">
                    <p>{producatDetails.description}</p>
                </div>
                <div className="product-buttons row">
                    {
                        state.find(item => item.productId == producatDetails._id) ?
                            <button style={{ opacity: "0.5", cursor: " not-allowed" }} classNameName='in-cart-btn'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2 3h2l2.6 12.4A2 2 0 0 0 8.6 17h9.8a2 2 0 0 0 2-1.6L22 7H6"></path><polyline points="9.5 11.5 12 14 16.5 9"></polyline></svg>
                                In Your Cart
                            </button>
                            :
                            <button className="cart" onClick={() => addCartItems(producatDetails._id, producatDetails.name, producatDetails.image, quantity, producatDetails.price, producatDetails.availability, dispatch, setupMessage)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"></circle><circle cx="18" cy="20" r="1.4"></circle><path d="M2 3h3l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 7H6"></path></svg>
                                Add To Cart
                            </button>

                    }
                </div>
                <div className="product-more row">
                    <p>Guarantee safe & Secure checkout</p>
                    <img src="https://uminex.kutethemes.net/wp-content/uploads/2022/12/01-payment.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default DetailsProductContainer;