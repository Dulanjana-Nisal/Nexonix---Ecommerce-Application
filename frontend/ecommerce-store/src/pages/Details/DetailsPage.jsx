import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './DetailsPage.css';
import user_profile from '../../assets/user-profile-image.png';
import resize_image from '../../assets/resize-image.svg';
import close_btn_image from '../../assets/close-btn.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/auth';

function DetailsPage() {

    const [producatDetails,setProductDetails] = useState([])
    const [producatKeywords,setProducatKeywords] = useState([])
    const [fullScreen,setFullScreen] = useState(false)
    const [quantity,setQuantity] = useState(1);
    const [option,setOption] = useState(false)

    function addQnt(){
        const sum = quantity +1
        quantity == producatDetails.stock ? setQuantity(producatDetails.stock) : setQuantity(sum)
    }
    function minQnt(){
        const sum = quantity -1
        quantity === 1 ? setQuantity(1) : setQuantity(sum)
    }

    //get product id form url
    const {productId} = useParams(); 

    useEffect(()=>{
        const fetchProductDetails = async ()=>{
            const result = await axios.get(`http://localhost:5000/api/v1/products/${productId}`);
            setProductDetails(result.data.data)
            setProducatKeywords(result.data.data.keywords)
        }
        fetchProductDetails();
        window.scrollTo(top)
    }, [productId])

    //add product in to cart
    const addProductToCart = async ()=>{
        try{
            const addCart = await api.post('/cart',{
                items: {
                    productId: producatDetails._id,
                    name: producatDetails.name,
                    image: producatDetails.image,
                    quantity: quantity,
                    price: producatDetails.price,
                    availability: producatDetails.availability
                }
            })
            console.log(addCart.data)
        }
        catch(err){
            console.log(err.response)
        }
    }

    let ratings;
    if(producatDetails.ratings === 5){
        ratings = <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9733; <span>( 50 Reviews )</span></p>
    }if(producatDetails.ratings === 4){
        ratings = <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734; <span>( 50 Reviews )</span></p>
    }if(producatDetails.ratings === 3){
        ratings = <p class="four-star">&#9733; &#9733; &#9733; &#9734; &#9734; <span>( 50 Reviews )</span></p>
    }if(producatDetails.ratings === 2){
        ratings = <p class="four-star">&#9733; &#9733; &#9734; &#9734; &#9734; <span>( 50 Reviews )</span></p>
    }if(producatDetails.ratings === 1){
        ratings = <p class="four-star">&#9733; &#9734; &#9734; &#9734; &#9734; <span>( 50 Reviews )</span></p>
    }

    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div class="details-container">
                <div class="container-header">
                    <p><Link to="/" style={{textDecoration: "none"}}><span>Home</span></Link> / <Link to={`/products/${producatDetails.category}`} style={{textDecoration: "none"}}><span>{producatDetails.category}</span></Link> / {producatDetails.name}</p>
                </div>
                <div class="container-product">
                    <div class="product-image">
                        <div class="thumb-image">
                            <img src={producatDetails.image} alt="product-image" />
                            <button  onClick={()=>{setFullScreen(true)}}><img src={resize_image} alt=""/></button>
                        </div>
                        {
                            fullScreen &&
                            <div class="full-image">
                                <button class="close"><img src={close_btn_image} alt="" onClick={()=>{setFullScreen(false)}}/></button>
                                <img src={producatDetails.image} alt="" />
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
                                {ratings}
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
                                <button class="min" onClick={()=>minQnt()}>−</button>
                                <p>{quantity}</p>
                                <button class="plus" onClick={()=>addQnt()}>+</button>
                            </div>
                        </div>
                        <div class="product-description row">
                            <p>{producatDetails.description}</p>
                        </div>
                        <div class="product-buttons row">
                            <button class="cart" onClick={() => addProductToCart()}>Add To Cart</button>
                            <button class="buy">Buy Now</button>
                        </div>
                        <div class="product-more row">
                            <p>Guarantee safe & Secure checkout</p>
                            <img src="https://uminex.kutethemes.net/wp-content/uploads/2022/12/01-payment.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div class="container-options">
                    <div class="option-header">
                        <div class={!option ? "description selected" : "description"} onClick={()=>{setOption(false)}}>
                            <p>Description</p>
                        </div>
                        <div class={option ? "reviews selected" : "reviews"} onClick={()=>{setOption(true)}}>
                            <p>Reviews</p>
                        </div>
                    </div>
                    <div class="option-body">
                        {
                            !option &&  
                            <div class="description-body">
                                <div class="name row">
                                    <h3>Product Name: </h3>
                                    <p>{producatDetails.name}</p>
                                </div>
                                <div class="price row">
                                    <h3>Product price: </h3>
                                    <p>${producatDetails.price}</p>
                                </div>
                                <div class="ratings row">
                                    <h3>Ratings: </h3>
                                    {ratings}
                                </div>
                                <div class="description row">
                                    <h3>Product description: </h3>
                                    <p>{producatDetails.description}</p>
                                </div>
                                <div class="keywords row">
                                    <h3>Keywords: </h3>
                                    <div class="tags">
                                        {
                                            producatKeywords.map((items)=>{
                                                return(
                                                    <p>{items}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div class="category row">
                                    <h3>Product Category: </h3>
                                    <p>{producatDetails.category}</p>
                                </div>
                                <div class="brand row">
                                    <h3>Brand: </h3>
                                    <p>{producatDetails.brand}</p>
                                </div>
                            </div>
                        }
                        {
                            option &&
                            <div class="reviews-body">
                                <div class="review-box">
                                    <div class="box-head">
                                        <div class="total-reviews">
                                            <h1>4.5</h1>
                                            <p class="four">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                        </div>
                                        <div class="count-reviews">
                                            <div class="five-star row">
                                                <p class="star">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                                <div class="range-row">
                                                    <div class="range"></div>
                                                </div>
                                                <p>2</p>
                                            </div>
                                            <div class="four-star row">
                                                <p class="star">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                                <div class="range-row">
                                                    <div class="range"></div>
                                                </div>
                                                <p>1</p>
                                            </div>
                                            <div class="three-star row">
                                                <p class="star">&#9733; &#9733; &#9733; &#9734; &#9734;</p>
                                                <div class="range-row">
                                                    <div class="range"></div>
                                                </div>
                                                <p>0</p>
                                            </div>
                                            <div class="two-star row">
                                                <p class="star">&#9733; &#9733; &#9734; &#9734; &#9734;</p>
                                                <div class="range-row">
                                                    <div class="range"></div>
                                                </div>
                                                <p>0</p>
                                            </div>
                                            <div class="one-star row">
                                                <p class="star">&#9733; &#9734; &#9734; &#9734; &#9734;</p>
                                                <div class="range-row">
                                                    <div class="range"></div>
                                                </div>
                                                <p>0</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-body">
                                        <div class="title">
                                            <p>3 Reviews for "<span>Lenovo Legion 7i Gen 9 Laptop</span>"</p>
                                        </div>
                                        <div class="reviews">
                                            <div class="user-review">
                                                <div class="profile-image">
                                                    <img src={user_profile} alt="user-profile" />
                                                </div>
                                                <div class="profile-data">
                                                    <div class="name">
                                                        <h3>Admin</h3>
                                                        <p>2026.02.01</p>
                                                    </div>
                                                    <div class="stars">
                                                        <p class="four">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="user-comment">
                                                <p>I love Apple products so it’s no surprise that I love this iPad, but BOY am I
                                                    happy! I’ve never owned an iPad…but I’ve always wanted one and this one is
                                                    perfect. From what I can tell, the only different really between the Air and Pro
                                                    is the refresh rate, and honestly I can’t really tell a difference with what I
                                                    use it for.</p>
                                            </div>
                                        </div>
                                        <div class="reviews">
                                            <div class="user-review">
                                                <div class="profile-image">
                                                    <img src={user_profile} alt="user-profile" />
                                                </div>
                                                <div class="profile-data">
                                                    <div class="name">
                                                        <h3>Admin</h3>
                                                        <p>2026.02.01</p>
                                                    </div>
                                                    <div class="stars">
                                                        <p class="four">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="user-comment">
                                                <p>I love Apple products so it’s no surprise that I love this iPad, but BOY am I
                                                    happy! I’ve never owned an iPad…but I’ve always wanted one and this one is
                                                    perfect. From what I can tell, the only different really between the Air and Pro
                                                    is the refresh rate, and honestly I can’t really tell a difference with what I
                                                    use it for.</p>
                                            </div>
                                        </div>
                                        <div class="reviews">
                                            <div class="user-review">
                                                <div class="profile-image">
                                                    <img src={user_profile} alt="user-profile" />
                                                </div>
                                                <div class="profile-data">
                                                    <div class="name">
                                                        <h3>Admin</h3>
                                                        <p>2026.02.01</p>
                                                    </div>
                                                    <div class="stars">
                                                        <p class="four">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="user-comment">
                                                <p>I love Apple products so it’s no surprise that I love this iPad, but BOY am I
                                                    happy! I’ve never owned an iPad…but I’ve always wanted one and this one is
                                                    perfect. From what I can tell, the only different really between the Air and Pro
                                                    is the refresh rate, and honestly I can’t really tell a difference with what I
                                                    use it for.</p>
                                            </div>
                                        </div>
                                        <div class="reviews">
                                            <div class="user-review">
                                                <div class="profile-image">
                                                    <img src={user_profile} alt="user-profile" />
                                                </div>
                                                <div class="profile-data">
                                                    <div class="name">
                                                        <h3>Admin</h3>
                                                        <p>2026.02.01</p>
                                                    </div>
                                                    <div class="stars">
                                                        <p class="four">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="user-comment">
                                                <p>I love Apple products so it’s no surprise that I love this iPad, but BOY am I
                                                    happy! I’ve never owned an iPad…but I’ve always wanted one and this one is
                                                    perfect. From what I can tell, the only different really between the Air and Pro
                                                    is the refresh rate, and honestly I can’t really tell a difference with what I
                                                    use it for.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-buttons">
                                        <button class="pre">‹</button>
                                        <p><span>1</span> of 2</p>
                                        <button class="next">›</button>
                                    </div>
                                </div>
                                <div class="add-reviews">
                                    <div class="add-review-head">
                                        <h3>Add a Review</h3>
                                    </div>
                                    <div class="add-review-content">
                                        <div class="loged-content">
                                            <form>
                                                <div class="star-count">
                                                    <div class="label">
                                                        <h4>Your Ratings <span>*</span></h4>
                                                    </div>
                                                    <div class="ratings">
                                                        <input type="radio" name="rating" id="5-star" /><label for="5-star">★</label>
                                                        <input type="radio" name="rating" id="4-star" /><label for="4-star">★</label>
                                                        <input type="radio" name="rating" id="3-star" /><label for="3-star">★</label>
                                                        <input type="radio" name="rating" id="2-star" /><label for="2-star">★</label>
                                                        <input type="radio" name="rating" id="1-star" /><label for="1-star">★</label>
                                                    </div>
                                                </div>
                                                <textarea name="review" placeholder="Write Your Review Here..."></textarea><br />
                                                <input type="submit" value="Submit" class="submit-btn" />
                                            </form>
                                        </div>
                                        <div class="nunloged-content">
                                            <p>You must <span>Login</span> in to Add reviews.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div class="container-suggetions">
                    <div class="section-grid">
                        {/* <!-- suggetions --> */}
                        <div class="grid-box">
                            <div class="box-header">
                                <p>Related Products</p>
                            </div>
                            <div class="box-card-row">
                                <div class="card">
                                    <div class="box-head">
                                        <img src="../../images/card-image.png" alt="product-img" />
                                    </div>
                                    <div class="box-body">
                                        <div class="name">
                                            <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                        </div>
                                        <div class="ratings">
                                            <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p><span>( 50 )</span>
                                        </div>
                                        <div class="price">
                                            <p>$34.54</p>
                                            <div class="availability">
                                                <p class="in-stock">In Stock</p>
                                            </div>
                                        </div>
                                        <div class="button">
                                            <button>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="box-head">
                                        <img src="../../images/card-image.png" alt="product-img" />
                                    </div>
                                    <div class="box-body">
                                        <div class="name">
                                            <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                        </div>
                                        <div class="ratings">
                                            <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p><span>( 50 )</span>
                                        </div>
                                        <div class="price">
                                            <p>$34.54</p>
                                            <div class="availability">
                                                <p class="in-stock">In Stock</p>
                                            </div>
                                        </div>
                                        <div class="button">
                                            <button>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="box-head">
                                        <img src="../../images/card-image.png" alt="product-img" />
                                    </div>
                                    <div class="box-body">
                                        <div class="name">
                                            <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                        </div>
                                        <div class="ratings">
                                            <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p><span>( 50 )</span>
                                        </div>
                                        <div class="price">
                                            <p>$34.54</p>
                                            <div class="availability">
                                                <p class="in-stock">In Stock</p>
                                            </div>
                                        </div>
                                        <div class="button">
                                            <button>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="box-head">
                                        <img src="../../images/card-image.png" alt="product-img" />
                                    </div>
                                    <div class="box-body">
                                        <div class="name">
                                            <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                        </div>
                                        <div class="ratings">
                                            <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p><span>( 50 )</span>
                                        </div>
                                        <div class="price">
                                            <p>$34.54</p>
                                            <div class="availability">
                                                <p class="in-stock">In Stock</p>
                                            </div>
                                        </div>
                                        <div class="button">
                                            <button>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="box-head">
                                        <img src="../../images/card-image.png" alt="product-img" />
                                    </div>
                                    <div class="box-body">
                                        <div class="name">
                                            <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                        </div>
                                        <div class="ratings">
                                            <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p><span>( 50 )</span>
                                        </div>
                                        <div class="price">
                                            <p>$34.54</p>
                                            <div class="availability">
                                                <p class="in-stock">In Stock</p>
                                            </div>
                                        </div>
                                        <div class="button">
                                            <button>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="box-head">
                                        <img src="../../images/card-image.png" alt="product-img" />
                                    </div>
                                    <div class="box-body">
                                        <div class="name">
                                            <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                        </div>
                                        <div class="ratings">
                                            <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p><span>( 50 )</span>
                                        </div>
                                        <div class="price">
                                            <p>$34.54</p>
                                            <div class="availability">
                                                <p class="in-stock">In Stock</p>
                                            </div>
                                        </div>
                                        <div class="button">
                                            <button>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="box-head">
                                        <img src="../../images/card-image.png" alt="product-img" />
                                    </div>
                                    <div class="box-body">
                                        <div class="name">
                                            <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                        </div>
                                        <div class="ratings">
                                            <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p><span>( 50 )</span>
                                        </div>
                                        <div class="price">
                                            <p>$34.54</p>
                                            <div class="availability">
                                                <p class="in-stock">In Stock</p>
                                            </div>
                                        </div>
                                        <div class="button">
                                            <button>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="box-head">
                                        <img src="../../images/card-image.png" alt="product-img" />
                                    </div>
                                    <div class="box-body">
                                        <div class="name">
                                            <p>Lenovo Legion 7i Gen 9 Laptop</p>
                                        </div>
                                        <div class="ratings">
                                            <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p><span>( 50 )</span>
                                        </div>
                                        <div class="price">
                                            <p>$34.54</p>
                                            <div class="availability">
                                                <p class="in-stock">In Stock</p>
                                            </div>
                                        </div>
                                        <div class="button">
                                            <button>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="btns">
                                    <button class="left">‹</button>
                                    <button class="right">›</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default DetailsPage;