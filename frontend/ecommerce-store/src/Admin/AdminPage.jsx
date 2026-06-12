import './AdminPage.css'
import  api, { logout } from '../services/auth'
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

function AdminPage() {

    //load context
    const {dispatch} = Cart()

    //products states
    const [productData, setProductData] = useState(null)

    //get admin data from localstorage
    const adminData = JSON.parse(localStorage.getItem('user'))

    //navigations
    const navigate = useNavigate()

    // get params value
    const { path } = useParams()

    //fetch product data
    useEffect(() => {
        const fetchProductData = async () => {
            const result = await api.get(`/products`)
            setProductData(result.data.all_result)
        }
        fetchProductData()
    }, [])

    //refesh reducer
    const fetchCartData = async () =>{
        const result = await api.get('/cart')
        dispatch({
            type: ACTIONS.SET_CART,
            payload: result.data.data[0].items
        })
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
                                <Link to="/admin/dashboard" class="no-style-link"><li class={path === "dashboard" && "select"}><i class="fa-solid fa-table"></i>Dashboard</li></Link>
                                <Link to="/admin/users" class="no-style-link"><li class={path === "users" && "select"}><i class="fa-solid fa-user"></i>Users</li></Link>
                                <Link to="/admin/products" class="no-style-link"><li class={path === "products" && "select"}><i class="fa-solid fa-box"></i>Products</li></Link>
                                <Link to="/admin/orders" class="no-style-link"><li class={path === "orders" && "select"}><i class="fa-solid fa-cube"></i>Orders</li></Link>
                                <Link to="/admin/notifications" class="no-style-link"><li class={path === "notifications" && "select"}><i class="fa-solid fa-envelope"></i>Notifications</li></Link>
                            </ul>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="responsive-footer">
                            <img src={user_profile} alt="" />
                            <div class="prodile-box">
                                <div class="footer-right">
                                    <h3>{adminData.role}</h3>
                                    <p>{adminData.email}</p>
                                </div>
                                <button class="log-out" onClick={() => logout(navigate)}>Log Out</button>
                            </div>
                        </div>
                        <div class="sidebar-footer">
                            <div class="footer-left">
                                <img src={user_profile} alt="user-profile" />
                            </div>
                            <div class="footer-right">
                                <h3>{adminData.role}</h3>
                                <p>{adminData.email}</p>
                            </div>
                            <button class="log-out" onClick={() => logout(navigate)}>Log Out</button>
                        </div>
                    </div>
                </div>
                <div class="sections">
                    <div class="section-header">
                        <div class="header-top-left">
                            <h1>Dashboard</h1>
                        </div>
                        <div class="header-top-right">
                            <div class="cart">
                                <i class="fa-solid fa-bell"></i>
                                <p>0</p>
                            </div>
                            <div class="store">
                                <Link to='/' class="no-style-link" onClick={() => fetchCartData()}>
                                    <button><i class="fa-solid fa-store"></i>
                                        <p>Go to Store</p>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div class="sections-body">
                        {/* <!-- Dashboard Section --> */}
                        {
                            path === 'dashboard' &&
                            <Dashboard adminData={adminData} productData={productData} />
                        }
                        {/* <!-- Users Section --> */}
                        {
                            path === 'users' &&
                            <Users />
                        }
                        {/* <!-- product Section --> */}
                        {
                            path === 'products' &&
                            <Products path={path}/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPage