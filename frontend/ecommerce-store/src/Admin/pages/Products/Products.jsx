import './Products.css'
import { useEffect, useState } from "react"
import api from "../../../services/auth"
import axios from "axios"
import { useSearchParams } from "react-router-dom"
import LoadingComponent from '../../Components/Loading/LoadingComponent'
import { Message } from '../../../context/MessagesContext'
import ProductHeader from './ProductHeader'
import ProductEmptyContainer from './ProductEmptyContainer'
import ProductListContainer from './ProductListContainer'
import ProductListResponsiveContainer from './ProductListResponsiveContainer'
import ProductAddProdcuts from './ProductAddProdcuts'
import ProductUpdateProduct from './ProductUpdateProduct'
import ProductFooter from './ProductFooter'

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
    // const [productDetails, setProductDetails] = useState({
    //     name: '',
    //     image: '',
    //     stock: '',
    //     price: '',
    //     ratings: '',
    //     description: '',
    //     keywords: '',
    //     category: '',
    //     brand: '',
    //     availability: ''

    // })
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
        if (productIdSearchValue.length <= 1 && ProductsSearchValue.length <= 1) {
            setupMessage('error', 'Please Enter more than 1 value to search...', "Search Faild!")
            return
        }
        if (productIdSearchValue.length > 2) {
            if (productIdSearchValue.length !== 24) {
                setupMessage('error', 'User ID must be 24 characters!', "Search Faild!")
                return
            }
            newquery.set('productId', productIdSearchValue)
            newquery.set('page', 1)
        }
        if (ProductsSearchValue.length >= 2) {
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
            console.log(err.response)
        }

        setSelectProductId(itemsId)
        updateProductsToggle ? setUpdateProductsToggle(false) : setUpdateProductsToggle(true) & setReloadEffect(reloadEffect ? false : true)
    }

    // Toggle Add Product Button
    const addProductsToggleButton = () => {
        setProductKeywords([])
        addProductsToggle ? setAddProductsToggle(false) : setAddProductsToggle(true) & setReloadEffect(reloadEffect ? false : true)
    }

    return (
        <>
            <div className="product-section">
                {/* product header */}
                <ProductHeader changeAvailability={changeAvailability} availability={availability} productIdSearchValue={productIdSearchValue} setProductIdSearchValue={setProductIdSearchValue} ProductsSearchValue={ProductsSearchValue} setProductsSearchValue={setProductsSearchValue} searchProducts={searchProducts} resetProducts={resetProducts} addProductsToggleButton={addProductsToggleButton} productId={productId} searchKeyword={searchKeyword} />

                <div className="product-body">
                    {
                        loading ? <LoadingComponent />
                            :
                            products.length === 0 ?
                                // empty product container
                                <ProductEmptyContainer />
                                :
                                // product list container
                                <ProductListContainer products={products} updateProductsToggleButton={updateProductsToggleButton} deleteProduct={deleteProduct} />
                    }
                    {/* product list reaponsive container */}
                    <ProductListResponsiveContainer products={products} updateProductsToggleButton={updateProductsToggleButton} deleteProduct={deleteProduct} />
                    {
                        // add products
                        addProductsToggle &&
                        <ProductAddProdcuts setProductName={setProductName} setImage={setImage} setProductPrice={setProductPrice} setProductStock={setProductStock} setProductRatings={setProductRatings} setProductDescription={setProductDescription} setKeywords={setKeywords} addKeywords={addKeywords} productKeywords={productKeywords} deleteKeywords={deleteKeywords} setProductCategory={setProductCategory} setProductBrand={setProductBrand} setProductAvailability={setProductAvailability} message={message} loading={loading} addProducts={addProducts} addProductsToggleButton={addProductsToggleButton} />
                    }
                    {
                        // update products
                        updateProductsToggle &&
                        <ProductUpdateProduct productsForUpdate={productsForUpdate} setProductName={setProductName} setImage={setImage} setProductPrice={setProductPrice} setProductStock={setProductStock} setProductRatings={setProductRatings} setProductDescription={setProductDescription} setKeywords={setKeywords} addKeywords={addKeywords} productKeywords={productKeywords} deleteKeywords={deleteKeywords} setProductCategory={setProductCategory} setProductBrand={setProductBrand} setProductAvailability={setProductAvailability} message={message} updateProducts={updateProducts} loading={loading} updateProductsToggleButton={updateProductsToggleButton} />
                    }
                </div>
                {/* product footer */}
                <ProductFooter pageNumber={pageNumber} prevPage={prevPage} productData={productData} nextPage={nextPage} />
            </div>
        </>
    )
}

export default Products;