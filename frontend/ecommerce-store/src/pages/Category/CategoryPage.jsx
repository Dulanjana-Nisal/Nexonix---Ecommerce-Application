import { useEffect, useState } from 'react';
import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './CategoryPage.css';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { Cart } from '../../context/CartContext';
import ProductComponent from '../../components/Product/ProductComponent';

function CategoryPage() {

    //load context
    const {state,dispatch} = Cart();

    //use state hooks
    const [allCategoryDetails,setAllCategoryDetails] = useState([]);
    const [categoryData,setCategoryData] = useState([]);
    const [toggleOption,setToggleOption] = useState(false);
    const [brands,setBrand] = useState([]);
    const [productBrands,setProductBrands] = useState([]);
    const [priceValues,setPriceValues] = useState({
        maxPrice: 100000,
        minPrice: 0
    })
    const [filterTags,setFilterTags] = useState({
        brand: undefined,
        rr: undefined,
        pr: undefined,
    });
 
    //get Category name from url
    const {category} = useParams();

    //get query data from url
    const [queryData,setQueryData] = useSearchParams();

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

    useEffect(()=>{
        const fetchCategoryDetails = async ()=>{
            const result = await axios.get(`http://localhost:5000/api/v1/products?category=${category}&page=${pageNumber}&sortBy=${sortMethod}&brand=${brandName}&rr=${ratingRange}&pr=${pricingRange}&availability=${availability}`);
            setAllCategoryDetails(result.data)
            setCategoryData(result.data.data)
            setToggleOption(false)
        }
        fetchCategoryDetails();
        window.scroll(top)
    }, [category, queryData, pageNumber, sortMethod, brandName, ratingRange, pricingRange, availability])

    // set brands in product
    useEffect(()=>{
        const fetchBrands = async ()=>{
            const result = await axios.get(`http://localhost:5000/api/v1/products?category=${category}`);
            setBrand(result.data.data)
            setFilterTags({})
            setPriceValues({
                maxPrice: 100000,
                minPrice: 0,
            })
        }
        fetchBrands();
    }, [category])

    useEffect(()=>{
        var brandArray = [];
        brands.map((items)=>{
            if(!brandArray.includes(items.brand)){
                brandArray.push(items.brand)
            }
            setProductBrands(brandArray)
        })
    }, [brands])
    
    // go to next page
    function toNextPage(){
        const currentPage = pageNumber + 1;
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("page", currentPage);
        setQueryData(newQuery)
    }

    //go to prev page
    function toPrePage(){
        const currentPage = pageNumber - 1;
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("page", currentPage)
        setQueryData(newQuery)
    }

    //Sort products
    function sortProducts(value){
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("sort", value);
        newQuery.set("page", 1);
        setQueryData(newQuery)
    }

    //filter by brand
    function brandsFilter(){
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("brand", event.target.id);
        newQuery.set("page", 1)
        setFilterTags({
            ...filterTags,
            brand: event.target.id
        })
        if(event.target.id === 'undifind'){
            setFilterTags({
                ...filterTags,
                brand: undefined
            })
        }
        setQueryData(newQuery);
        
    }

    ///filter by ratings
    function ratingsFilter(){
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("rr", event.target.id);
        newQuery.set("page", 1)
        setFilterTags({
            ...filterTags,
            rr: event.target.id
        })
        if(event.target.id === ' '){
            setFilterTags({
                ...filterTags,
                rr: undefined
            })
        }
        setQueryData(newQuery);
    }

    //filter by price
    function submitPriceValue(){
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
    function filterByAvailability(){
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("availability", event.target.id)
        newQuery.set("page", 1)
        setQueryData(newQuery);

        setFilterTags({
            ...filterTags,
            availability: event.target.id === 'false' ? "Out Stock" : "In Stock"
        })

        if(event.target.id == 'all'){
            newQuery.set("availability", "")

            setFilterTags({
                ...filterTags,
                availability: undefined
            })
        }
    }

    //clearFilters
    function clearFilters(){
        setFilterTags({})
        setQueryData({...queryData})
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
    const pagesSize = Math.ceil(resultSize/10)  

    // display ratings
    const ratingsQuery = {
        5: <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9733; <span>( 50 Reviews )</span></p>,
        4: <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734; <span>( 50 Reviews )</span></p>,
        3: <p class="four-star">&#9733; &#9733; &#9733; &#9734; &#9734; <span>( 50 Reviews )</span></p>,
        2: <p class="four-star">&#9733; &#9733; &#9734; &#9734; &#9734; <span>( 50 Reviews )</span></p>,
        1: <p class="four-star">&#9733; &#9734; &#9734; &#9734; &#9734; <span>( 50 Reviews )</span></p>,
    }

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
                            <div class="select" onClick={()=>{setToggleOption(!toggleOption ? true : false)}}>{label} ▾</div>
                            {
                                toggleOption &&
                                    <div class="options">
                                        <p onClick={()=>sortProducts('latest')}>Latest</p>
                                        <p onClick={()=>sortProducts('low_to_high')}>Price Low to High</p>
                                        <p onClick={()=>sortProducts('high_to_low')}>Price High to Low</p>
                                    </div>
                            }
                        </div>
                    </div>
                    <div class="container-filter">
                        <div class="filter-head">
                            <div class="title">
                                <h1>Filters</h1>
                                <button onClick={()=>clearFilters()}>Clear All</button>
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
                                    <input type="radio" id='' name='brand' checked={!brandName || brandName == ' ' || productBrands.length == 0 } onClick={()=>brandsFilter(event)}/>
                                        <label for=''>All</label>
                                </div>
                                {
                                    productBrands.map((items)=>{
                                        return(
                                            <div class="brand-box" key={items}>
                                                <input type="radio" id={items} name='brand' checked={items === brandName} onClick={()=>brandsFilter(event)}/>
                                                <label for={items}>{items}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div class="method-box ratings">
                                <h3>Ratings</h3>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" checked={filterTags.rr === '1-5' || !filterTags.rr} id= '1-5' onClick={()=>ratingsFilter(event)} />
                                        <label for="1-5">All</label>
                                </div>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" id='4-5' onClick={()=>ratingsFilter(event)} defaultChecked={ratingRange === '1-5'}/>
                                        <label for="4-5">5 - 4 Stars</label>
                                </div>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" id='3-4' onClick={()=>ratingsFilter(event)} defaultChecked={ratingRange === '4-5'}/>
                                        <label for="3-4">4 - 3 Stars</label>
                                </div>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" id='2-3' onClick={()=>ratingsFilter(event)} defaultChecked={ratingRange === '2-3'}/>
                                        <label for="2-3">3 - 2 Stars</label>
                                </div>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" id='1-2' onClick={()=>ratingsFilter(event)} defaultChecked={ratingRange === '1-2'}/>
                                        <label for="1-2">2 - 1 Stars</label>
                                </div>
                                <div class="rating-box">
                                    <input type="radio" name="ratings" id='0-1' onClick={()=>ratingsFilter(event)} defaultChecked={ratingRange === '0-1'}/>
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
                                        <input type="number" placeholder="0" value={priceValues.minPrice} onChange={(event)=>{setPriceValues({...priceValues,minPrice: Number(event.target.value)})}}/>
                                    </div>
                                    <div class="max-price">
                                        <label>Max Price $</label>
                                        <input type="number" placeholder="100 000" value={priceValues.maxPrice} onChange={(event)=>{setPriceValues({...priceValues,maxPrice: Number(event.target.value)})}}/>
                                    </div>
                                </div>
                                <div class="range-values">
                                    <p>Price <span>${priceValues.minPrice}</span> - <span>${priceValues.maxPrice}</span></p>
                                    <button onClick={()=>submitPriceValue()}>FILTER</button>
                                </div>
                            </div>
                            <div class="method-box availability">
                                <h3>Availability</h3>
                                <div class="availability-box">
                                    <input type="radio" id="all" name="availability" checked={!availability || availability === 'all'} onClick={()=>filterByAvailability(event)}/>
                                        <label for='all'>All</label>
                                </div>
                                <div class="availability-box">
                                    <input type="radio" id="true" value="in" checked={availability === 'true'} name="availability" onClick={()=>filterByAvailability(event)}/>
                                        <label for="true">In Stock</label>
                                </div>
                                <div class="availability-box">
                                    <input type="radio" id="false" value="out" checked={availability === 'false'} name="availability"onClick={()=>filterByAvailability(event)} />
                                        <label for="false">Out Stock</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-body">
                        <div class="body-head">
                            <h1>{category}</h1>
                        </div>
                        <div class="body-template">
                            {
                                categoryData.map((items)=>{
                                    return(
                                        <ProductComponent items={items} ratings={ratingsQuery[items.ratings]} state={state} dispatch={dispatch} />
                                    )
                                })
                            }
                        </div>
                        <div class="body-buttons">
                            {
                                pageNumber > 1 && 
                                <button class="pre" onClick={() => toPrePage()}>‹ Previous</button>
                            }
                            <p>{pageNumber} of {pagesSize}</p>
                            {
                                pagesSize != pageNumber &&
                                <button class="next" onClick={()=> toNextPage()}>Next ›</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default CategoryPage;