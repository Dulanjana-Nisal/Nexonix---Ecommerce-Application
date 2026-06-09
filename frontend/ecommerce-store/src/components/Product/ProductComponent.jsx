import { useEffect, useState } from 'react';
import { addCartItems } from '../../api/cartApi';
import { Cart } from '../../context/CartContext';
import './ProductComponent.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductComponent({ items, ratings }) {

    //use context
    const {state,dispatch} = Cart();

    //use states
    const [reviews,setReviews] = useState([])

    //fetch review data
    useEffect(()=>{
        const fetchReviewData = async () =>{
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
                    <div class="ratings">
                        {ratingsQuery[ratings]}<span>( {reviews.all_result} Reviews )</span>
                    </div>
                    <div class="price">
                        <p>${items.price}</p>
                        <div class="availability">
                            <p class={items.availability ? "in-stock" : "out-stock"}>{items.availability ? "In Stock" : "Out Stock"}</p>
                        </div>
                    </div>
                    <div class="button">
                        {
                            state.find(item => item.productId == items._id) ?
                                <button style={{ opacity: "0.5", cursor: " not-allowed" }}>in Cart</button>
                                :
                                <button onClick={() => addCartItems(items._id, items.name, items.image, 1, items.price, items.availability, dispatch)}>Add To Cart</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductComponent;