import { useEffect, useState } from 'react';
import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './SearchPage.css';
import axios from 'axios';
import empty_search from '../../assets/empty-search.svg'
import { useSearchParams,Link } from 'react-router-dom';
import ProductComponent from '../../components/Product/ProductComponent';
import LoadingComponent from '../../components/Loading/LoadingComponent';

function SearchPage() {
    //use state hooks
    const [allCategoryDetails, setAllCategoryDetails] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [toggleOption, setToggleOption] = useState(false);
    const [brands, setBrand] = useState([]);
    const [productBrands, setProductBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [priceValues, setPriceValues] = useState({
        maxPrice: 100000,
        minPrice: 0
    })
    const [filterTags, setFilterTags] = useState({
        brand: undefined,
        rr: undefined,
        pr: undefined,
    });

    //get query data from url
    const [queryData, setQueryData] = useSearchParams();

    //get page number from query data
    const searchKeyword = queryData.get("search") || "";
    console.log(searchKeyword)

    //get page number from query data
    const pageNumber = Number(queryData.get("page")) || 1;

    //get sort name from query data
    const sortMethod = queryData.get("sort") || 'letast';

    //get brand name from query data
    const brandName = queryData.get("brand") || "";

    //get rating rage from query data
    const ratingRange = queryData.get("rr") || "";

    //get rating rage from query data
    const pricingRange = queryData.get("pr") || "";

    //get rating rage from query data
    const availability = queryData.get("availability") || "";

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            setLoading(true)
            try {
                const result = await axios.get(`http://localhost:5000/api/v1/products?search=${searchKeyword}&page=${pageNumber}&sortBy=${sortMethod}&brand=${brandName}&rr=${ratingRange}&pr=${pricingRange}&availability=${availability}`);
                setAllCategoryDetails(result.data)
                setCategoryData(result.data.data)
                setToggleOption(false)
            }
            catch (err) {
                console.log(err.response)
            }
            finally {
                setLoading(false)
            }
        }
        fetchCategoryDetails();
        window.scroll(top)
    }, [queryData, pageNumber, sortMethod, brandName, ratingRange, pricingRange, availability, searchKeyword])

    // set brands in product
    useEffect(() => {
        const fetchBrands = async () => {
            const result = await axios.get(`http://localhost:5000/api/v1/products?search=${searchKeyword}`);
            setBrand(result.data.data)
            setFilterTags({})
            setPriceValues({
                maxPrice: 100000,
                minPrice: 0,
            })
        }
        fetchBrands();
    }, [searchKeyword])

    useEffect(() => {
        var brandArray = [];
        brands.map((items) => {
            if (!brandArray.includes(items.brand)) {
                brandArray.push(items.brand)
            }
            setProductBrands(brandArray)
        })
    }, [brands])

    // go to next page
    function toNextPage() {
        const currentPage = pageNumber + 1;
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("page", currentPage);
        setQueryData(newQuery)
    }

    //go to prev page
    function toPrePage() {
        const currentPage = pageNumber - 1;
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("page", currentPage)
        setQueryData(newQuery)
    }

    //Sort products
    function sortProducts(value) {
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("sort", value);
        newQuery.set("page", 1);
        setQueryData(newQuery)
    }

    //filter by brand
    function brandsFilter() {
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("brand", event.target.id);
        newQuery.set("page", 1)
        setFilterTags({
            ...filterTags,
            brand: event.target.id
        })
        if (event.target.id === 'undifind') {
            setFilterTags({
                ...filterTags,
                brand: undefined
            })
        }
        setQueryData(newQuery);

    }

    ///filter by ratings
    function ratingsFilter() {
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("rr", event.target.id);
        newQuery.set("page", 1)
        setFilterTags({
            ...filterTags,
            rr: event.target.id
        })
        if (event.target.id === ' ') {
            setFilterTags({
                ...filterTags,
                rr: undefined
            })
        }
        setQueryData(newQuery);
    }

    //filter by price
    function submitPriceValue() {
        const updateQery = new URLSearchParams(queryData);
        updateQery.set("pr", `${priceValues.minPrice}-${priceValues.maxPrice}`)
        updateQery.set("page", 1)
        setQueryData(updateQery)

        setFilterTags({
            ...filterTags,
            pr: `$${priceValues.minPrice} - $${priceValues.maxPrice}`
        })
    }

    //filter by availability
    function filterByAvailability() {
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("availability", event.target.id)
        newQuery.set("page", 1)
        setQueryData(newQuery);

        setFilterTags({
            ...filterTags,
            availability: event.target.id === 'false' ? "Out Stock" : "In Stock"
        })

        if (event.target.id == 'all') {
            newQuery.set("availability", "")

            setFilterTags({
                ...filterTags,
                availability: undefined
            })
        }
    }

    //clearFilters
    function clearFilters() {
        setFilterTags({})
        setQueryData({ search: searchKeyword })
        window.location.reload();
    }

    //sort Label
    const sortLabels = {
        latest: "Latest",
        low_to_high: "Price Low to High",
        high_to_low: "Price High to Low"
    }
    const label = sortLabels[sortMethod] || 'Latest';

    //count page size
    const resultSize = allCategoryDetails.all_result;
    const pagesSize = Math.ceil(resultSize / 10)

    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div class="search-container">
                <div class="container-grid">
                    <div class="container-header">
                        <div class="header-result">
                            <p>Showing all <span>{allCategoryDetails.all_result}</span> results</p>
                        </div>
                        <div class="header-sort">
                            <p>Sort By: </p>
                            <div class="select" onClick={() => { setToggleOption(!toggleOption ? true : false) }}>{label} ▾</div>
                            {
                                toggleOption &&
                                <div class="options">
                                    <p onClick={() => sortProducts('latest')}>Latest</p>
                                    <p onClick={() => sortProducts('low_to_high')}>Price Low to High</p>
                                    <p onClick={() => sortProducts('high_to_low')}>Price High to Low</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div class="container-filter">
                        <div class="filter-head">
                            <div class="title">
                                <h1>Filters</h1>
                                <button onClick={() => clearFilters()}>Clear All</button>
                            </div>
                            <div class="tags">
                                {
                                    filterTags.brand &&
                                    <p>{filterTags.brand}</p>
                                }
                                {
                                    filterTags.rr &&
                                    <p>{filterTags.rr} ★</p>
                                }
                                {
                                    filterTags.pr &&
                                    <p>{filterTags.pr}</p>
                                }
                                {
                                    filterTags.availability &&
                                    <p>{filterTags.availability}</p>
                                }
                            </div>
                        </div>
                        <div class="filter-methods">
                            <div class="method-box brand">
                                <h3>Brands</h3>
                                <div class="brand-box">
                                    <input type="radio" id='' name='brand' checked={!brandName || brandName == ' ' || productBrands.length == 0} onClick={() => brandsFilter(event)} />
                                    <label for=''>All</label>
                                </div>
                                {
                                    productBrands.map((items) => {
                                        return (
                                            <div class="brand-box" key={items}>
                                                <input type="radio" id={items} name='brand' checked={items === brandName} onClick={() => brandsFilter(event)} />
                                                <label for={items}>{items}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div class="method-box ratings">
                                <h3>Ratings</h3>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" checked={filterTags.rr === '1-5' || !filterTags.rr} id='1-5' onClick={() => ratingsFilter(event)} />
                                    <label for="1-5">All</label>
                                </div>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" id='4-5' onClick={() => ratingsFilter(event)} defaultChecked={ratingRange === '1-5'} />
                                    <label for="4-5">5 - 4 Stars</label>
                                </div>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" id='3-4' onClick={() => ratingsFilter(event)} defaultChecked={ratingRange === '4-5'} />
                                    <label for="3-4">4 - 3 Stars</label>
                                </div>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" id='2-3' onClick={() => ratingsFilter(event)} defaultChecked={ratingRange === '2-3'} />
                                    <label for="2-3">3 - 2 Stars</label>
                                </div>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" id='1-2' onClick={() => ratingsFilter(event)} defaultChecked={ratingRange === '1-2'} />
                                    <label for="1-2">2 - 1 Stars</label>
                                </div>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" id='0-1' onClick={() => ratingsFilter(event)} defaultChecked={ratingRange === '0-1'} />
                                    <label for="0-1">1 Star</label>
                                </div>
                            </div>
                            <div class="method-box price-range">
                                <div class="range-head">
                                    <h3>Price </h3>
                                </div>
                                <div class="range-select">
                                    <div class="min-price">
                                        <label>Min Price $</label>
                                        <input type="number" placeholder="0" value={priceValues.minPrice} onChange={(event) => { setPriceValues({ ...priceValues, minPrice: Number(event.target.value) }) }} />
                                    </div>
                                    <div class="max-price">
                                        <label>Max Price $</label>
                                        <input type="number" placeholder="100 000" value={priceValues.maxPrice} onChange={(event) => { setPriceValues({ ...priceValues, maxPrice: Number(event.target.value) }) }} />
                                    </div>
                                </div>
                                <div class="range-values">
                                    <p>Price <span>${priceValues.minPrice}</span> - <span>${priceValues.maxPrice}</span></p>
                                    <button onClick={() => submitPriceValue()}>FILTER</button>
                                </div>
                            </div>
                            <div class="method-box availability">
                                <h3>Availability</h3>
                                <div class="availability-box">
                                    <input type="radio" id="all" name="availability" checked={!availability || availability === 'all'} onClick={() => filterByAvailability(event)} />
                                    <label for='all'>All</label>
                                </div>
                                <div class="availability-box">
                                    <input type="radio" id="true" value="in" checked={availability === 'true'} name="availability" onClick={() => filterByAvailability(event)} />
                                    <label for="true">In Stock</label>
                                </div>
                                <div class="availability-box">
                                    <input type="radio" id="false" value="out" checked={availability === 'false'} name="availability" onClick={() => filterByAvailability(event)} />
                                    <label for="false">Out Stock</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-body">
                        <div class={`body-head search-section`}>
                            <h1>Search Result</h1>
                        </div>
                        {
                            loading ? <LoadingComponent />
                                :
                                    categoryData.length === 0 ?
                                        <div class="empty-products-container">
                                            <div class="container-top">
                                                <img src={empty_search} alt="emty-cart-image" />
                                            </div>
                                            <div class="container-bottom">
                                                <h1>Not Product Found Here</h1>
                                                <p>Looks like haven't any Products yet to Shop.</p>
                                                <Link to='/products/computers' class="no-style-link">
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
                                <button class="pre" onClick={() => toPrePage()}>‹</button>
                            }
                            <p><span>{pageNumber}</span> of {pagesSize}</p>
                            {
                                pagesSize != pageNumber &&
                                <button class="next" onClick={() => toNextPage()}>›</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default SearchPage;