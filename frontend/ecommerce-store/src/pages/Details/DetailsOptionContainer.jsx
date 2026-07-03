import { Link } from "react-router-dom";
import user_profile from '../../assets/user-profile-image.png';

function DetailsOptionContainer({option,setOption,producatDetails,ratingsQuery,producatKeywords,reviewsCounter,reviewsResult,reviews,user,page,setPage,limitResult,submitReviews,addReviews,setAddReviews}) {
    return (
        <div className="container-options">
            <div className="option-header">
                <div className={!option ? "description selected" : "description"} onClick={() => { setOption(false) }}>
                    <p>Description</p>
                </div>
                <div className={option ? "reviews selected" : "reviews"} onClick={() => { setOption(true) }}>
                    <p>Reviews</p>
                </div>
            </div>
            <div className="option-body">
                {
                    !option &&
                    <div className="description-body">
                        <div className="name row">
                            <h3>Product Name: </h3>
                            <p>{producatDetails.name}</p>
                        </div>
                        <div className="price row">
                            <h3>Product price: </h3>
                            <p>${producatDetails.price}</p>
                        </div>
                        <div className="ratings row">
                            <h3>Ratings: </h3>
                            {ratingsQuery[producatDetails.ratings]}
                        </div>
                        <div className="description row">
                            <h3>Product description: </h3>
                            <p>{producatDetails.description}</p>
                        </div>
                        <div className="keywords row">
                            <h3>Keywords: </h3>
                            <div className="tags">
                                {
                                    producatKeywords.map((items) => {
                                        return (
                                            <p key={items}>{items}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="category row">
                            <h3>Product Category: </h3>
                            <p>{producatDetails.category}</p>
                        </div>
                        <div className="brand row">
                            <h3>Brand: </h3>
                            <p>{producatDetails.brand}</p>
                        </div>
                    </div>
                }
                {
                    option &&
                    <div className="reviews-body">
                        <div className="review-box">
                            <div className="box-head">
                                <div className="total-reviews">
                                    <h1>{(producatDetails.ratings).toFixed(1)}</h1>
                                    {ratingsQuery[producatDetails.ratings]}
                                </div>
                                <div className="count-reviews">
                                    <div className="five-star row">
                                        <p className="star">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <div className="range-row">
                                            <div className="range" style={{ width: ` ${(reviewsCounter(5) / reviewsResult.all_result) * 100}%` }}></div>
                                        </div>
                                        <p>{reviewsCounter(5)}</p>
                                    </div>
                                    <div className="four-star row">
                                        <p className="star">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                        <div className="range-row">
                                            <div className="range" style={{ width: ` ${(reviewsCounter(4) / reviewsResult.all_result) * 100}%` }}></div>
                                        </div>
                                        <p>{reviewsCounter(4)}</p>
                                    </div>
                                    <div className="three-star row">
                                        <p className="star">&#9733; &#9733; &#9733; &#9734; &#9734;</p>
                                        <div className="range-row">
                                            <div className="range" style={{ width: ` ${(reviewsCounter(3) / reviewsResult.all_result) * 100}%` }}></div>
                                        </div>
                                        <p>{reviewsCounter(3)}</p>
                                    </div>
                                    <div className="two-star row">
                                        <p className="star">&#9733; &#9733; &#9734; &#9734; &#9734;</p>
                                        <div className="range-row">
                                            <div className="range" style={{ width: ` ${(reviewsCounter(2) / reviewsResult.all_result) * 100}%` }}></div>
                                        </div>
                                        <p>{reviewsCounter(2)}</p>
                                    </div>
                                    <div className="one-star row">
                                        <p className="star">&#9733; &#9734; &#9734; &#9734; &#9734;</p>
                                        <div className="range-row">
                                            <div className="range" style={{ width: ` ${(reviewsCounter(1) / reviewsResult.all_result) * 100}%` }}></div>
                                        </div>
                                        <p>{reviewsCounter(1)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="title">
                                    <p>{reviewsResult.all_result} Reviews for "<span>{producatDetails.name}</span>"</p>
                                </div>
                                {
                                    reviews.length > 0 &&
                                    reviews.map((items) => {
                                        return (
                                            <div className="reviews" key={items._id}>
                                                <div className="user-review">
                                                    <div className="profile-image">
                                                        <img style={{ border: items.userId === user._id ? '2px solid #2B38D1' : 'none' }} src={user_profile} alt="user-profile" />
                                                    </div>
                                                    <div className="profile-data">
                                                        <div className="name">
                                                            <h3>{items.userName}</h3>
                                                            <p>{(items.createdAt).slice(0, 10)} </p>
                                                        </div>
                                                        <div className="stars">
                                                            {ratingsQuery[items.ratings]}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="user-comment">
                                                    <p>{items.message}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                reviews.length > 0 &&
                                <div className="box-buttons">
                                    {
                                        page !== 1 &&
                                        <button className="pre" onClick={() => setPage(prev => prev - 1)}>‹</button>
                                    }
                                    <p><span>{reviewsResult.page}</span> of {limitResult || 1}</p>
                                    {
                                        limitResult !== page &&
                                        <button className="next" onClick={() => setPage(prev => prev + 1)}>›</button>
                                    }
                                </div>
                            }
                        </div>
                        <div className="add-reviews">
                            <div className="add-review-head">
                                <h3>Add a Review</h3>
                            </div>
                            <div className="add-review-content">
                                {
                                    user ?
                                        <div className="loged-content">
                                            <form onSubmit={submitReviews}>
                                                <div className="star-count">
                                                    <div className="label">
                                                        <h4>Your Ratings <span>*</span></h4>
                                                    </div>
                                                    <div className="ratings">
                                                        <input type="radio" name="rating" id="5-star" onClick={() => setAddReviews({ ...addReviews, ratings: 5 })} /><label for="5-star">★</label>
                                                        <input type="radio" name="rating" id="4-star" onClick={() => setAddReviews({ ...addReviews, ratings: 4 })} /><label for="4-star">★</label>
                                                        <input type="radio" name="rating" id="3-star" onClick={() => setAddReviews({ ...addReviews, ratings: 3 })} /><label for="3-star">★</label>
                                                        <input type="radio" name="rating" id="2-star" onClick={() => setAddReviews({ ...addReviews, ratings: 2 })} /><label for="2-star">★</label>
                                                        <input type="radio" name="rating" id="1-star" onClick={() => setAddReviews({ ...addReviews, ratings: 1 })} /><label for="1-star">★</label>
                                                    </div>
                                                </div>
                                                <textarea value={addReviews.message} name="review" placeholder="Write Your Review Here..." onChange={(e) => setAddReviews({ ...addReviews, message: e.target.value })}></textarea><br />
                                                <input type="submit" value="Submit" className="submit-btn" />
                                            </form>
                                        </div>
                                        :
                                        <div className="nunloged-content">
                                            <p>You must <span><Link to="/account" className="no-style-link">Login</Link></span> in to Add reviews.</p>
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