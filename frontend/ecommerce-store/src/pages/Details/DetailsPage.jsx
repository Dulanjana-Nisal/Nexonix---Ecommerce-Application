import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './DetailsPage.css';
import user_profile from '../../assets/user-profile-image.png';
import resize_image from '../../assets/resize-image.svg';
import close_btn_image from '../../assets/close-btn.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { addCartItems } from '../../api/cartApi';
import { Cart } from '../../context/CartContext';
import { Message } from '../../context/MessagesContext';
import api from '../../services/auth';
import ProductComponent from '../../components/Product/ProductComponent';

function DetailsPage() {

    // load context
    const { state, dispatch,user } = Cart();
    const {setupMessage} = Message();

    //get product id form url
    const { productId } = useParams();

    //use states
    const [producatDetails, setProductDetails] = useState([])
    const [productRecomendation, setProductRecomendation] = useState([])
    const [producatKeywords, setProducatKeywords] = useState([])
    const [reviews, setReviews] = useState([])
    const [reviewsResult, setReviewsResult] = useState(0)
    const [allReviewsData, setAllReviewsData] = useState([])
    const [fullScreen, setFullScreen] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const [option, setOption] = useState(false)
    const [addReviews,setAddReviews] = useState({productId: productId})
    const [refesh,setRefesh] = useState(false)
    const [page,setPage] = useState(1)

    // add quntity
    function addQnt() {
        const sum = quantity + 1
        quantity == producatDetails.stock ? setQuantity(producatDetails.stock) : setQuantity(sum)
    }

    //min quantity
    function minQnt() {
        const sum = quantity - 1
        quantity === 1 ? setQuantity(1) : setQuantity(sum)
    }

    // fetch all data
    useEffect(() => {
        const fetchAllData = async () => {
            const [products, recommendations,allReviewsData] = await Promise.all([
                axios.get(`http://localhost:5000/api/v1/products/${productId}`),
                axios.get(`http://localhost:5000/api/v1/products/${productId}/recommendations`),
                axios.get(`http://localhost:5000/api/v1/reviews?productId=${productId}&limit=all`),
            ])
            setProductDetails(products.data.data)
            setProducatKeywords(products.data.data.keywords)
            setProductRecomendation(recommendations.data.data)
            setAllReviewsData(allReviewsData.data.data)
        }
        fetchAllData()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [productId,refesh])

    //fetch reviews data
    useEffect(() => {
        const fetchReviews = async () => {
            try{
                const result = await axios.get(`http://localhost:5000/api/v1/reviews?productId=${productId}&page=${page}`)
                setReviews(result.data.data)
                setReviewsResult(result.data)
            }
            catch(err){
                console.log(err.response)
            }
        }
        fetchReviews();
    }, [productId,refesh,page])

    //submit reviews
    const submitReviews = async (e)=>{
        e.preventDefault();

        //calculate new rating count
        const avg = Number(producatDetails.ratings) || 0;
        const count = Number(reviewsResult.all_result) || 0;
        const newRating = Number(addReviews.ratings);
        const newRatingCount = (avg * count + newRating) / (count + 1);

        try{
            await api.post('/reviews', addReviews)
            await api.patch(`/products/${productId}`, {ratings: Math.round(newRatingCount)})
            setPage(1)
        }
        catch(err){
            console.log(err.response)
        }
        setRefesh(prev => !prev)
    }

    // display ratings
    const ratingsQuery = {
        5: <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9733; </p>,
        4: <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734; </p>,
        3: <p class="four-star">&#9733; &#9733; &#9733; &#9734; &#9734; </p>,
        2: <p class="four-star">&#9733; &#9733; &#9734; &#9734; &#9734; </p>,
        1: <p class="four-star">&#9733; &#9734; &#9734; &#9734; &#9734; </p>,
    }

    //calculate result limit page
    const limitResult = Math.ceil(reviewsResult.all_result / reviewsResult.limit)

    //count reviews
    function reviewsCounter(countNumber){
        let number = 0
        allReviewsData.map(items => items.ratings === Number(countNumber) && number++)
        return number
    }

    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div class="details-container">
                <div class="container-header">
                    <p><Link to="/" style={{ textDecoration: "none" }}><span>Home</span></Link> / <Link to={`/products/${producatDetails.category}`} style={{ textDecoration: "none" }}><span>{producatDetails.category}</span></Link> / {producatDetails.name}</p>
                </div>
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
                                    <button class="cart" onClick={() => addCartItems(producatDetails._id, producatDetails.name, producatDetails.image, quantity, producatDetails.price, producatDetails.availability, dispatch,setupMessage)}>Add To Cart</button>

                            }
                        </div>
                        <div class="product-more row">
                            <p>Guarantee safe & Secure checkout</p>
                            <img src="https://uminex.kutethemes.net/wp-content/uploads/2022/12/01-payment.svg" alt="" />
                        </div>
                    </div>
                </div>
                <div class="container-options">
                    <div class="option-header">
                        <div class={!option ? "description selected" : "description"} onClick={() => { setOption(false) }}>
                            <p>Description</p>
                        </div>
                        <div class={option ? "reviews selected" : "reviews"} onClick={() => { setOption(true) }}>
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
                                    {ratingsQuery[producatDetails.ratings]}
                                </div>
                                <div class="description row">
                                    <h3>Product description: </h3>
                                    <p>{producatDetails.description}</p>
                                </div>
                                <div class="keywords row">
                                    <h3>Keywords: </h3>
                                    <div class="tags">
                                        {
                                            producatKeywords.map((items) => {
                                                return (
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
                                            <h1>{(producatDetails.ratings).toFixed(1)}</h1>
                                            {ratingsQuery[producatDetails.ratings]}
                                        </div>
                                        <div class="count-reviews">
                                            <div class="five-star row">
                                                <p class="star">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                                <div class="range-row">
                                                    <div class="range" style={{width: ` ${(reviewsCounter(5) /reviewsResult.all_result)*100}%`}}></div>
                                                </div>
                                                <p>{reviewsCounter(5)}</p>
                                            </div>
                                            <div class="four-star row">
                                                <p class="star">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                                <div class="range-row">
                                                    <div class="range" style={{width: ` ${(reviewsCounter(4) /reviewsResult.all_result)*100}%`}}></div>
                                                </div>
                                                <p>{reviewsCounter(4)}</p>
                                            </div>
                                            <div class="three-star row">
                                                <p class="star">&#9733; &#9733; &#9733; &#9734; &#9734;</p>
                                                <div class="range-row">
                                                    <div class="range" style={{width: ` ${(reviewsCounter(3) /reviewsResult.all_result)*100}%`}}></div>
                                                </div>
                                                <p>{reviewsCounter(3)}</p>
                                            </div>
                                            <div class="two-star row">
                                                <p class="star">&#9733; &#9733; &#9734; &#9734; &#9734;</p>
                                                <div class="range-row">
                                                    <div class="range" style={{width: ` ${(reviewsCounter(2) /reviewsResult.all_result)*100}%`}}></div>
                                                </div>
                                                <p>{reviewsCounter(2)}</p>
                                            </div>
                                            <div class="one-star row">
                                                <p class="star">&#9733; &#9734; &#9734; &#9734; &#9734;</p>
                                                <div class="range-row">
                                                    <div class="range" style={{width: ` ${(reviewsCounter(1) /reviewsResult.all_result)*100}%`}}></div>
                                                </div>
                                                <p>{reviewsCounter(1)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="box-body">
                                        <div class="title">
                                            <p>{reviewsResult.all_result} Reviews for "<span>{producatDetails.name}</span>"</p>
                                        </div>
                                        {
                                            reviews.length > 0 &&
                                            reviews.map((items)=>{
                                                return(
                                                    <div class="reviews" key={items._id}>
                                                        <div class="user-review">
                                                            <div class="profile-image">
                                                                <img src={user_profile} alt="user-profile" />
                                                            </div>
                                                            <div class="profile-data">
                                                                <div class="name">
                                                                    <h3>{items.userName}</h3>
                                                                    <p>{(items.createdAt).slice(0, 10)}</p>
                                                                </div>
                                                                <div class="stars">
                                                                    {ratingsQuery[items.ratings]}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="user-comment">
                                                            <p>{items.message}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        reviews.length > 0 &&
                                        <div class="box-buttons">
                                            {
                                                page !== 1 &&
                                                <button class="pre" onClick={() => setPage(prev => prev - 1 )}>‹</button>
                                            }
                                            <p><span>{reviewsResult.page}</span> of {limitResult || 1}</p>
                                            {
                                                limitResult !== page &&
                                                <button class="next" onClick={() => setPage(prev => prev + 1 )}>›</button>
                                            }
                                        </div>
                                    }
                                </div>
                                <div class="add-reviews">
                                    <div class="add-review-head">
                                        <h3>Add a Review</h3>
                                    </div>
                                    <div class="add-review-content">
                                        {
                                            user ?
                                            <div class="loged-content">
                                                <form onSubmit={submitReviews}>
                                                    <div class="star-count">
                                                        <div class="label">
                                                            <h4>Your Ratings <span>*</span></h4>
                                                        </div>
                                                        <div class="ratings">
                                                            <input type="radio" name="rating" id="5-star" onClick={() => setAddReviews({...addReviews, ratings: 5})} /><label for="5-star">★</label>
                                                            <input type="radio" name="rating" id="4-star" onClick={() => setAddReviews({...addReviews, ratings: 4})} /><label for="4-star">★</label>
                                                            <input type="radio" name="rating" id="3-star" onClick={() => setAddReviews({...addReviews, ratings: 3})} /><label for="3-star">★</label>
                                                            <input type="radio" name="rating" id="2-star" onClick={() => setAddReviews({...addReviews, ratings: 2})} /><label for="2-star">★</label>
                                                            <input type="radio" name="rating" id="1-star" onClick={() => setAddReviews({...addReviews, ratings: 1})} /><label for="1-star">★</label>
                                                        </div>
                                                    </div>
                                                    <textarea value={addReviews.message} name="review" placeholder="Write Your Review Here..." onChange={(e) => setAddReviews({...addReviews, message: e.target.value})}></textarea><br />
                                                    <input type="submit" value="Submit" class="submit-btn"/>
                                                </form>
                                            </div>
                                            :
                                            <div class="nunloged-content">
                                                <p>You must <span><Link to="/account" class="no-style-link">Login</Link></span> in to Add reviews.</p>
                                            </div>
                                        }
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
                                {
                                    productRecomendation.map((items) => {
                                        return (
                                            <ProductComponent items={items} ratings={items.ratings} key={items._id} />
                                        )
                                    })
                                }
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