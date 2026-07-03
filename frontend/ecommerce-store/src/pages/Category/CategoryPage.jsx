import { useEffect, useState } from 'react';
import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import CategoryFilter from './CategoryFilter';
import CategoryBody from './CategoryBody';

function CategoryPage() {

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

    //get Category name from url
    const { category } = useParams();

    //get query data from url
    const [queryData, setQueryData] = useSearchParams();

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
                const result = await axios.get(`http://localhost:5000/api/v1/products?category=${category}&page=${pageNumber}&sortBy=${sortMethod}&brand=${brandName}&rr=${ratingRange}&pr=${pricingRange}&availability=${availability}`);
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
        window.scroll({ top: 0, behavior: 'smooth' })
    }, [category, queryData, pageNumber, sortMethod, brandName, ratingRange, pricingRange, availability])

    // set brands in product
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const result = await axios.get(`http://localhost:5000/api/v1/products?category=${category}`);
                setBrand(result.data.data)
                setFilterTags({})
                setPriceValues({
                    maxPrice: 100000,
                    minPrice: 0,
                })
            }
            catch (err) {
                console.log(err.response)
            }
        }
        fetchBrands();
    }, [category])

    useEffect(() => {
        const renderBrand = () => {
            const uniqueBrands = [...new Set(brands.map(item => item.brand))];
            setProductBrands(uniqueBrands);
        }
        renderBrand()
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
    function brandsFilter(event) {
        const newQuery = new URLSearchParams(queryData);
        newQuery.set("brand", event.target.id);
        newQuery.set("page", 1)
        setFilterTags({
            ...filterTags,
            brand: event.target.id
        })
        if (event.target.id === 'undefined') {
            setFilterTags({
                ...filterTags,
                brand: undefined
            })
        }
        setQueryData(newQuery);

    }

    ///filter by ratings
    function ratingsFilter(event) {
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
    function filterByAvailability(event) {
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
        setQueryData({ ...queryData })
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
            <div className="search-container">
                <div className="container-grid">

                    {/* Category Header */}
                    <CategoryHeader allCategoryDetails={allCategoryDetails} setToggleOption={setToggleOption} toggleOption={toggleOption} label={label} sortProducts={sortProducts} />

                    {/* category Filter */}
                    <CategoryFilter clearFilters={clearFilters} filterTags={filterTags} brandName={brandName} productBrands={productBrands} brandsFilter={brandsFilter} ratingsFilter={ratingsFilter} ratingRange={ratingRange} priceValues={priceValues} setPriceValues={setPriceValues} submitPriceValue={submitPriceValue} filterByAvailability={filterByAvailability} availability={availability} />

                    {/* Category Body */}
                    <CategoryBody category={category} categoryData={categoryData} pageNumber={pageNumber} toPrePage={toPrePage} pagesSize={pagesSize} toNextPage={toNextPage} loading={loading} />

                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default CategoryPage;