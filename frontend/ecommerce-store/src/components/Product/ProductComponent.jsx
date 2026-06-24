import { useEffect, useState } from 'react';
import { addCartItems } from '../../api/cartApi';
import { Cart } from '../../context/CartContext';
import { Message } from '../../context/MessagesContext';
import './ProductComponent.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductComponent({ items, ratings }) {

    //use context
    const { state, dispatch } = Cart();
    const { setupMessage } = Message()

    //use states
    const [reviews, setReviews] = useState([])

    //fetch review data
    useEffect(() => {
        const fetchReviewData = async () => {
            const result = await axios.get(`http://localhost:5000/api/v1/reviews?productId=${items._id}`)
            setReviews(result.data)
        }
        fetchReviewData()
    }, [items])

    // display ratings
    const ratingsQuery = {
        5: <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9733;</p>,
        4: <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p>,
        3: <p class="four-star">&#9733; &#9733; &#9733; &#9734; &#9734;</p>,
        2: <p class="four-star">&#9733; &#9733; &#9734; &#9734; &#9734;</p>,
        1: <p class="four-star">&#9733; &#9734; &#9734; &#9734; &#9734;</p>,
    }

    return (
        <>
            <div class="template-box card" key={items._id}>
                <Link to={`/details/${items._id}`}>
                    <div class="box-head">
                        <img src={items.image} alt="product-img" />
                    </div>
                </Link>
                <div class="box-body">
                    <div class="name">
                        <p>{items.name}</p>
                    </div>
                    <div class="price">
                        <p>${items.price}</p>
                    </div>
                    <div class="availability">
                        <p class={items.availability ? "in-stock" : "out-stock"}>{items.availability ? "In Stock" : "Out Stock"}</p>
                    </div>
                    <div class="ratings">
                        {ratingsQuery[ratings]}<span>({reviews.all_result})</span>
                    </div>
                    <div class="button">
                        {
                            state.find(item => item.productId == items._id) ?
                                <button class="in-cart" style={{ opacity: "0.5", cursor: " not-allowed" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    In Cart
                                </button>
                                :
                                <button class='cart-btn' onClick={() => addCartItems(items._id, items.name, items.image, 1, items.price, items.availability, dispatch, setupMessage)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 7H6" />
                                    </svg>
                                    Add To Cart
                                </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductComponent;