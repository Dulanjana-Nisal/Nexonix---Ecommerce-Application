import './AdminPage.css'
import  api, { logout } from '../services/auth'
import user_profile from '../assets/user-profile-image.png'
import logo from '../assets/logo2.png'
import logo_letter from '../assets/logo-image-letter.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminProducts from './AdminProducts'
import { useEffect, useState } from 'react'
import { ACTIONS } from '../context/CartReducer'
import { Cart } from '../context/CartContext'
import Dashboard from './pages/Dashboard/Dashboard'

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
                                <Link to="/admin/settings" class="no-style-link"><li class={path === "settings" && "select"}><i class="fa-solid fa-gear"></i>Settings</li></Link>
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
                            <div class="user-section">
                                <div class="user-header">
                                    <h1>Users List</h1>
                                    <div class="search">
                                        <input type="text" placeholder="Search Users" />
                                        <button><i class="fa-solid fa-magnifying-glass"></i></button>
                                    </div>
                                </div>
                                <div class="user-body">
                                    <div class="user-list">
                                        <div class="list-header">
                                            <p>Name</p>
                                            <p>Email</p>
                                            <p>Id</p>
                                            <p>Orders</p>
                                        </div>
                                        <div class="user-box">
                                            <div class="name">
                                                <img src="../images/user-profile-image.png" alt="prodile-image" class="user-image" />
                                                <p>Dulanjana Nisal</p>
                                            </div>
                                            <div>
                                                <p>dulanjananisal67@gmail.com</p>
                                            </div>
                                            <div>
                                                <p>69da8f62c39fbcbf86351016</p>
                                            </div>
                                            <div class="buttons">
                                                <button class="order-btn">All Orders</button>
                                                <button class="delete-btn"><img src="../images/delete-icon.png" alt="" /></button>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="name">
                                                <img src="../images/user-profile-image.png" alt="prodile-image" class="user-image" />
                                                <p>Dulanjana Nisal</p>
                                            </div>
                                            <div>
                                                <p>dulanjananisal67@gmail.com</p>
                                            </div>
                                            <div>
                                                <p>69da8f62c39fbcbf86351016</p>
                                            </div>
                                            <div class="buttons">
                                                <button class="order-btn">All Orders</button>
                                                <button class="delete-btn"><img src="../images/delete-icon.png" alt="" /></button>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="name">
                                                <img src="../images/user-profile-image.png" alt="prodile-image" class="user-image" />
                                                <p>Dulanjana Nisal</p>
                                            </div>
                                            <div>
                                                <p>dulanjananisal67@gmail.com</p>
                                            </div>
                                            <div>
                                                <p>69da8f62c39fbcbf86351016</p>
                                            </div>
                                            <div class="buttons">
                                                <button class="order-btn">All Orders</button>
                                                <button class="delete-btn"><img src="../images/delete-icon.png" alt="" /></button>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="name">
                                                <img src="../images/user-profile-image.png" alt="prodile-image" class="user-image" />
                                                <p>Dulanjana Nisal</p>
                                            </div>
                                            <div>
                                                <p>dulanjananisal67@gmail.com</p>
                                            </div>
                                            <div>
                                                <p>69da8f62c39fbcbf86351016</p>
                                            </div>
                                            <div class="buttons">
                                                <button class="order-btn">All Orders</button>
                                                <button class="delete-btn"><img src="../images/delete-icon.png" alt="" /></button>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="name">
                                                <img src="../images/user-profile-image.png" alt="prodile-image" class="user-image" />
                                                <p>Dulanjana Nisal</p>
                                            </div>
                                            <div>
                                                <p>dulanjananisal67@gmail.com</p>
                                            </div>
                                            <div>
                                                <p>69da8f62c39fbcbf86351016</p>
                                            </div>
                                            <div class="buttons">
                                                <button class="order-btn">All Orders</button>
                                                <button class="delete-btn"><img src="../images/delete-icon.png" alt="" /></button>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="name">
                                                <img src="../images/user-profile-image.png" alt="prodile-image" class="user-image" />
                                                <p>Dulanjana Nisal</p>
                                            </div>
                                            <div>
                                                <p>dulanjananisal67@gmail.com</p>
                                            </div>
                                            <div>
                                                <p>69da8f62c39fbcbf86351016</p>
                                            </div>
                                            <div class="buttons">
                                                <button class="order-btn">All Orders</button>
                                                <button class="delete-btn"><img src="../images/delete-icon.png" alt="" /></button>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="name">
                                                <img src="../images/user-profile-image.png" alt="prodile-image" class="user-image" />
                                                <p>Dulanjana Nisal</p>
                                            </div>
                                            <div>
                                                <p>dulanjananisal67@gmail.com</p>
                                            </div>
                                            <div>
                                                <p>69da8f62c39fbcbf86351016</p>
                                            </div>
                                            <div class="buttons">
                                                <button class="order-btn">All Orders</button>
                                                <button class="delete-btn"><img src="../images/delete-icon.png" alt="" /></button>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="name">
                                                <img src="../images/user-profile-image.png" alt="prodile-image" class="user-image" />
                                                <p>Dulanjana Nisal</p>
                                            </div>
                                            <div>
                                                <p>dulanjananisal67@gmail.com</p>
                                            </div>
                                            <div>
                                                <p>69da8f62c39fbcbf86351016</p>
                                            </div>
                                            <div class="buttons">
                                                <button class="order-btn">All Orders</button>
                                                <button class="delete-btn"><img src="../images/delete-icon.png" alt="" /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="user-list-responsive">
                                        <div class="user-box">
                                            <div class="left-side">
                                                <img src="../images/user-profile-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Dulanjana Nisal</p>
                                                </div>
                                                <div class="email row">
                                                    <h4>Email</h4>
                                                    <p>dulanjananisal67@gmail.com</p>
                                                </div>
                                                <div class="id row">
                                                    <h4>User ID</h4>
                                                    <p>69da8f62c39fbcbf86351016</p>
                                                </div>
                                                <div class="orders row">
                                                    <h4>Orders</h4>
                                                    <div class="btns">
                                                        <button class="order-btn">All Orders</button>
                                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                                            alt="" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="left-side">
                                                <img src="../images/user-profile-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Dulanjana Nisal</p>
                                                </div>
                                                <div class="email row">
                                                    <h4>Email</h4>
                                                    <p>dulanjananisal67@gmail.com</p>
                                                </div>
                                                <div class="id row">
                                                    <h4>User ID</h4>
                                                    <p>69da8f62c39fbcbf86351016</p>
                                                </div>
                                                <div class="orders row">
                                                    <h4>Orders</h4>
                                                    <div class="btns">
                                                        <button class="order-btn">All Orders</button>
                                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                                            alt="" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="left-side">
                                                <img src="../images/user-profile-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Dulanjana Nisal</p>
                                                </div>
                                                <div class="email row">
                                                    <h4>Email</h4>
                                                    <p>dulanjananisal67@gmail.com</p>
                                                </div>
                                                <div class="id row">
                                                    <h4>User ID</h4>
                                                    <p>69da8f62c39fbcbf86351016</p>
                                                </div>
                                                <div class="orders row">
                                                    <h4>Orders</h4>
                                                    <div class="btns">
                                                        <button class="order-btn">All Orders</button>
                                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                                            alt="" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="left-side">
                                                <img src="../images/user-profile-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Dulanjana Nisal</p>
                                                </div>
                                                <div class="email row">
                                                    <h4>Email</h4>
                                                    <p>dulanjananisal67@gmail.com</p>
                                                </div>
                                                <div class="id row">
                                                    <h4>User ID</h4>
                                                    <p>69da8f62c39fbcbf86351016</p>
                                                </div>
                                                <div class="orders row">
                                                    <h4>Orders</h4>
                                                    <div class="btns">
                                                        <button class="order-btn">All Orders</button>
                                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                                            alt="" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="left-side">
                                                <img src="../images/user-profile-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Dulanjana Nisal</p>
                                                </div>
                                                <div class="email row">
                                                    <h4>Email</h4>
                                                    <p>dulanjananisal67@gmail.com</p>
                                                </div>
                                                <div class="id row">
                                                    <h4>User ID</h4>
                                                    <p>69da8f62c39fbcbf86351016</p>
                                                </div>
                                                <div class="orders row">
                                                    <h4>Orders</h4>
                                                    <div class="btns">
                                                        <button class="order-btn">All Orders</button>
                                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                                            alt="" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="left-side">
                                                <img src="../images/user-profile-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Dulanjana Nisal</p>
                                                </div>
                                                <div class="email row">
                                                    <h4>Email</h4>
                                                    <p>dulanjananisal67@gmail.com</p>
                                                </div>
                                                <div class="id row">
                                                    <h4>User ID</h4>
                                                    <p>69da8f62c39fbcbf86351016</p>
                                                </div>
                                                <div class="orders row">
                                                    <h4>Orders</h4>
                                                    <div class="btns">
                                                        <button class="order-btn">All Orders</button>
                                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                                            alt="" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="left-side">
                                                <img src="../images/user-profile-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Dulanjana Nisal</p>
                                                </div>
                                                <div class="email row">
                                                    <h4>Email</h4>
                                                    <p>dulanjananisal67@gmail.com</p>
                                                </div>
                                                <div class="id row">
                                                    <h4>User ID</h4>
                                                    <p>69da8f62c39fbcbf86351016</p>
                                                </div>
                                                <div class="orders row">
                                                    <h4>Orders</h4>
                                                    <div class="btns">
                                                        <button class="order-btn">All Orders</button>
                                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                                            alt="" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="user-box">
                                            <div class="left-side">
                                                <img src="../images/user-profile-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Dulanjana Nisal</p>
                                                </div>
                                                <div class="email row">
                                                    <h4>Email</h4>
                                                    <p>dulanjananisal67@gmail.com</p>
                                                </div>
                                                <div class="id row">
                                                    <h4>User ID</h4>
                                                    <p>69da8f62c39fbcbf86351016</p>
                                                </div>
                                                <div class="orders row">
                                                    <h4>Orders</h4>
                                                    <div class="btns">
                                                        <button class="order-btn">All Orders</button>
                                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                                            alt="" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="user-full-details">
                                        <div class="user-box">
                                            <div class="left-side">
                                                <img src="../images/user-profile-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Dulanjana Nisal</p>
                                                </div>
                                                <div class="email row">
                                                    <h4>Email</h4>
                                                    <p>dulanjananisal67@gmail.com</p>
                                                </div>
                                                <div class="id row">
                                                    <h4>User ID</h4>
                                                    <p>69da8f62c39fbcbf86351016</p>
                                                </div>
                                                <div class="role row">
                                                    <h4>Role</h4>
                                                    <p>User</p>
                                                </div>
                                                <button><i class="fa fa-close"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* <!-- product Section --> */}
                        {
                            path === 'products' &&
                            <AdminProducts path={path}/>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPage