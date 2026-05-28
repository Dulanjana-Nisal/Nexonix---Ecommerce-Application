import { useState } from "react"
import api from "../../services/auth"
import axios from "axios"

function AdminProducts({addProductsToggleButton}) {

    // add product states
    const [productName,setProductName] = useState('')

    const [image,setImage] = useState(null)


    const [productStock,setProductStock] = useState(0)
    const [productPrice,setProductPrice] = useState(0)
    const [productRatings,setProductRatings] = useState(1)
    const [productDescription,setProductDescription] = useState()

    const [keywords,setKeywords] = useState("")
    const [productKeywords,setProductKeywords] = useState([])

    const [productCategory,setProductCategory] = useState('')
    const [productBrand,setProductBrand] = useState('')
    const [productAvailability,setProductAvailability] = useState(true)

    // const [errorMessage,setErrorMessage] = useState(false)

    // add keywords
    function addKeywords(){
        const key_id = crypto.randomUUID()
        if(productKeywords.find(items => items.value === keywords)){
            return
        }
        setProductKeywords((prev)=>[...prev, {
            id: key_id,
            value: keywords
        }])
    }

    // delete keywords
    function deleteKeywords(keyId){
        const filterKeyList = productKeywords.filter(items => items.id !== keyId)
        setProductKeywords(filterKeyList)
    }

    //Add products in to database
    const addProducts = async ()=>{

        //genarate keyword list
        let keyList = []
        productKeywords.map((items)=>
            keyList.push(items.value)
        )
        
        //setup image url
        const formData = new FormData();
        formData.append('file', image)
        formData.append('upload_preset','whats88b')
        
        try{
            // upload image to cloud
            const uploadImage = await axios.post('https://api.cloudinary.com/v1_1/dl5kmfcae/image/upload', formData)

            // add product
            const result = await api.post('/products', {
                name: productName,
                image: uploadImage.data.secure_url,
                stock: productStock,
                price: productPrice,
                ratings: productRatings,
                description: productDescription,
                keywords: keyList,
                category: productCategory,
                brand: productBrand,
                availability: productAvailability
            })
            console.log(result)
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
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
                                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
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
                                    <input type="radio" id="star-4" name="star" onClick={() => setProductRatings(5)}/><label for="star-4">★</label>
                                    <input type="radio" id="star-3" name="star" onClick={() => setProductRatings(4)}/><label for="star-3">★</label>
                                    <input type="radio" id="star-5" name="star" onClick={() => setProductRatings(3)}/><label for="star-5">★</label>
                                    <input type="radio" id="star-2" name="star" onClick={() => setProductRatings(2)}/><label for="star-2">★</label>
                                    <input type="radio" id="star-1" name="star" defaultChecked={true} onClick={() => setProductRatings(1)}/><label for="star-1" >★</label>
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
                                        productKeywords.map((items)=>{
                                            return(
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
                                <input type="text" onChange={(e) => setProductBrand(e.target.value)}/>
                            </div>
                            <div class="availability row">
                                <label>Select Availability</label><br />
                                <div class="inputs">
                                    <input type="radio" name="availability" id="true" defaultChecked={true} onClick={() => setProductAvailability(true)}/><label for="true" >Available</label>
                                    <input type="radio" name="availability" id="false" /><label for="false" onClick={() => setProductAvailability(false)}>Unavaialable</label>
                                </div>
                            </div>
                            <div class="msgs">
                                <p class="error">Error Message Here!</p>
                            </div>
                            <div class="buttons row">
                                <input type="submit" value="Add Product" onClick={addProducts}/>
                                <button class="close" onClick={addProductsToggleButton}>Close</button>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminProducts;