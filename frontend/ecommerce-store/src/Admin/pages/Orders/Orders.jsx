import { useEffect, useState } from 'react';
import './Orders.css';
import api from '../../../services/auth';

function Orders() {

    // orders states
    const [orders,setOrders] = useState([])

    // orders use effescts
    useEffect(()=>{
        const fetchOrderData = async()=>{
            try{
                const result = await api.get('/orders/all')
                setOrders(result.data.data)
            }
            catch(err){
                console.log(err.response)
            }
        }
        fetchOrderData();
    }, [])

    return (
        <>
            <div class="orders-container">
                <div class="orders-container-header">
                    <div class="header-top">
                        <div class="status-box">
                            <div class="box-thumb total">
                                <svg class="total" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path></svg>
                            </div>
                            <div class="box-details">
                                <p>Total Orders</p>
                                <h1>30</h1>
                            </div>
                        </div>
                        <div class="status-box">
                            <div class="box-thumb pending">
                                <svg class="pending" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <div class="box-details">
                                <p>Pending Orders</p>
                                <h1>10</h1>
                            </div>
                        </div>
                        <div class="status-box">
                            <div class="box-thumb processing">
                                <svg class="processing" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            </div>
                            <div class="box-details">
                                <p>Processing Orders</p>
                                <h1>50</h1>
                            </div>
                        </div>
                        <div class="status-box">
                            <div class="box-thumb completed">
                                <svg class="completed" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div class="box-details">
                                <p>Completed Orders</p>
                                <h1>72</h1>
                            </div>
                        </div>
                        <div class="status-box">
                            <div class="box-thumb cancelled">
                                <svg class="cancelled" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                            </div>
                            <div class="box-details">
                                <p>Cancelled Orders</p>
                                <h1>23</h1>
                            </div>
                        </div>
                    </div>
                    <div class="header-bottom">
                        <div class="header-filter">
                            <p>Filter By</p>
                            <select>
                                <option>---- Status ----</option>
                                <option>Delivered</option>
                                <option>Processing</option>
                                <option>Shipped</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                        <div class="search">
                            <input type="text" placeholder="Search Orders"/>
                            <button><i class="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </div>
                </div>
                <div class="orders-container-body">
                    <div class="order-list-container">
                        <div class="list-header-row">
                            <div class="order">
                                <p>Order</p>
                            </div>
                            <div class="user">
                                <p>User</p>
                            </div>
                            <div class="qunatity">
                                <p>Qunatity</p>
                            </div>
                            <div class="price">
                                <p>Price</p>
                            </div>
                            <div class="status">
                                <p>Status</p>
                            </div>
                            <div class="actions">
                                <p>Actions</p>
                            </div>
                        </div>
                        {
                            orders.length > 0 &&
                            orders.map((items)=>{
                                return(
                                    <div class="list-body-row" key={items._id}>
                                        <div class="row-card">
                                            <div class="order row">
                                                <div class="order-thumb">
                                                    <img src={items.image} alt={items.productName} />
                                                </div>
                                                <div class="order-details">
                                                    <h4>{items.productName}</h4>
                                                    <p>OID: {items._id}</p>
                                                </div>
                                            </div>
                                            <div class="user row">
                                                <h4>{items.firstName} {items.lastName}</h4>
                                                <p>{items.email || "dulanjana@gmail.com"}</p>
                                            </div>
                                            <div class="quantity row">
                                                <h4>{items.quantity}</h4>
                                            </div>
                                            <div class="price row">
                                                <h4>${items.price}</h4>
                                            </div>
                                            <div class="status row">
                                                <p class={(items.status).toLowerCase()}>{items.status}</p>
                                            </div>
                                            <div class="actions row">
                                                <button title='View and Update' class='view'>
                                                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                </button>
                                                {
                                                    items.status === 'Cancelled' &&
                                                    <button title='Delete' class='delete'>
                                                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        <div class="card-details" style={{display: "none"}}>
                                            <div class="order-details row">
                                                <div class="details-header">
                                                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                                                    <p>ORDER DETAILS</p>
                                                </div>
                                                <div class="details-body">
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
                                                        <h4>Status</h4>
                                                        <div class="status-box">
                                                            <p class={`status ${(items.status).toLowerCase()}`}>{items.status}</p>
                                                            {/* <select>
                                                                <option>Delivered</option>
                                                                <option>Processing</option>
                                                                <option>Shipped</option>
                                                                <option>Cancelled</option>
                                                            </select> */}
                                                            <button title='Edit' class='edit'>
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
                                                <div class="details-footer">
                                                    <button class='update'>Update</button>
                                                    <button class='close'>Close</button>
                                                </div>
                                            </div>
                                            <div class="product-details row">
                                                <div class="details-header">
                                                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                    <p>PRODUCT IMAGE</p>
                                                </div>
                                                <div class="details-body">
                                                    <img src={items.image} alt={items.productName}/>
                                                </div>
                                            </div>
                                            <div class="customer-details row">
                                                <div class="details-header">
                                                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                    <p>CUSTOMER INFORMATION</p>
                                                </div>
                                                <div class="details-body">
                                                    <div>
                                                        <h4>Name</h4>
                                                        <p>{items.firstName} {items.lastName}</p>
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
                                                        <p>{items.address || 'Not found!'}</p>
                                                    </div>
                                                    <div>
                                                        <h4>Postal Code</h4>
                                                        <p>{items.zipCode}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="payment-details row">
                                                <div class="details-header">
                                                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                                                    <p>PAYMENT INFORMATION</p>
                                                </div>
                                                <div class="details-body">
                                                    <div>
                                                        <h4>Payment Method</h4>
                                                        <p>{items.method}</p>
                                                    </div>
                                                    <div>
                                                        <h4>Payment Status</h4>
                                                        <p class={items.method === 'cash-on-delivery' ? "payment-status no-paid" : "payment-status paid" }>{items.method === 'cash-on-delivery'? 'None Paid' : 'Paid'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div class="orders-container-footer">
                    <div class="box-buttons">
                        <button class="pre">‹</button>
                        <p><span>1</span> of 10 </p>
                        <button class="next">›</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders;