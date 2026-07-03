import { Link } from "react-router-dom";
import user_profile from '../../assets/user-profile-image.png';

function DetailsOptionContainer({option,setOption,producatDetails,ratingsQuery,producatKeywords,reviewsCounter,reviewsResult,reviews,user,page,setPage,limitResult,submitReviews,addReviews,setAddReviews}) {
    return (
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
                                            <p key={items}>{items}</p>
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
                                            <div class="range" style={{ width: ` ${(reviewsCounter(5) / reviewsResult.all_result) * 100}%` }}></div>
                                        </div>
                                        <p>{reviewsCounter(5)}</p>
                                    </div>
                                    <div class="four-star row">
                                        <p class="star">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                        <div class="range-row">
                                            <div class="range" style={{ width: ` ${(reviewsCounter(4) / reviewsResult.all_result) * 100}%` }}></div>
                                        </div>
                                        <p>{reviewsCounter(4)}</p>
                                    </div>
                                    <div class="three-star row">
                                        <p class="star">&#9733; &#9733; &#9733; &#9734; &#9734;</p>
                                        <div class="range-row">
                                            <div class="range" style={{ width: ` ${(reviewsCounter(3) / reviewsResult.all_result) * 100}%` }}></div>
                                        </div>
                                        <p>{reviewsCounter(3)}</p>
                                    </div>
                                    <div class="two-star row">
                                        <p class="star">&#9733; &#9733; &#9734; &#9734; &#9734;</p>
                                        <div class="range-row">
                                            <div class="range" style={{ width: ` ${(reviewsCounter(2) / reviewsResult.all_result) * 100}%` }}></div>
                                        </div>
                                        <p>{reviewsCounter(2)}</p>
                                    </div>
                                    <div class="one-star row">
                                        <p class="star">&#9733; &#9734; &#9734; &#9734; &#9734;</p>
                                        <div class="range-row">
                                            <div class="range" style={{ width: ` ${(reviewsCounter(1) / reviewsResult.all_result) * 100}%` }}></div>
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
                                    reviews.map((items) => {
                                        return (
                                            <div class="reviews" key={items._id}>
                                                <div class="user-review">
                                                    <div class="profile-image">
                                                        <img style={{ border: items.userId === user._id ? '2px solid #2B38D1' : 'none' }} src={user_profile} alt="user-profile" />
                                                    </div>
                                                    <div class="profile-data">
                                                        <div class="name">
                                                            <h3>{items.userName}</h3>
                                                            <p>{(items.createdAt).slice(0, 10)} </p>
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
                                        <button class="pre" onClick={() => setPage(prev => prev - 1)}>‹</button>
                                    }
                                    <p><span>{reviewsResult.page}</span> of {limitResult || 1}</p>
                                    {
                                        limitResult !== page &&
                                        <button class="next" onClick={() => setPage(prev => prev + 1)}>›</button>
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
                                                        <input type="radio" name="rating" id="5-star" onClick={() => setAddReviews({ ...addReviews, ratings: 5 })} /><label for="5-star">★</label>
                                                        <input type="radio" name="rating" id="4-star" onClick={() => setAddReviews({ ...addReviews, ratings: 4 })} /><label for="4-star">★</label>
                                                        <input type="radio" name="rating" id="3-star" onClick={() => setAddReviews({ ...addReviews, ratings: 3 })} /><label for="3-star">★</label>
                                                        <input type="radio" name="rating" id="2-star" onClick={() => setAddReviews({ ...addReviews, ratings: 2 })} /><label for="2-star">★</label>
                                                        <input type="radio" name="rating" id="1-star" onClick={() => setAddReviews({ ...addReviews, ratings: 1 })} /><label for="1-star">★</label>
                                                    </div>
                                                </div>
                                                <textarea value={addReviews.message} name="review" placeholder="Write Your Review Here..." onChange={(e) => setAddReviews({ ...addReviews, message: e.target.value })}></textarea><br />
                                                <input type="submit" value="Submit" class="submit-btn" />
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
    )
}

export default DetailsOptionContainer;