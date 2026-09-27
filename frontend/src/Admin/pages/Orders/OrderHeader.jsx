function OrderHeader({ allOrders, filterbyStatus, orderSearchValue, setOrderSearchValue, productSearchValue, setProductSearchValue, searchOrders, resetOrders, statusValue, orderId, searchQueryByProduct }) {
    return (
        <div className="orders-container-header">
            <div className="header-top admin-orders">
                <div className="status-box">
                    <div className="box-thumb total">
                        <svg className="total" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path></svg>
                    </div>
                    <div className="box-details">
                        <p>Total Orders</p>
                        <h1>{allOrders.length}</h1>
                    </div>
                </div>
                <div className="status-box">
                    <div className="box-thumb pending">
                        <svg className="pending" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div className="box-details">
                        <p>Processing Orders</p>
                        <h1>{(allOrders.filter(item => item.status === "Processing")).length}</h1>
                    </div>
                </div>
                <div className="status-box">
                    <div className="box-thumb processing">
                        <svg className="processing" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                    </div>
                    <div className="box-details">
                        <p>Shipped Orders</p>
                        <h1>{(allOrders.filter(item => item.status === "Shipped")).length}</h1>
                    </div>
                </div>
                <div className="status-box">
                    <div className="box-thumb completed">
                        <svg className="completed" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div className="box-details">
                        <p>Delivered Orders</p>
                        <h1>{(allOrders.filter(item => item.status === "Delivered")).length}</h1>
                    </div>
                </div>
                <div className="status-box">
                    <div className="box-thumb cancelled">
                        <svg className="cancelled" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </div>
                    <div className="box-details">
                        <p>Cancelled Orders</p>
                        <h1>{(allOrders.filter(item => item.status === "Cancelled")).length}</h1>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="filter-methods">
                    <div className="header-filter">
                        <p>Filter By</p>
                        <select onClick={(e) => filterbyStatus(e.target.value)}>
                            <option value="">All Status</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="find">
                        <p>Search by Order ID</p>
                        <input value={orderSearchValue} type="text" onChange={(e) => setOrderSearchValue(e.target.value)} />
                        {
                            orderSearchValue === "" &&
                            <div className="placeholder">
                                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <p>Enter Order ID</p>
                            </div>
                        }
                    </div>
                    <div className="search">
                        <p>Search by Product Name</p>
                        <input value={productSearchValue} type="text" onChange={(e) => setProductSearchValue(e.target.value)} />
                        {
                            productSearchValue === "" &&
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
                        <button onClick={() => searchOrders()}><i className="fa-solid fa-magnifying-glass"></i>Search</button>
                        <button className='reset' onClick={() => resetOrders()}><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path></svg> Reset</button>
                    </div>
                </div>
                <div className="filter-keys">
                    {
                        statusValue &&
                        <p>{statusValue}</p>
                    }
                    {
                        orderId &&
                        <p>ID: {orderId}</p>
                    }
                    {
                        searchQueryByProduct &&
                        <p>{searchQueryByProduct}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderHeader;