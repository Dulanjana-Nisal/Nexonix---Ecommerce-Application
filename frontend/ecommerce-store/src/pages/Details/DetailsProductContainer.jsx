import resize_image from '../../assets/resize-image.svg';
import close_btn_image from '../../assets/close-btn.png';

function DetailsProductContainer({producatDetails,setFullScreen,fullScreen,ratingsQuery,reviewsResult,quantity,state,minQnt,addQnt,addCartItems,dispatch,setupMessage}) {
    return (
        <div class="container-product">
            <div class="product-image">
                <div class="thumb-image">
                    <img src={producatDetails.image} alt="product-image" />
                    <button onClick={() => { setFullScreen(true) }}><img src={resize_image} alt="" /></button>
                </div>
                {
                    fullScreen &&
                    <div class="full-image">
                        <div class="full-image-background">
                            <button class="close"><img src={close_btn_image} alt="" onClick={() => { setFullScreen(false) }} /></button>
                            <img src={producatDetails.image} alt="" />
                            <div class="product-details">
                                <div class="details-product-data">
                                    <h2>{producatDetails.name}</h2>
                                    <p>
                                        {ratingsQuery[producatDetails.ratings]}<span>( {reviewsResult.all_result || 0} Reviews )</span>
                                    </p>
                                </div>
                                <div class="screen-data">
                                    <h4>Full Screen Mode</h4>
                                    <p>Zoom 100%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div class="product-details">
                <div class="product-name row">
                    <h1>{producatDetails.name}</h1>
                </div>
                <div class="product-data row">
                    <div class="availability">
                        <p>Availability:</p>
                        <h4 class={producatDetails.availability ? "in-stock" : "out-stock"}>{producatDetails.availability ? "In Stock" : "Out Stock"}</h4>
                    </div>
                    <div class="review">
                        {ratingsQuery[producatDetails.ratings]}<span>( {reviewsResult.all_result || 0} Reviews )</span>
                    </div>
                    <div class="brand">
                        <p>Brand: </p>
                        <h4>{producatDetails.brand}</h4>
                    </div>
                </div>
                <div class="product-price row">
                    <p class="price">${producatDetails.price}</p>
                    <p class="stock">( {producatDetails.stock} items in stock )</p>
                </div>
                <div class="product-qnt row">
                    <div class="qnt-tag">
                        <p>Quantity: </p>
                    </div>
                    <div class="qnt-counter">
                        <button class="min" onClick={() => minQnt()}>−</button>
                        <p>{quantity}</p>
                        <button class="plus" onClick={() => addQnt()}>+</button>
                    </div>
                </div>
                <div class="product-description row">
                    <p>{producatDetails.description}</p>
                </div>
                <div class="product-buttons row">
                    {
                        state.find(item => item.productId == producatDetails._id) ?
                            <button style={{ opacity: "0.5", cursor: " not-allowed" }}>in Cart</button>
                            :
                            <button class="cart" onClick={() => addCartItems(producatDetails._id, producatDetails.name, producatDetails.image, quantity, producatDetails.price, producatDetails.availability, dispatch, setupMessage)}>Add To Cart</button>

                    }
                </div>
                <div class="product-more row">
                    <p>Guarantee safe & Secure checkout</p>
                    <img src="https://uminex.kutethemes.net/wp-content/uploads/2022/12/01-payment.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default DetailsProductContainer;