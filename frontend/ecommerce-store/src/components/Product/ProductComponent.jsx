import { addCartItems } from '../../api/cartApi';
import { Cart } from '../../context/CartContext';
import './ProductComponent.css'
import { Link } from 'react-router-dom';

function ProductComponent({ items, ratings }) {

    //use context
    const {state,dispatch} = Cart();

    return (
        <>
            <div class="template-box" key={items._id}>
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
                        {ratings}
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