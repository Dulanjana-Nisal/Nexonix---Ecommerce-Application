import './ProfilePage.css';
import { Link } from 'react-router-dom';
import api, { logout } from '../../services/auth';
import user_profile from '../../assets/profile-avatar-transparent.png'
import { Notifications } from '../../context/NotificationContext';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Message } from '../../context/MessagesContext';

function ProfilePage({ navigate, dispatch, user, state }) {

    // load data from context
    const { notifiState } = Notifications() || {};
    const {setupMessage} = Message()

    // states
    const [ordersDetails,setOrdersDetails] = useState([])

    // useEffect
    useEffect(()=>{
        const fetchOrdersData = async() => {
            try{
                const result = await api.get(`/orders?limit=-1`)
                setOrdersDetails(result.data.data)
            }
            catch(err){
                console.log(err.response)
            }
        }
        fetchOrdersData()
    }, [])

    // Total Spent Calculation
    const totalSpentCalculation = () => {
        const filterOrders = ordersDetails.filter(items => items.method !== 'cash-on-delivery' || items.status === 'Delivered')
        let totalSpent = 0
        filterOrders.forEach((items) => {
            totalSpent += items.price *items.quantity + (items.tax || 0)
        })
        return totalSpent
    }

    return (
        <>
            <div class='profile-container'>
                <div class="profile-main-container">
                    {/* Container Left */}
                    <div class="container-left">
                        {/* User Profile */}
                        <div class="profile-head-section">
                            <div class="profile-thumb">
                                <img src={user_profile} alt="profile-thumb" />
                            </div>
                            <div class="profile-details">
                                <div class="details-name">
                                    <h1>{user.name}</h1>
                                    <p>{user.role === 'admin' ? "Administrator" : "User"}</p>
                                </div>
                                <div class="details-info">
                                    <div class="email">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" />
                                        </svg>
                                        <p>{user.email}</p>
                                    </div>
                                    <div class="date">
                                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        <p>Joined on {format(new Date(user.joined), "MMMM dd, yyyy") || "2021.12.03"}</p>
                                    </div>
                                </div>
                                {
                                    user.role === 'admin' ?
                                        <div class="details-buttons">
                                            <button class='admin-panel' onClick={() => navigate('/admin/dashboard')}>
                                                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                                <p>Go to Admin Panel</p>
                                            </button>
                                            <button class="logout" onClick={() => logout('/',dispatch,setupMessage)}>
                                                <svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                                <p>Logout</p>
                                            </button>
                                        </div>
                                        :
                                        <div class="details-buttons">
                                            <button class="logout" onClick={() => logout('/',dispatch,setupMessage)}>
                                                <svg viewBox="0 0 24 24" fill="none" width="20" height="20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                                <p>Logout</p>
                                            </button>
                                        </div>
                                }
                            </div>
                        </div>
                        {/* Quick Action  */}
                        <div class="profile-center-section">
                            <div class="center-section-header">
                                <h1>Quick Actions</h1>
                            </div>
                            <div class="center-section-row">
                                <Link to="/orders" class="no-style-link">
                                    <div class="section-card order-card">
                                        <svg class="orders" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" />
                                        </svg>
                                        <div class="section-card-details">
                                            <h3>My Orders</h3>
                                            <p>Viwe and Track Your Orders</p>
                                        </div>
                                        <svg class="navigate-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </div>
                                </Link>
                                <Link to="/cart" class="no-style-link">
                                    <div class="section-card cart-card">
                                        <svg class="cart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 7H6" />
                                        </svg>
                                        <div class="section-card-details">
                                            <h3>My Cart</h3>
                                            <p>See Your Cart Items</p>
                                        </div>
                                        <svg class="navigate-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </div>
                                </Link>
                                <Link to="/notifications" class="no-style-link">
                                    <div class="section-card notifi-card">
                                        <svg class="notifications" width="27" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                        <div class="section-card-details">
                                            <h3>Notifictions</h3>
                                            <p>Recent updates & alerts</p>
                                        </div>
                                        <svg class="navigate-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        {
                                            (notifiState.filter(items => !items.isread)).length !== 0 &&
                                            <p class="notifi-count">{(notifiState.filter(items => !items.isread)).length}</p>
                                        }
                                    </div>
                                </Link>
                            </div>
                        </div>
                        {/* Role Status */}
                        <div class="profile-foot-section">
                            <div class="foot-left">
                                {
                                    user.role === 'admin' ?
                                        <svg class="admin-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24">
                                            <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M4 17 6 7l3 5 3-8 3 8 3-5 2 10v2a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19Z" />
                                            <circle cx="6" cy="7" r="1.2" fill="#fff" />
                                            <circle cx="12" cy="4" r="1.4" fill="#fff" />
                                            <circle cx="18" cy="7" r="1.2" fill="#fff" />
                                        </svg>
                                        :
                                        <svg class="admin-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
                                        </svg>
                                }
                                <div class="foot-details">
                                    <h4>You're logged in as <span>{user.role === 'admin' ? "Admin" : "User"}</span></h4>
                                    <p>
                                        {
                                            user.role === 'admin' ? "You have full access to the admin panel and all system features."
                                                : "You have full access to the buy Products."
                                        }
                                    </p>
                                </div>
                            </div>
                            {
                                user.role === 'admin' ? 
                                <button onClick={() => navigate('/admin/dashboard')}>
                                    Go to Admin Panel
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
                                    </svg>
                                </button>
                                :
                                <button onClick={() => navigate('/')}>
                                    Shop Now
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
                                    </svg>
                                </button>
                             }
                        </div>
                    </div>
                    {/* Container Right */}
                    <div class="container-right">
                        {/* Aside Top */}
                        <div class="aside-top-section">
                            <div class="top-section-header">
                                <svg viewBox="0 0 24 24" fill="none" width="30" height="30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
                                <h3>Account Overview</h3>
                            </div>
                            <div class="top-section-body">
                                <div class="overview-card orders">
                                    <div class="card-left">
                                        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.3 6.7 12 12 20.7 6.7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                                    </div>
                                    <div class="card-right">
                                        <p>Total Orders</p>
                                        <h1>{ordersDetails.length}</h1>
                                    </div>
                                </div>
                                <div class="overview-card spent">
                                    <div class="card-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14"><path fill="currentColor" fill-rule="evenodd" d="M1.249 7.001a5.751 5.751 0 1 1 11.502 0 5.751 5.751 0 0 1-11.502 0ZM7 0a7.001 7.001 0 1 0 0 14 7.001 7.001 0 0 0 0-14Zm.625 3a.625.625 0 1 0-1.25 0v.709A1.816 1.816 0 0 0 4.597 5.524c0 .853.594 1.591 1.427 1.773l1.571.344a.708.708 0 0 1-.151 1.401h-.868a.71.71 0 0 1-.668-.472.625.625 0 0 0-1.179.417 1.81 1.81 0 0 0 1.646 1.297V11a.625.625 0 1 0 1.25 0v-.716A1.955 1.955 0 0 0 9.403 8.333c0-.92-.641-1.717-1.54-1.913l-1.571-.344a.565.565 0 0 1 .121-1.117h1.032c.21 0 .398.09.528.236.061.069.109.149.14.236a.625.625 0 1 0 1.179-.417 1.812 1.812 0 0 0-1.667-1.297V3Z" clip-rule="evenodd" /></svg>
                                    </div>
                                    <div class="card-right">
                                        <p>Total Spent</p>
                                        <h1>$ {totalSpentCalculation()}</h1>
                                    </div>
                                </div>
                                <div class="overview-card cart">
                                    <div class="card-left">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"></circle><circle cx="18" cy="20" r="1.4"></circle><path d="M2 3h3l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 7H6"></path></svg>
                                    </div>
                                    <div class="card-right">
                                        <p>Cart Items</p>
                                        <h1>{state.length}</h1>
                                    </div>
                                </div>
                                <div class="overview-card notifications">
                                    <div class="card-left">
                                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                    </div>
                                    <div class="card-right">
                                        <p>All Notifications</p>
                                        <h1>{notifiState.length}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Aside Bottom */}
                        <div class="aside-bottom-section">
                            <div class="bottom-section-header">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 13a9 9 0 0 1 18 0" /><path d="M3 13v4a2 2 0 0 0 2 2h1v-7H4a1 1 0 0 0-1 1z" /><path d="M21 13v4a2 2 0 0 1-2 2h-1v-7h2a1 1 0 0 1 1 1z" />
                                </svg>
                                <div class="section-details">
                                    <h4>Need Help ?</h4>
                                    <p>Our support team is here for you 24/7.</p>
                                </div>
                            </div>
                            <button>Contact Support</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;