import { useState } from 'react'
import './AdminPage.css'
import api, { logout } from '../../services/auth'
import { useEffect } from 'react'
import user_profile from '../../assets/user-profile-image.png'
import logo from '../../assets/logo2.png'
import logo_letter from '../../assets/logo-image-letter.png'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

function AdminPage() {

    // all states
    const [products,setProducts] = useState([])
    const [productData,setProductData] = useState({all_result: 0, page_result: 0})
    const [loading,setLoading] = useState(false)

    //get admin data from localstorage
    const adminData = JSON.parse(localStorage.getItem('user'))

    //navigations
    const navigate = useNavigate()

    // get params value
    const {path} = useParams()

    //get query data from url
    const [queryData,setQueryData] = useSearchParams();

    //page number
    const pageNumber = Number(queryData.get('page')) || 1

    //availability
    const availability = queryData.get('availability') || ''

    //fetch product data
    useEffect(()=>{
        const fetchAdminData = async () =>{
            setLoading(true)
            const result = await api.get(`/products?page=${pageNumber}&availability=${availability}`)
            setProducts(result.data.data)
            setProductData({
                all_result: result.data.all_result,
                page_result: Math.ceil(result.data.all_result / 10)
            })
            setLoading(false)
        }
        window.scrollTo(0, 0)
        fetchAdminData()
    }, [queryData,pageNumber,availability,path])


    //prev page
    function prevPage(){
        if(pageNumber === 1){
            newQuery.set("page", 1)
        }
         const newQuery = new URLSearchParams(queryData)
         newQuery.set("page", pageNumber-1)
         setQueryData(newQuery)
    }

    //next page
    function nextPage(){
        if(pageNumber === productData.page_result){
            newQuery.set("page", pageNumber)
        }
        const newQuery = new URLSearchParams(queryData)
        newQuery.set("page", pageNumber+1)
        setQueryData(newQuery)
    }

    //change availability
    function changeAvailability(e){
        const newQuery = new URLSearchParams(queryData)
        if(pageNumber !== 1){
            newQuery.set('page', 1)
        }
        newQuery.set('availability', e.target.value)
        setQueryData(newQuery)
    }

    console.log(productData)

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
                                <Link to='/' class="no-style-link">
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
                            <div class="dashboard-section">
                                <div class="dashboard-header">
                                    <p>Welcome back, <span>{adminData.name} 👋</span></p>
                                </div>
                                <div class="dashboard-body">
                                    <div class="user-count box">
                                        <i class="fa-regular fa-user"></i>
                                        <div class="details">
                                            <h1>3</h1>
                                            <p>Total Customers</p>
                                        </div>
                                    </div>
                                    <div class="product-count box">
                                        <i class="fa-solid fa-box-archive"></i>
                                        <div class="details">
                                            <h1>{productData.all_result}</h1>
                                            <p>Total Products</p>
                                        </div>
                                    </div>
                                    <div class="order-count box">
                                        <i class="fa-solid fa-cube"></i>
                                        <div class="details">
                                            <h1>0</h1>
                                            <p>Total Orders</p>
                                        </div>
                                    </div>
                                    <div class="order-status box">
                                        <i class="fa-solid fa-clock"></i>
                                        <div class="details">
                                            <h1>3</h1>
                                            <p>Pending Delivery</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <div class="product-section">
                                <div class="product-header">
                                    <div class="header-filter">
                                        <p>Filter By</p>
                                        <select onChange={changeAvailability}>
                                            <option  value="true" selected>Available Products</option>
                                            <option value="false">Unavailabale Products</option>
                                        </select>
                                    </div>
                                    <div class="search">
                                        <input type="text" placeholder="Search Products" />
                                        <button><i class="fa-solid fa-magnifying-glass"></i></button>
                                    </div>
                                    <div class="header-create-btn">
                                        <button><i class="fa-solid fa-plus"></i>
                                            <p>Add Product</p>
                                        </button>
                                    </div>
                                </div>
                                <div class="product-body">
                                    <div class="product-list">
                                        <div class="product-box header">
                                            <div class="name row">
                                                <p>Product</p>
                                            </div>
                                            <div class="qnt row">
                                                <p>Qunatity</p>
                                            </div>
                                            <div class="price row">
                                                <p>Price</p>
                                            </div>
                                            <div class="availability row">
                                                <p>Availability</p>
                                            </div>
                                            <div class="buttons row">

                                            </div>
                                        </div>
                                        {
                                            loading ? <h3>Loading...</h3>:
                                            products.map((items)=>{
                                                return(
                                                    <div class="product-box products" key={items._id}>
                                                        <div class="name row">
                                                            <div class="image"><img src={items.image} alt="" /></div>
                                                            <div class="details">
                                                                <h4>{items.name}</h4>
                                                                <p>ID: {items._id}</p>
                                                            </div>
                                                        </div>
                                                        <div class="qnt row">
                                                            <p>{items.stock} Products</p>
                                                        </div>
                                                        <div class="price row">
                                                            <p>${items.price}</p>
                                                        </div>
                                                        <div class="availability row">
                                                            <p class={items.availability ? "availabale" : "unavailabale"}>{items.availability ? "In Stock": "Out Stock"}</p>
                                                        </div>
                                                        <div class="buttons row">
                                                            <button class="update"><i class="fa-solid fa-pen-to-square"></i></button>
                                                            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div class="responsive-list">
                                        <div class="product-box">
                                            <div class="left-side">
                                                <img src="../images/card-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Razer BlackWidow V4 Pro</p>
                                                </div>
                                                <div class="qnt row">
                                                    <h4>Quantity</h4>
                                                    <p>12 Products</p>
                                                </div>
                                                <div class="price row">
                                                    <h4>Price</h4>
                                                    <p>$299.99</p>
                                                </div>
                                                <div class="availability row">
                                                    <h4>Availability</h4>
                                                    <p class="availabale">In Stock</p>
                                                </div>
                                                <div class="buttons">
                                                    <button class="update"><i class="fa-solid fa-pen-to-square"></i></button>
                                                    <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-box">
                                            <div class="left-side">
                                                <img src="../images/card-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Razer BlackWidow V4 Pro</p>
                                                </div>
                                                <div class="qnt row">
                                                    <h4>Quantity</h4>
                                                    <p>12 Products</p>
                                                </div>
                                                <div class="price row">
                                                    <h4>Price</h4>
                                                    <p>$299.99</p>
                                                </div>
                                                <div class="availability row">
                                                    <h4>Availability</h4>
                                                    <p class="availabale">In Stock</p>
                                                </div>
                                                <div class="buttons">
                                                    <button class="update"><i class="fa-solid fa-pen-to-square"></i></button>
                                                    <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-box">
                                            <div class="left-side">
                                                <img src="../images/card-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Razer BlackWidow V4 Pro</p>
                                                </div>
                                                <div class="qnt row">
                                                    <h4>Quantity</h4>
                                                    <p>12 Products</p>
                                                </div>
                                                <div class="price row">
                                                    <h4>Price</h4>
                                                    <p>$299.99</p>
                                                </div>
                                                <div class="availability row">
                                                    <h4>Availability</h4>
                                                    <p class="availabale">In Stock</p>
                                                </div>
                                                <div class="buttons">
                                                    <button class="update"><i class="fa-solid fa-pen-to-square"></i></button>
                                                    <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-box">
                                            <div class="left-side">
                                                <img src="../images/card-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Razer BlackWidow V4 Pro</p>
                                                </div>
                                                <div class="qnt row">
                                                    <h4>Quantity</h4>
                                                    <p>12 Products</p>
                                                </div>
                                                <div class="price row">
                                                    <h4>Price</h4>
                                                    <p>$299.99</p>
                                                </div>
                                                <div class="availability row">
                                                    <h4>Availability</h4>
                                                    <p class="availabale">In Stock</p>
                                                </div>
                                                <div class="buttons">
                                                    <button class="update"><i class="fa-solid fa-pen-to-square"></i></button>
                                                    <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-box">
                                            <div class="left-side">
                                                <img src="../images/card-image.png" alt="" />
                                            </div>
                                            <div class="right-side">
                                                <div class="name row">
                                                    <h4>Name</h4>
                                                    <p>Razer BlackWidow V4 Pro</p>
                                                </div>
                                                <div class="qnt row">
                                                    <h4>Quantity</h4>
                                                    <p>12 Products</p>
                                                </div>
                                                <div class="price row">
                                                    <h4>Price</h4>
                                                    <p>$299.99</p>
                                                </div>
                                                <div class="availability row">
                                                    <h4>Availability</h4>
                                                    <p class="availabale">In Stock</p>
                                                </div>
                                                <div class="buttons">
                                                    <button class="update"><i class="fa-solid fa-pen-to-square"></i></button>
                                                    <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="add-product-box">
                                        <div class="box">
                                            <div class="box-header">
                                                <h1>Add Product</h1>
                                            </div>
                                            <div class="box-form">
                                                <form>
                                                    <div class="name row">
                                                        <label>Product Name</label>
                                                        <input type="text" />
                                                    </div>
                                                    <div class="image row">
                                                        <label>Product Image</label>
                                                        <input type="file" accept="image/*" />
                                                    </div>
                                                    <div class="counters">
                                                        <div class="price row">
                                                            <label>Product Price ($)</label><br />
                                                            <input type="number" />
                                                        </div>
                                                        <div class="quantity row">
                                                            <label>Quantity</label><br />
                                                            <input type="number" />
                                                        </div>
                                                    </div>
                                                    <div class="ratings row">
                                                        <p>Ratings</p>
                                                        <div class="inputs">
                                                            <input type="radio" id="star-4" name="star" /><label for="star-4">★</label>
                                                            <input type="radio" id="star-3" name="star" /><label for="star-3">★</label>
                                                            <input type="radio" id="star-5" name="star" /><label for="star-5">★</label>
                                                            <input type="radio" id="star-2" name="star" /><label for="star-2">★</label>
                                                            <input type="radio" id="star-1" name="star" checked /><label for="star-1" >★</label>
                                                        </div>
                                                    </div>
                                                    <div class="description row">
                                                        <label>Description</label>
                                                        <textarea placeholder="Add description"></textarea>
                                                    </div>
                                                    <div class="keywords row">
                                                        <div class="inputs">
                                                            <label>Key words</label>
                                                            <input type="text" />
                                                            <button>Add</button>
                                                        </div>
                                                        <div class="key-values">
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="category row">
                                                        <label>Select Category</label>
                                                        <select>
                                                            <option>Computers</option>
                                                            <option>Laptops</option>
                                                            <option>Components</option>
                                                            <option>Gamings</option>
                                                            <option>Softwares</option>
                                                        </select>
                                                    </div>
                                                    <div class="brand row">
                                                        <label>Product Brand</label>
                                                        <input type="text" />
                                                    </div>
                                                    <div class="availability row">
                                                        <label>Select Availability</label><br />
                                                        <div class="inputs">
                                                            <input type="radio" name="availability" id="true" checked /><label for="true" >Available</label>
                                                            <input type="radio" name="availability" id="false" /><label for="false">Unavaialable</label>
                                                        </div>
                                                    </div>
                                                    <div class="msgs">
                                                        <p class="error">Error Message Here!</p>
                                                    </div>
                                                    <div class="buttons row">
                                                        <input type="submit" value="Add Product" />
                                                        <button class="close">Close</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="update-product-box">
                                        <div class="box">
                                            <div class="box-header">
                                                <h1>Upadate Product</h1>
                                            </div>
                                            <div class="box-form">
                                                <form>
                                                    <div class="name row">
                                                        <label>Product Name</label>
                                                        <input type="text" />
                                                    </div>
                                                    <div class="image row">
                                                        <label>Product Image</label>
                                                        <input type="file" accept="image/*" />
                                                    </div>
                                                    <div class="counters">
                                                        <div class="price row">
                                                            <label>Product Price ($)</label><br />
                                                            <input type="number" />
                                                        </div>
                                                        <div class="quantity row">
                                                            <label>Quantity</label><br />
                                                            <input type="number" />
                                                        </div>
                                                    </div>
                                                    <div class="ratings row">
                                                        <p>Ratings</p>
                                                        <div class="inputs">
                                                            <input type="radio" id="update-star-5" name="update-star" /><label for="update-star-5">★</label>
                                                            <input type="radio" id="update-star-4" name="update-star" /><label for="update-star-4">★</label>
                                                            <input type="radio" id="update-star-3" name="update-star" /><label for="update-star-3">★</label>
                                                            <input type="radio" id="update-star-2" name="update-star" /><label for="update-star-2">★</label>
                                                            <input type="radio" id="update-star-1" name="update-star" checked /><label for="update-star-1">★</label>
                                                        </div>
                                                    </div>
                                                    <div class="description row">
                                                        <label>Description</label>
                                                        <textarea placeholder="Add description"></textarea>
                                                    </div>
                                                    <div class="keywords row">
                                                        <div class="inputs">
                                                            <label>Key words</label>
                                                            <input type="text" />
                                                            <button>Add</button>
                                                        </div>
                                                        <div class="key-values">
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                            <div class="values">
                                                                <p>Tech</p>
                                                                <i class="fa fa-close"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="category row">
                                                        <label>Select Category</label>
                                                        <select>
                                                            <option>Computers</option>
                                                            <option>Laptops</option>
                                                            <option>Components</option>
                                                            <option>Gamings</option>
                                                            <option>Softwares</option>
                                                        </select>
                                                    </div>
                                                    <div class="brand row">
                                                        <label>Product Brand</label>
                                                        <input type="text" />
                                                    </div>
                                                    <div class="availability row">
                                                        <label>Select Availability</label><br />
                                                        <div class="inputs">
                                                            <input type="radio" name="availability" id="true" checked /><label for="true" >Available</label>
                                                            <input type="radio" name="availability" id="false" /><label for="false">Unavaialable</label>
                                                        </div>
                                                    </div>
                                                    <div class="msgs">
                                                        <p class="error">Error Message Here!</p>
                                                    </div>
                                                    <div class="buttons row">
                                                        <input type="submit" value="Update Product" />
                                                        <button class="close">Close</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-footer">
                                    <div class="box-buttons">
                                        <button class="pre" onClick={() => prevPage()}>‹</button>
                                            <p><span>{pageNumber}</span> of {productData.page_result}</p>
                                        <button class="next" onClick={() => nextPage()}>›</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPage