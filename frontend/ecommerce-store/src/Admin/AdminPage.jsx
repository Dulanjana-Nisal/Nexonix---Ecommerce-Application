import './AdminPage.css'
import api, { logout } from '../services/auth'
import user_profile from '../assets/user-profile-image.png'
import logo from '../assets/logo2.png'
import logo_letter from '../assets/logo-image-letter.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ACTIONS } from '../context/CartReducer'
import { Cart } from '../context/CartContext'
import Dashboard from './pages/Dashboard/Dashboard'
import Products from './pages/Products/Products'
import Users from './pages/Users/Users'
import Orders from './pages/Orders/Orders'
import NotificationsPage from './pages/Notifications/Notifications'
import { Notifications } from './Context/NotificationContext'
import { Message } from '../context/MessagesContext'

function AdminPage() {

    //load context
    const { dispatch } = Cart() || []
    const { notifiState } = Notifications() || {}
    const { setupMessage } = Message() || []

    //products states
    const [productData, setProductData] = useState([])
    const [ordersData, setOrdersData] = useState([])
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)
    const [profileToggle, setProfileToggle] = useState(false)

    //get admin data from localstorage
    const adminData = JSON.parse(localStorage.getItem('user'))

    //navigations
    const navigate = useNavigate()

    // get params value
    const { path } = useParams()

    //fetch product data
    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true)
            try {
                const [productResult, ordersResult, usersResult] = await Promise.all([
                    api.get(`/products`),
                    api.get(`/orders/all?limit=1`),
                    api.get('/users')
                ]);

                setProductData(productResult.data.all_result);
                setOrdersData(ordersResult.data.data);
                setUserData(usersResult.data.all_result);
            }
            catch (err) {
                console.log(err.response)
            }
            finally {
                setLoading(false)
            }
        }
        fetchProductData()
    }, [])

    //refesh reducer
    const fetchCartData = async () => {
        const result = await api.get('/cart')
        dispatch({
            type: ACTIONS.SET_CART,
            payload: result.data.data[0].items
        })
        navigate('/')
    }

    return (
        <>
            <div class="admin-container">
                <div class="sidebar">
                    <div class="top">
                        <div class="sidebar-header">
                            <img src={logo} alt="logo" class="main-logo" />
                            <img src={logo_letter} alt="" class="logo-letter" />
                        </div>
                        <div class="sidebar-body">
                            <ul>
                                <Link to="/admin/dashboard" class="no-style-link">
                                    <li class={path === "dashboard" && "select"}>
                                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                        <p>Dashboard</p>
                                    </li>
                                </Link>
                                <Link to="/admin/users" class="no-style-link">
                                    <li class={path === "users" && "select"}>
                                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path></svg>
                                        <p>Users</p>
                                    </li>
                                </Link>
                                <Link to="/admin/products" class="no-style-link">
                                    <li class={path === "products" && "select"}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        <p>Products</p>
                                    </li>
                                </Link>
                                <Link to="/admin/orders" class="no-style-link">
                                    <li class={path === "orders" && "select"}>
                                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                                        <p>Orders</p>
                                    </li>
                                </Link>
                                <Link to="/admin/notifications" class="no-style-link">
                                    <li class={path === "notifications" && "select"}>
                                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                        <p>Notifications</p>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="responsive-footer">
                            <img src={user_profile} alt="" onClick={() => setProfileToggle(prev => !prev)} />
                            {
                                profileToggle &&
                                <div class="prodile-box">
                                    <div class="footer-right">
                                        <h3>{adminData.role}</h3>
                                        <p>{adminData.email}</p>
                                    </div>
                                    <button class="log-out" onClick={() => logout(navigate, dispatch, setupMessage)}>
                                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"></path></svg>
                                        Log Out
                                    </button>
                                </div>
                            }
                        </div>
                        <div class="sidebar-footer">
                            <div class="footer-left">
                                <img src={user_profile} alt="user-profile" onClick={() => setProfileToggle(prev => !prev)} />
                            </div>
                            <div class="footer-right">
                                <h3>{adminData.role}</h3>
                                <p>{adminData.email}</p>
                            </div>
                            <button class="log-out" onClick={() => logout(navigate, dispatch, setupMessage)}>
                                Log Out
                                <svg width="20" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="sections">
                    <div class="section-header">
                        <div class="header-top-left">
                            <h1>Dashboard</h1>
                        </div>
                        <div class="header-top-right">
                            <Link to='/admin/notifications?status=false' class="no-style-link">
                                <div class="cart">
                                    <svg width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                    {
                                        (notifiState.filter(items => !items.isread)).length !== 0 &&
                                        <p>{(notifiState.filter(items => !items.isread)).length}</p>
                                    }
                                </div>
                            </Link>
                            <div class="store">
                                <button onClick={() => fetchCartData()}>
                                    <p>Go to Store</p>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="sections-body">
                        {/* <!-- Dashboard Section --> */}
                        {
                            path === 'dashboard' &&
                            <Dashboard adminData={adminData} productData={productData} ordersData={ordersData} userData={userData} loading={loading} />
                        }
                        {/* <!-- Users Section --> */}
                        {
                            path === 'users' &&
                            <Users />
                        }
                        {/* <!-- product Section --> */}
                        {
                            path === 'products' &&
                            <Products path={path} />
                        }
                        {/* <!-- Orders Section --> */}
                        {
                            path === 'orders' &&
                            <Orders path={path} />
                        }
                        {/* <!-- Notifications Section --> */}
                        {
                            path === 'notifications' &&
                            <NotificationsPage path={path} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPage