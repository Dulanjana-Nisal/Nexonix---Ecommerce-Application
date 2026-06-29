import LoadingComponent from "../../components/Loading/LoadingComponent";
import ProductComponent from "../../components/Product/ProductComponent";
import empty_product from '../../assets/empty-products.svg';
import { Link } from "react-router-dom";

function CategoryBody({category,categoryData,pageNumber,toPrePage,pagesSize,toNextPage,loading}) {

    const capitalizeWord = (char) => {
        if(!char) return ""
        return char.charAt(0).toUpperCase() + char.slice(1)
    }

    return (
        <>
            <div class="container-body">
                <div class={`body-head ${category}-section`}>
                    <h1>{capitalizeWord(category)}</h1>
                </div>
                {
                    loading ? <LoadingComponent />
                    :
                        categoryData.length === 0 ?
                            <div class="empty-products-container">
                                <div class="container-top">
                                    <img src={empty_product} alt="emty-cart-image" />
                                </div>
                                <div class="container-bottom">
                                    <h1>Not Product Found Here</h1>
                                    <p>Looks like haven't any Products yet to Shop.</p>
                                    <Link to='/' class="no-style-link">
                                        <button>
                                            Continue Shopping
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        :
                            <div class="body-template">
                                {
                                    categoryData.map((items) => {
                                        return (
                                            <ProductComponent items={items} ratings={items.ratings} />
                                        )
                                    })
                                }
                            </div>
                }
                <div class="box-buttons">
                    {
                        pageNumber > 1 &&
                        <button class="prv" onClick={() => toPrePage()}>‹</button>
                    }
                    <p><span>{pageNumber}</span> of {pagesSize}</p>
                    {
                        pagesSize != pageNumber &&
                        <button class="next" onClick={() => toNextPage()}>›</button>
                    }
                </div>
            </div>
        </>
    )
}

export default CategoryBody;