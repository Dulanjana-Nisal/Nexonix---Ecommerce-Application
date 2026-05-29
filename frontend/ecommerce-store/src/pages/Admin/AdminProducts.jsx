import { useEffect, useState } from "react"
import api from "../../services/auth"
import axios from "axios"
import { useSearchParams } from "react-router-dom"

function AdminProducts({ path }) {

    //products data state
    const [products, setProducts] = useState([])
    const [productsForUpdate, setProductsForUpdate] = useState([])
    const [productData, setProductData] = useState({ all_result: 0, page_result: 0 })
    const [searchValue, setSearchValue] = useState('');
    const [updateProductsToggle, setUpdateProductsToggle] = useState(false)
    const [addProductsToggle, setAddProductsToggle] = useState(false)
    const [selectProductId, setSelectProductId] = useState(null)

    //state for re load useEffect
    const [reloadEffect,setReloadEffect] = useState(false)

    // add and update product states
    const [productName, setProductName] = useState('')
    const [image, setImage] = useState(null)
    const [productStock, setProductStock] = useState(null)
    const [productPrice, setProductPrice] = useState(null)
    const [productRatings, setProductRatings] = useState(null)
    const [productDescription, setProductDescription] = useState("")
    const [keywords, setKeywords] = useState("")
    const [productKeywords, setProductKeywords] = useState([])
    const [productCategory, setProductCategory] = useState(null)
    const [productBrand, setProductBrand] = useState('')
    const [productAvailability, setProductAvailability] = useState(null)

    //base states
    const [message, setMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    //get query data from url
    const [queryData, setQueryData] = useSearchParams();

    //page number
    const pageNumber = Number(queryData.get('page')) || 1

    //availability
    const availability = queryData.get('availability') || ''

    //fetch product data
    useEffect(() => {
        const fetchAdminData = async () => {
            setLoading(true)
            const result = await api.get(`/products?page=${pageNumber}&availability=${availability}&search=${searchValue}`)
            setProducts(result.data.data)
            setProductData({
                all_result: result.data.all_result,
                page_result: Math.ceil(result.data.all_result / 10)
            })
            setLoading(false)
        }
        window.scrollTo(0, 0)
        fetchAdminData()

    }, [queryData, pageNumber, availability, path, searchValue, reloadEffect])

    // add keywords
    function addKeywords() {
        if (productKeywords.find(items => items === keywords)) {
            return
        }
        setProductKeywords((prev) => [...prev, keywords])
    }

    // delete keywords
    function deleteKeywords(value) {
        const filterKeyList = productKeywords.filter(items => items !== value)
        setProductKeywords(filterKeyList)
    }

    //Add products in to database
    const addProducts = async () => {
        setLoading(true)
        //genarate keyword list
        let keyList = []
        productKeywords.map((items) =>
            keyList.push(items)
        )

        //setup image url
        const formData = new FormData();
        formData.append('file', image)
        formData.append('upload_preset', 'whats88b')

        try {
            // upload image to cloud
            const uploadImage = image ? await axios.post('https://api.cloudinary.com/v1_1/dl5kmfcae/image/upload', formData) : null

            // add product
            const result = await api.post('/products', {
                name: productName,
                image: uploadImage && uploadImage.data.secure_url,
                stock: Number(productStock),
                price: productPrice,
                ratings: productRatings || 1,
                description: productDescription,
                keywords: keyList,
                category: productCategory,
                brand: productBrand,
                availability: productAvailability 
            })
            if (result) {
                setMessage({
                    status: 'success',
                    msg: 'Product Added!'
                })
                setTimeout(() => {
                    setMessage(false)
                    setAddProductsToggle(false)
                    setReloadEffect( reloadEffect ? false : true )
                }, 2000)
            }
            setLoading(false)
        }
        catch (err) {
            setMessage({
                status: 'error',
                msg: err.response.data.message || 'Product Add Faild!'
            })
            setTimeout(() => {
                setMessage(false)
            }, 2000)
            setLoading(false)
        }
    }

    //update products in to database
    const updateProducts = async () => {
        setLoading(true)

        //genarate keyword list
        let keyList = []
        productKeywords.map((items) =>
            keyList.push(items)
        )

        //setup image url
        const formData = new FormData();
        formData.append('file', image)
        formData.append('upload_preset', 'whats88b')

        try {
            // upload image to cloud
            const uploadImage = image ? await axios.post('https://api.cloudinary.com/v1_1/dl5kmfcae/image/upload', formData) : null

            const result = await api.patch(`/products/${selectProductId}`, {
                name: productName || productsForUpdate.name,
                image: image ? uploadImage.data.secure_url : productsForUpdate.image,
                stock: Number(productStock) || productsForUpdate.stock,
                price: productPrice || productsForUpdate.price,
                ratings: productRatings || productsForUpdate.ratings,
                description: productDescription || productsForUpdate.description,
                keywords: keyList,
                category: productCategory || productsForUpdate.category,
                brand: productBrand || productsForUpdate.brand,
                availability: productAvailability,
            })
            if (result) {
                setMessage({
                    status: 'success',
                    msg: 'Product Updated!'
                })
                setTimeout(() => {
                    setMessage(false)
                    setUpdateProductsToggle(false)
                    setReloadEffect( reloadEffect ? false : true )
                }, 1000)
            }
            setLoading(false)
        }
        catch (err) {
            setMessage({
                status: 'error',
                msg: err.response || 'Product Update Faild!'
            })
            setTimeout(() => {
                setMessage(false)
            }, 2000)
            setLoading(false)
        }
    }

    //delete product in to database
    const deleteProduct = async (itemId)=>{
        try{
            const result = await api.delete(`/products/${itemId}`)
            console.log(result)
            setSearchValue(" ")
        }
        catch(err){
            console.log(err)
        }
    }

    // add search values to use state if have more than 1 letter
    function searchInputValues(event) {
        const valueData = event.target.value
        valueData.length > 1 && setSearchValue(valueData)
        valueData.length < 1 && setSearchValue("")
    }

    //change availability
    function changeAvailability(e) {
        const newQuery = new URLSearchParams(queryData)
        if (pageNumber !== 1) {
            newQuery.set('page', 1)
        }
        newQuery.set('availability', e.target.value)
        setQueryData(newQuery)
    }

    //prev page
    function prevPage() {
        if (pageNumber === 1) {
            newQuery.set("page", 1)
        }
        const newQuery = new URLSearchParams(queryData)
        newQuery.set("page", pageNumber - 1)
        setQueryData(newQuery)
    }

    //next page
    function nextPage() {
        if (pageNumber === productData.page_result) {
            newQuery.set("page", pageNumber)
        }
        const newQuery = new URLSearchParams(queryData)
        newQuery.set("page", pageNumber + 1)
        setQueryData(newQuery)
    }

    // Toggle Update Product Button
    const updateProductsToggleButton = async (itemsId) => { 

        try {
            const result = await api.get(`/products/${itemsId}`)
            setProductsForUpdate(result.data.data)
            setProductKeywords(result.data.data.keywords || [])
            setProductAvailability(result.data.data.availability)
        }
        catch (err) {
            console.log(err)
        }

        setSelectProductId(itemsId)
        updateProductsToggle ? setUpdateProductsToggle(false) : setUpdateProductsToggle(true) & setReloadEffect( reloadEffect ? false : true)
    }

    // Toggle Add Product Button
    function addProductsToggleButton() {
        addProductsToggle ? setAddProductsToggle(false) : setAddProductsToggle(true) & setReloadEffect( reloadEffect ? false : true)
    }

    console.log(productCategory)

    return (
        <>
            <div class="product-section">
                <div class="product-header">
                    <div class="header-filter">
                        <p>Filter By</p>
                        <select onChange={changeAvailability}>
                            <option value="true" selected={availability === true}>Available Products</option>
                            <option value="false" selected={availability === false}>Unavailabale Products</option>
                        </select>
                    </div>
                    <div class="search">
                        <input type="text" placeholder="Search Products" onChange={searchInputValues} />
                        <button><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                    <div class="header-create-btn">
                        <button onClick={addProductsToggleButton}><i class="fa-solid fa-plus"></i>
                            <p>Add Product</p>
                        </button>
                    </div>
                </div>
                <div class="product-body">
                    <div class="product-list">
                        <div class="product-box header">
                            <div class="name row">
                                <p>Product</p>
                            </div>
                            <div class="qnt row">
                                <p>Qunatity</p>
                            </div>
                            <div class="price row">
                                <p>Price</p>
                            </div>
                            <div class="availability row">
                                <p>Availability</p>
                            </div>
                            <div class="buttons row">

                            </div>
                        </div>
                        {
                            loading ? <h3>Loading...</h3> :
                                products.map((items) => {
                                    return (
                                        <div class="product-box products" key={items._id}>
                                            <div class="name row">
                                                <div class="image"><img src={items.image} alt="" /></div>
                                                <div class="details">
                                                    <h4>{items.name}</h4>
                                                    <p>ID: {items._id}</p>
                                                </div>
                                            </div>
                                            <div class="qnt row">
                                                <p>{items.stock} Products</p>
                                            </div>
                                            <div class="price row">
                                                <p>${items.price}</p>
                                            </div>
                                            <div class="availability row">
                                                <p class={items.availability ? "availabale" : "unavailabale"}>{items.availability ? "In Stock" : "Out Stock"}</p>
                                            </div>
                                            <div class="buttons row">
                                                <button class="update" onClick={() => updateProductsToggleButton(items._id)}><i class="fa-solid fa-pen-to-square"></i></button>
                                                <button class="delete" onClick={() => deleteProduct(items._id)}><i class="fa-solid fa-trash-can"></i></button>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                    <div class="responsive-list">
                        {
                            loading ? <h3>Loading...</h3> :
                                products.map((items) => {
                                    return (
                                        <div class="product-box" key={items._id}>
                                            <div class="left-side">
                                                <img src={items.image} alt={items.name} />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>{items.name}</p>
                                                </div>
                                                <div class="qnt row">
                                                    <h4>Quantity</h4>
                                                    <p>{items.stock} Products</p>
                                                </div>
                                                <div class="price row">
                                                    <h4>Price</h4>
                                                    <p>${items.price}</p>
                                                </div>
                                                <div class="availability row">
                                                    <h4>Availability</h4>
                                                    <p class={items.availability ? "availabale" : "unavailabale"}>{items.availability ? "In Stock" : "Out Stock"}</p>
                                                </div>
                                                <div class="buttons">
                                                    <button class="update" onClick={() => updateProductsToggleButton(items._id)}><i class="fa-solid fa-pen-to-square"></i></button>
                                                    <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                    {
                        addProductsToggle &&
                        <div class="add-product-box">
                            <div class="box">
                                <div class="box-header">
                                    <h1>Add Product</h1>
                                </div>
                                <div class="box-form">
                                    <div class="name row">
                                        <label>Product Name</label>
                                        <input type="text" onChange={(e) => setProductName(e.target.value)} />
                                    </div>
                                    <div class="image row">
                                        <label>Product Image</label>
                                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                    </div>
                                    <div class="counters">
                                        <div class="price row">
                                            <label>Product Price ($)</label><br />
                                            <input type="number" onChange={(e) => setProductPrice(e.target.value)} />
                                        </div>
                                        <div class="quantity row">
                                            <label>Quantity</label><br />
                                            <input type="number" onChange={(e) => setProductStock(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="ratings row">
                                        <p>Ratings</p>
                                        <div class="inputs">
                                            <input type="radio" id="star-4" name="star" onClick={() => setProductRatings(5)} /><label for="star-4">★</label>
                                            <input type="radio" id="star-3" name="star" onClick={() => setProductRatings(4)} /><label for="star-3">★</label>
                                            <input type="radio" id="star-5" name="star" onClick={() => setProductRatings(3)} /><label for="star-5">★</label>
                                            <input type="radio" id="star-2" name="star" onClick={() => setProductRatings(2)} /><label for="star-2">★</label>
                                            <input type="radio" id="star-1" name="star" defaultChecked={true} onClick={() => setProductRatings(1)} /><label for="star-1" >★</label>
                                        </div>
                                    </div>
                                    <div class="description row">
                                        <label>Description</label>
                                        <textarea placeholder="Add description" onChange={(e) => setProductDescription(e.target.value)}></textarea>
                                    </div>
                                    <div class="keywords row">
                                        <div class="inputs" >
                                            <label>Key words</label>
                                            <select onClick={(e) => setKeywords((e.target.value).toLowerCase())}>
                                                <option>Wireless</option>
                                                <option>Gaming</option>
                                                <option>Computer</option>
                                                <option>Desktop</option>
                                                <option>Laptop</option>
                                                <option>Hardware</option>
                                                <option> Mouse</option>
                                                <option>Keyboard</option>
                                                <option>RGB</option>
                                                <option>External</option>
                                                <option>Portable</option>
                                                <option>Speed</option>
                                                <option>Storage</option>
                                                <option>Streaming</option>
                                                <option>USB</option>
                                            </select>
                                            <button onClick={() => addKeywords()}>Add</button>
                                        </div>
                                        <div class="key-values">
                                            {
                                                productKeywords.map((items) => {
                                                    return (
                                                        <div class="values" key={items.id}>
                                                            <p>{items.value}</p>
                                                            <i class="fa fa-close" onClick={() => deleteKeywords(items.id)}></i>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div class="category row">
                                        <label>Select Category</label>
                                        <select onClick={(e) => setProductCategory((e.target.value).toLowerCase())}>
                                            <option>Computers</option>
                                            <option>Laptops</option>
                                            <option>Components</option>
                                            <option>Gamings</option>
                                            <option>Softwares</option>
                                        </select>
                                    </div>
                                    <div class="brand row">
                                        <label>Product Brand</label>
                                        <input type="text" onChange={(e) => setProductBrand(e.target.value)} />
                                    </div>
                                    <div class="availability row">
                                        <label>Select Availability</label><br />
                                        <div class="inputs">
                                            <input type="radio" name="availability" id="true" defaultChecked={true} onClick={() => setProductAvailability(true)} /><label for="true" >Available</label>
                                            <input type="radio" name="availability" id="false" /><label for="false" onClick={() => setProductAvailability(false)}>Unavaialable</label>
                                        </div>
                                    </div>
                                    {
                                        message &&
                                        <div class={`msgs ${message.status === 'error' ? 'err' : 'succ'}`}>
                                            <p class={message.status}>{message.msg}</p>
                                        </div>
                                    }
                                    <div class="buttons row">
                                        {
                                            !loading ?
                                                <input type="submit" value="Add Product" onClick={addProducts} />
                                                :
                                                <input type="submit" value="Loading..." />
                                        }
                                        <button class="close" onClick={addProductsToggleButton}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        updateProductsToggle &&
                        <div class="update-product-box">
                            <div class="box">
                                <div class="box-header">
                                    <h1>Update Product</h1>
                                </div>
                                <div class="box-form">
                                    <div class="name row">
                                        <label>Product Name</label>
                                        <input type="text" defaultValue={productsForUpdate.name} onChange={(e) => setProductName(e.target.value)} />
                                    </div>
                                    <div class="image row">
                                        <label>Product Image</label>
                                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                    </div>
                                    <div class="counters">
                                        <div class="price row">
                                            <label>Product Price ($)</label><br />
                                            <input type="number" defaultValue={productsForUpdate.price} onChange={(e) => setProductPrice(e.target.value)} />
                                        </div>
                                        <div class="quantity row">
                                            <label>Quantity</label><br />
                                            <input type="number" defaultValue={productsForUpdate.stock} onChange={(e) => setProductStock(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="ratings row">
                                        <p>Ratings</p>
                                        <div class="inputs">
                                            <input type="radio" id="star-4" name="star" defaultChecked={productsForUpdate.ratings === 5} onClick={() => setProductRatings(5)} /><label for="star-4">★</label>
                                            <input type="radio" id="star-3" name="star" defaultChecked={productsForUpdate.ratings === 4} onClick={() => setProductRatings(4)} /><label for="star-3">★</label>
                                            <input type="radio" id="star-5" name="star" defaultChecked={productsForUpdate.ratings === 3} onClick={() => setProductRatings(3)} /><label for="star-5">★</label>
                                            <input type="radio" id="star-2" name="star" defaultChecked={productsForUpdate.ratings === 2} onClick={() => setProductRatings(2)} /><label for="star-2">★</label>
                                            <input type="radio" id="star-1" name="star" defaultChecked={productsForUpdate.ratings === 1} onClick={() => setProductRatings(1)} /><label for="star-1" >★</label>
                                        </div>
                                    </div>
                                    <div class="description row">
                                        <label>Description</label>
                                        <textarea placeholder="Add description" defaultValue={productsForUpdate.description} onChange={(e) => setProductDescription(e.target.value)}></textarea>
                                    </div>
                                    <div class="keywords row">
                                        <div class="inputs" >
                                            <label>Key words</label>
                                            <select onClick={(e) => setKeywords((e.target.value).toLowerCase())}>
                                                <option>Wireless</option>
                                                <option>Gaming</option>
                                                <option>Computer</option>
                                                <option>Desktop</option>
                                                <option>Laptop</option>
                                                <option>Hardware</option>
                                                <option> Mouse</option>
                                                <option>Keyboard</option>
                                                <option>RGB</option>
                                                <option>External</option>
                                                <option>Portable</option>
                                                <option>Speed</option>
                                                <option>Storage</option>
                                                <option>Streaming</option>
                                                <option>USB</option>
                                            </select>
                                            <button onClick={() => addKeywords()}>Add</button>
                                        </div>
                                        <div class="key-values">
                                            {
                                                productKeywords.map((items) => {
                                                    return (
                                                        <div class="values" key={items}>
                                                            <p>{items}</p>
                                                            <i class="fa fa-close" onClick={() => deleteKeywords(items)}></i>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div class="category row">
                                        <label>Select Category</label>
                                        <select onClick={(e) => setProductCategory((e.target.value).toLowerCase())}>
                                            <option>Computers</option>
                                            <option>Laptops</option>
                                            <option>Components</option>
                                            <option>Gamings</option>
                                            <option>Softwares</option>
                                        </select>
                                    </div>
                                    <div class="brand row">
                                        <label>Product Brand</label>
                                        <input type="text" defaultValue={productsForUpdate.brand} onChange={(e) => setProductBrand(e.target.value)} />
                                    </div>
                                    <div class="availability row">
                                        <label>Select Availability</label><br />
                                        <div class="inputs">
                                            <input type="radio" name="availability" id="true" defaultChecked={productsForUpdate.availability} onClick={() => setProductAvailability(true)} /><label for="true" >Available</label>
                                            <input type="radio" name="availability" id="false" defaultChecked={productsForUpdate.availability === false} /><label for="false" onClick={() => setProductAvailability(false)}>Unavaialable</label>
                                        </div>
                                    </div>
                                    {
                                        message &&
                                        <div class={`msgs ${message.status === 'error' ? 'err' : 'succ'}`}>
                                            <p class={message.status}>{message.msg}</p>
                                        </div>
                                    }
                                    <div class="buttons row">
                                        {
                                            !loading ?
                                                <input type="submit" value="Update Product" onClick={updateProducts} />
                                                :
                                                <input type="submit" value="Loading..." />
                                        }
                                        <button class="close" onClick={updateProductsToggleButton}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div class="product-footer">
                    <div class="box-buttons">
                        <button class="pre" onClick={() => prevPage()}>‹</button>
                        <p><span>{pageNumber}</span> of {productData.page_result}</p>
                        <button class="next" onClick={() => nextPage()}>›</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProducts;