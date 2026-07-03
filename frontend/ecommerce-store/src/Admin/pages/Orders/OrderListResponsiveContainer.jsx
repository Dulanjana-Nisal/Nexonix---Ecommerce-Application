function OrderListResponsiveContainer({ orders, toggleView, setToggleView, deleteCancelledOrder, toggleEdit, setUpdateDetails, setToggleEdit, updateOrders }) {
    return (
        <div className="order-list-responsive">
            {
                orders.length > 0 &&
                orders.map((items) => {
                    return (
                        <div className="user-responsive-main-box">
                            <div className="user-responsive-box" key={items._id}>
                                <div className="left-side">
                                    <img src={items.image} alt="prodile-image" className="user-image" />
                                </div>
                                <div className="right-side">
                                    <div className="right-side-top">
                                        <h4>{items.productName}</h4>
                                        <p>ID: {items._id}</p>
                                    </div>
                                    <div className="right-side-bottom">
                                        <div className="side-bottom-part">
                                            <h4>User:</h4>
                                            <p>{items.name}</p>
                                        </div>
                                        <div className="side-bottom-part">
                                            <h4>Qunatity:</h4>
                                            <p>{items.quantity} Items</p>
                                        </div>
                                        <div className="side-bottom-part price">
                                            <h4>Price:</h4>
                                            <p>{items.price}</p>
                                        </div>
                                        <div className="side-bottom-part">
                                            <h4>Email:</h4>
                                            <p>{items.email}</p>
                                        </div>
                                        <div className="side-bottom-part status">
                                            <h4>Status:</h4>
                                            <h5 className={(items.status).toLowerCase()}>{items.status}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="actions-btns">
                                    {
                                        toggleView.orderId == items._id && toggleView.toggle ?
                                            <button title='View and Update' style={{ backgroundColor: '#2B38D1', color: "#fff" }} className='view' onClick={() => setToggleView({ toggle: !toggleView.toggle, orderId: items._id })}>
                                                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                            </button>
                                            :
                                            <button title='View and Update' className='view' onClick={() => setToggleView({ toggle: !toggleView.toggle, orderId: items._id })}>
                                                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                            </button>
                                    }
                                    {
                                        items.status === 'Cancelled' &&
                                        <button onClick={() => deleteCancelledOrder(items._id)} title='Delete' className='delete'>
                                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                        </button>
                                    }
                                </div>
                            </div>
                            {/* All detail row */}
                            {
                                toggleView.orderId == items._id && toggleView.toggle &&
                                <div className='card-details'>
                                    <div className="order-details row">
                                        <div className="details-header">
                                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                                            <p>ORDER DETAILS</p>
                                        </div>
                                        <div className="details-body">
                                            <div>
                                                <h4>Order ID</h4>
                                                <p>{items._id}</p>
                                            </div>
                                            <div>
                                                <h4>Product</h4>
                                                <p>{items.productName}</p>
                                            </div>
                                            <div>
                                                <h4>Quantity</h4>
                                                <p>{items.quantity}</p>
                                            </div>
                                            <div>
                                                <h4>Unit Price</h4>
                                                <p>${items.price}</p>
                                            </div>
                                            <div>
                                                <h4>Tax Price</h4>
                                                <p>${items.tax || 0}</p>
                                            </div>
                                            <div>
                                                <h4>Total Price</h4>
                                                <p>${items.price * items.quantity + (items.tax || 0)}</p>
                                            </div>
                                            <div>
                                                <h4>Status</h4>
                                                <div className="status-box">
                                                    <p className={`status ${(items.status).toLowerCase()}`}>{items.status}</p>
                                                    {
                                                        toggleEdit.toggle && toggleEdit.orderId === items._id &&
                                                        <select onClick={(e) => setUpdateDetails({ orderId: items._id, status: e.target.value })}>
                                                            <option value="Delivered">Delivered</option>
                                                            <option value="Processing">Processing</option>
                                                            <option value="Shipped">Shipped</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                    }
                                                    <button title='Edit' className='edit' onClick={() => setToggleEdit({ toggle: true, orderId: items._id })}>
                                                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <h4>Order Date</h4>
                                                <p>{(items.createdAt).split("T")[0]}</p>
                                            </div>
                                            <div>
                                                <h4>Order Time</h4>
                                                <p>{new Date(items.createdAt).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                        {
                                            toggleEdit.toggle && toggleEdit.orderId === items._id &&
                                            <div className="details-footer">
                                                <button className='update' onClick={() => updateOrders(items.userId)}>Update</button>
                                                <button className='close' onClick={() => setToggleEdit({ toggle: false, orderId: null })}>Close</button>
                                            </div>
                                        }
                                    </div>
                                    <div className="product-details row">
                                        <div className="details-header">
                                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                            <p>PRODUCT IMAGE</p>
                                        </div>
                                        <div className="details-body">
                                            <img src={items.image} alt={items.productName} />
                                        </div>
                                    </div>
                                    <div className="customer-details row">
                                        <div className="details-header">
                                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            <p>CUSTOMER INFORMATION</p>
                                        </div>
                                        <div className="details-body">
                                            <div>
                                                <h4>Name</h4>
                                                <p>{items.name}</p>
                                            </div>
                                            <div>
                                                <h4>Custommer Id</h4>
                                                <p>{items.userId}</p>
                                            </div>
                                            <div>
                                                <h4>Email</h4>
                                                <p>{items.email || 'Email is Not Found!'}</p>
                                            </div>
                                            <div>
                                                <h4>Phone</h4>
                                                <p>{items.phoneNumber}</p>
                                            </div>
                                            <div>
                                                <h4>Address</h4>
                                                <p>{items.address}</p>
                                            </div>
                                            <div>
                                                <h4>City</h4>
                                                <p>{items.city}</p>
                                            </div>
                                            <div>
                                                <h4>Postal Code</h4>
                                                <p>{items.zipCode}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="payment-details row">
                                        <div className="details-header">
                                            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                                            <p>PAYMENT INFORMATION</p>
                                        </div>
                                        <div className="details-body">
                                            <div>
                                                <h4>Payment Method</h4>
                                                <p>{items.method}</p>
                                            </div>
                                            <div>
                                                <h4>Payment Status</h4>
                                                <p className={items.method !== 'cash-on-delivery' || items.status === 'Delivered' ? "payment-status paid" : "payment-status no-paid"}>{items.method !== 'cash-on-delivery' || items.status === 'Delivered' ? 'Paid' : 'None Paid'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default OrderListResponsiveContainer;