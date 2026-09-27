import LoadingComponent from "../../components/Loading/LoadingComponent";
import ProductComponent from "../../components/Product/ProductComponent";
import empty_search from '../../assets/empty-search.svg'
import { Link } from "react-router-dom";

function SearchBodyContainer({loading,categoryData,pageNumber,pagesSize,toPrePage,toNextPage}) {
    return (
        <div className="container-body">
            <div className={`body-head search-section`}>
                <h1>Search Result</h1>
            </div>
            {
                loading ? <LoadingComponent />
                    :
                    categoryData.length === 0 ?
                        <div className="empty-products-container">
                            <div className="container-top">
                                <img src={empty_search} alt="emty-cart-image" />
                            </div>
                            <div className="container-bottom">
                                <h1>Not Product Found Here</h1>
                                <p>Looks like haven't any Products yet to Shop.</p>
                                <Link to='/products/computers' className="no-style-link">
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
                        <div className="body-template">
                            {
                                categoryData.map((items) => {
                                    return (
                                        <ProductComponent items={items} ratings={items.ratings} />
                                    )
                                })
                            }
                        </div>
            }
            <div className="box-buttons">
                {
                    pageNumber > 1 &&
                    <button className="pre" onClick={() => toPrePage()}>‹</button>
                }
                <p><span>{pageNumber}</span> of {pagesSize}</p>
                {
                    pagesSize != pageNumber &&
                    <button className="next" onClick={() => toNextPage()}>›</button>
                }
            </div>
        </div>
    )
}

export default SearchBodyContainer;