
function ProductListResponsiveContainer({ products, updateProductsToggleButton, deleteProduct }) {
    return (
        <div className="product-list-responsive">
            {
                products.length > 0 &&
                products.map((items) => {
                    return (
                        <div className="user-responsive-box" key={items._id}>
                            <div className="left-side">
                                <img src={items.image} alt="prodile-image" className="user-image" />
                            </div>
                            <div className="right-side">
                                <div className="right-side-top">
                                    <h4>{items.name}</h4>
                                    <p>ID: {items._id}</p>
                                </div>
                                <div className="right-side-bottom">
                                    <div className="side-bottom-part cat">
                                        <h4>Category:</h4>
                                        <p>{items.category}</p>
                                    </div>
                                    <div className="side-bottom-part">
                                        <h4>Qunatity:</h4>
                                        <p>{items.stock} Items</p>
                                    </div>
                                    <div className="side-bottom-part price">
                                        <h4>Price:</h4>
                                        <p>{items.price}</p>
                                    </div>
                                    <div className="side-bottom-part">
                                        <h4>Availability:</h4>
                                        <p className={items.availability ? 'availabale' : 'unavailabale'}>{items.availability ? 'In Stcok' : "Out Stock"}</p>
                                    </div>
                                    <div className="side-bottom-part brand">
                                        <h4>Brand:</h4>
                                        <p>{items.brand}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="actions-btns">
                                <button className="update" onClick={() => updateProductsToggleButton(items._id)}><i className="fa-solid fa-pen-to-square"></i></button>
                                <svg onClick={() => deleteProduct(items._id)} className="delete" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductListResponsiveContainer;