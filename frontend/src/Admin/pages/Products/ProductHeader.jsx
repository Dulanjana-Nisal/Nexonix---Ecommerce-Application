function ProductHeader({ changeAvailability, availability, productIdSearchValue, setProductIdSearchValue, ProductsSearchValue, setProductsSearchValue, searchProducts, resetProducts, addProductsToggleButton, productId, searchKeyword }) {
    return (
        <div className="product-header">
            <div className="header-filter">
                <div className="filter-methods">
                    <div className="header-filter">
                        <p>Filter By</p>
                        <select onChange={changeAvailability}>
                            <option value="">All</option>
                            <option value="true" selected={availability === true}>Available Products</option>
                            <option value="false" selected={availability === false}>Unavailabale Products</option>
                        </select>
                    </div>
                    <div className="find">
                        <p>Search by Product ID</p>
                        <input type="text" value={productIdSearchValue} type="text" onChange={(e) => setProductIdSearchValue(e.target.value)} />
                        {
                            productIdSearchValue === "" &&
                            <div className="placeholder">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                <p>Enter Product ID</p>
                            </div>
                        }
                    </div>
                    <div className="search">
                        <p>Search by Product Name</p>
                        <input value={ProductsSearchValue} type="text" onChange={(e) => setProductsSearchValue(e.target.value)} />
                        {
                            ProductsSearchValue === "" &&
                            <div className="placeholder">
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
                    <div className="buttons">
                        <button onClick={() => searchProducts()}><i className="fa-solid fa-magnifying-glass"></i>Search</button>
                        <button className='reset' onClick={() => resetProducts()}><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path></svg> Reset</button>
                        <button className="add-product-btn" onClick={addProductsToggleButton}><i className="fa-solid fa-plus"></i>
                            <p>Add Product</p>
                        </button>
                    </div>
                </div>
                <div className="filter-keys">
                    {
                        availability &&
                        <p>{availability === 'true' ? "Available" : "Unavailable"}</p>
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
    )
}

export default ProductHeader;