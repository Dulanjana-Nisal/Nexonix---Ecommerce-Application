import './Products.css'
import { useEffect, useState } from "react"
import api from "../../../services/auth"
import axios from "axios"
import { useSearchParams } from "react-router-dom"
import LoadingComponent from '../../Components/Loading/LoadingComponent'
import { Message } from '../../../context/MessagesContext'

function Products({ path }) {

    // load context
    const { setupMessage } = Message()

    //products data state
    const [products, setProducts] = useState([])
    const [productsForUpdate, setProductsForUpdate] = useState([])
    const [productData, setProductData] = useState({ all_result: 0, page_result: 0 })
    const [ProductsSearchValue, setProductsSearchValue] = useState('');
    const [productIdSearchValue, setProductIdSearchValue] = useState('');
    const [updateProductsToggle, setUpdateProductsToggle] = useState(false)
    const [addProductsToggle, setAddProductsToggle] = useState(false)
    const [selectProductId, setSelectProductId] = useState(null)

    //state for re load useEffect
    const [reloadEffect, setReloadEffect] = useState(false)

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
    const [productAvailability, setProductAvailability] = useState("")

    //base states
    const [message, setMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    //get query data from url
    const [queryData, setQueryData] = useSearchParams();

    //page number
    const pageNumber = Number(queryData.get('page')) || 1

    //availability
    const availability = queryData.get('availability') || ''

    // search
    const searchKeyword = queryData.get('search') || ''

    // search by user id
    const productId = queryData.get('productId') || ''

    //fetch product data
    useEffect(() => {
        const fetchAdminData = async () => {
            setLoading(true)
            try {
                const result = await api.get(`/products?page=${pageNumber}&availability=${availability}&search=${searchKeyword}&productId=${productId}`)
                setProducts(result.data.data)
                setProductData({
                    all_result: result.data.all_result,
                    page_result: Math.ceil(result.data.all_result / 10)
                })
            }
            catch (err) {
                console.log(err.response)
            }
            finally {
                setLoading(false)
            }
        }
        window.scroll({ top: 0, behavior: 'smooth' })
        fetchAdminData()

    }, [queryData, pageNumber, availability, path, reloadEffect, searchKeyword, productId])

    // add keywords
    const addKeywords = () => {
        if (productKeywords.find(items => items === keywords)) {
            return
        }
        setProductKeywords((prev) => [...prev, keywords])
    }

    // delete keywords
    const deleteKeywords = (value) => {
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
                    setReloadEffect(reloadEffect ? false : true)
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
                stock: productStock || productsForUpdate.stock,
                price: productPrice || productsForUpdate.price,
                ratings: productRatings || productsForUpdate.ratings,
                description: productDescription || productsForUpdate.description,
                keywords: keyList,
                category: productCategory || productsForUpdate.category,
                brand: productBrand || productsForUpdate.brand,
                availability: productStock == 0 ? false : productAvailability,
            })
            if (result) {
                setMessage({
                    status: 'success',
                    msg: 'Product Updated!'
                })
                setTimeout(() => {
                    setMessage(false)
                    setUpdateProductsToggle(false)
                    setReloadEffect(reloadEffect ? false : true)
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
    const deleteProduct = async (itemId) => {
        try {
            await api.delete(`/products/${itemId}`)
            setupMessage('success', `Product (ID: ${itemId}) is Deleted.`, "Product Deleted")
            setReloadEffect(prev => !prev)
        }
        catch (err) {
            console.log(err.response)
            setupMessage('error', `Product (ID: ${itemId}) is faild to delete please try again!`, "Deletion Faild!")
        }
    }

    // search users
    const searchProducts = () => {
        const newquery = new URLSearchParams(queryData);
        if (productIdSearchValue.length <= 1 && ProductsSearchValue <= 1) {
            setupMessage('error', 'Please Enter more than 1 value to search...', "Search Faild!")
            return
        }
        if (productIdSearchValue.length > 1) {
            if (productIdSearchValue.length !== 24) {
                setupMessage('error', 'User ID must be 24 characters!', "Search Faild!")
                return
            }
            newquery.set('productId', productIdSearchValue)
            newquery.set('page', 1)
        }
        if (ProductsSearchValue.length > 1) {
            newquery.set('search', ProductsSearchValue)
            newquery.set('page', 1)
        }
        setQueryData(newquery)
    }

    // reset button
    const resetProducts = () => {
        setQueryData({})
        setProductIdSearchValue("")
        setProductsSearchValue("")
    }

    //change availability
    const changeAvailability = (e) => {
        const newQuery = new URLSearchParams(queryData)
        if (pageNumber !== 1) {
            newQuery.set('page', 1)
        }
        newQuery.set('availability', e.target.value)
        setQueryData(newQuery)
    }

    //prev page
    const prevPage = () => {
        const newQuery = new URLSearchParams(queryData)
        if (pageNumber === 1) {
            newQuery.set("page", 1)
        }
        newQuery.set("page", pageNumber - 1)
        setQueryData(newQuery)
    }

    //next page
    const nextPage = () => {
        const newQuery = new URLSearchParams(queryData)
        if (pageNumber === productData.page_result) {
            newQuery.set("page", pageNumber)
        }
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
        updateProductsToggle ? setUpdateProductsToggle(false) : setUpdateProductsToggle(true) & setReloadEffect(reloadEffect ? false : true)
    }

    // Toggle Add Product Button
    const addProductsToggleButton = () => {
        addProductsToggle ? setAddProductsToggle(false) : setAddProductsToggle(true) & setReloadEffect(reloadEffect ? false : true)
    }

    return (
        <>
            <div class="product-section">
                <div class="product-header">
                    <div class="header-filter">
                        <div class="filter-methods">
                            <div class="header-filter">
                                <p>Filter By</p>
                                <select onChange={changeAvailability}>
                                    <option value="">All</option>
                                    <option value="true" selected={availability === true}>Available Products</option>
                                    <option value="false" selected={availability === false}>Unavailabale Products</option>
                                </select>
                            </div>
                            <div class="find">
                                <p>Search by Product ID</p>
                                <input type="text" value={productIdSearchValue} type="text" onChange={(e) => setProductIdSearchValue(e.target.value)} />
                                {
                                    productIdSearchValue === "" &&
                                    <div class="placeholder">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        <p>Enter Product ID</p>
                                    </div>
                                }
                            </div>
                            <div class="search">
                                <p>Search by Product Name</p>
                                <input value={ProductsSearchValue} type="text" onChange={(e) => setProductsSearchValue(e.target.value)} />
                                {
                                    ProductsSearchValue === "" &&
                                    <div class="placeholder">
                                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 7v10l10 5V12" />
                                            <path d="M22 7v10l-10 5V12" />
                                            <path d="M7 4.5l10 5" />
                                        </svg>
                                        <p>Enter Product Name</p>
                                    </div>
                                }
                            </div>
                            <div class="buttons">
                                <button onClick={() => searchProducts()}><i class="fa-solid fa-magnifying-glass"></i>Search</button>
                                <button class='reset' onClick={() => resetProducts()}><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path></svg> Reset</button>
                                <button class="add-product-btn" onClick={addProductsToggleButton}><i class="fa-solid fa-plus"></i>
                                    <p>Add Product</p>
                                </button>
                            </div>
                        </div>
                        <div class="filter-keys">
                            {
                                availability &&
                                <p>{availability ? "Available" : "UnAvailable"}</p>
                            }
                            {
                                productId &&
                                <p>ID: {productId}</p>
                            }
                            {
                                searchKeyword &&
                                <p>{searchKeyword}</p>
                            }
                        </div>
                    </div>
                </div>
                <div class="product-body">
                    {
                        loading ? <LoadingComponent /> :
                            <table>
                                <thead>
                                    <tr>
                                        <th class="name row">
                                            <p>Product</p>
                                        </th>
                                        <th class="category row">
                                            <p>Category</p>
                                        </th>
                                        <th class="qnt row">
                                            <p>Qunatity</p>
                                        </th>
                                        <th class="price row">
                                            <p>Price</p>
                                        </th>
                                        <th class="availability row">
                                            <p>Availability</p>
                                        </th>
                                        <th class="action row">
                                            <p>Actions</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((items) => {
                                            return (
                                                <tr class="product-box products" key={items._id}>
                                                    <td class="name row">
                                                        <div class="image"><img src={items.image} alt="" /></div>
                                                        <div class="details">
                                                            <h4>{items.name}</h4>
                                                            <p>ID: {items._id}</p>
                                                        </div>
                                                    </td>
                                                    <td class="cat row">
                                                        <p>{items.category}</p>
                                                    </td>
                                                    <td class="qnt row">
                                                        <p>{items.stock} Products</p>
                                                    </td>
                                                    <td class="price row">
                                                        <p>${items.price}</p>
                                                    </td>
                                                    <td class="availability row">
                                                        <p class={items.availability ? "availabale" : "unavailabale"}>{items.availability ? "In Stock" : "Out Stock"}</p>
                                                    </td>
                                                    <td class="buttons row">
                                                        <div class="buttons-content">
                                                            <button class="update" onClick={() => updateProductsToggleButton(items._id)}><i class="fa-solid fa-pen-to-square"></i></button>
                                                            <svg onClick={() => deleteProduct(items._id)} class="delete" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                    }
                    <div class="product-list-responsive">
                        {
                            products.length > 0 &&
                            products.map((items) => {
                                return (
                                    <div class="user-responsive-box" key={items._id}>
                                        <div class="left-side">
                                            <img src={items.image} alt="prodile-image" class="user-image" />
                                        </div>
                                        <div class="right-side">
                                            <div class="right-side-top">
                                                <h4>{items.name}</h4>
                                                <p>ID: {items._id}</p>
                                            </div>
                                            <div class="right-side-bottom">
                                                <div class="side-bottom-part cat">
                                                    <h4>Category:</h4>
                                                    <p>{items.category}</p>
                                                </div>
                                                <div class="side-bottom-part">
                                                    <h4>Qunatity:</h4>
                                                    <p>{items.stock} Items</p>
                                                </div>
                                                <div class="side-bottom-part price">
                                                    <h4>Price:</h4>
                                                    <p>{items.price}</p>
                                                </div>
                                                <div class="side-bottom-part">
                                                    <h4>Availability:</h4>
                                                    <p class={items.availability ? 'availabale':'unavailabale'}>{items.availability? 'In Stcok' : "Out Stock"}</p>
                                                </div>
                                                <div class="side-bottom-part brand">
                                                    <h4>Brand:</h4>
                                                    <p>{items.brand}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="actions-btns">
                                            <button class="update" onClick={() => updateProductsToggleButton(items._id)}><i class="fa-solid fa-pen-to-square"></i></button>
                                            <svg onClick={() => deleteProduct(items._id)} class="delete" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* <div class="product-list-responsive">
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
                    </div> */}
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
                {/* <div class="product-body">
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
                                loading ? <LoadingComponent /> :
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
                    </div> */}
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

export default Products;