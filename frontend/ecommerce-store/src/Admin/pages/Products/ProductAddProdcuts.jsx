
function ProductAddProdcuts({ setProductName, setImage, setProductPrice, setProductStock, setProductRatings, setProductDescription, setKeywords, addKeywords, productKeywords, deleteKeywords, setProductCategory, setProductBrand, setProductAvailability, message, loading, addProducts, addProductsToggleButton }) {
    return (
        <div className="add-product-box">
            <div className="box">
                <div className="box-header">
                    <h1>Add Product</h1>
                </div>
                <div className="box-form">
                    <div className="name row">
                        <label>Product Name</label>
                        <input type="text" onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="image row">
                        <label>Product Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="counters">
                        <div className="price row">
                            <label>Product Price ($)</label><br />
                            <input type="number" onChange={(e) => setProductPrice(e.target.value)} />
                        </div>
                        <div className="quantity row">
                            <label>Quantity</label><br />
                            <input type="number" onChange={(e) => setProductStock(e.target.value)} />
                        </div>
                    </div>
                    <div className="ratings row">
                        <p>Ratings</p>
                        <div className="inputs">
                            <input type="radio" id="star-4" name="star" onClick={() => setProductRatings(5)} /><label for="star-4">★</label>
                            <input type="radio" id="star-3" name="star" onClick={() => setProductRatings(4)} /><label for="star-3">★</label>
                            <input type="radio" id="star-5" name="star" onClick={() => setProductRatings(3)} /><label for="star-5">★</label>
                            <input type="radio" id="star-2" name="star" onClick={() => setProductRatings(2)} /><label for="star-2">★</label>
                            <input type="radio" id="star-1" name="star" defaultChecked={true} onClick={() => setProductRatings(1)} /><label for="star-1" >★</label>
                        </div>
                    </div>
                    <div className="description row">
                        <label>Description</label>
                        <textarea placeholder="Add description" onChange={(e) => setProductDescription(e.target.value)}></textarea>
                    </div>
                    <div className="keywords row">
                        <div className="inputs" >
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
                        <div className="key-values">
                            {
                                productKeywords.map((items) => {
                                    return (
                                        <div className="values" key={items}>
                                            <p>{items}</p>
                                            <i className="fa fa-close" onClick={() => deleteKeywords(items)}></i>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="category row">
                        <label>Select Category</label>
                        <select onClick={(e) => setProductCategory((e.target.value).toLowerCase())}>
                            <option>Computers</option>
                            <option>Laptops</option>
                            <option>Components</option>
                            <option>Gamings</option>
                            <option>Softwares</option>
                        </select>
                    </div>
                    <div className="brand row">
                        <label>Product Brand</label>
                        <input type="text" onChange={(e) => setProductBrand(e.target.value)} />
                    </div>
                    <div className="availability row">
                        <label>Select Availability</label><br />
                        <div className="inputs">
                            <input type="radio" name="availability" id="true" defaultChecked={true} onClick={() => setProductAvailability(true)} /><label for="true" >Available</label>
                            <input type="radio" name="availability" id="false" /><label for="false" onClick={() => setProductAvailability(false)}>Unavaialable</label>
                        </div>
                    </div>
                    {
                        message &&
                        <div className={`msgs ${message.status === 'error' ? 'err' : 'succ'}`}>
                            <p className={message.status}>{message.msg}</p>
                        </div>
                    }
                    <div className="buttons row">
                        {
                            !loading ?
                                <input type="submit" value="Add Product" onClick={addProducts} />
                                :
                                <input type="submit" value="Loading..." />
                        }
                        <button className="close" onClick={addProductsToggleButton}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductAddProdcuts;
