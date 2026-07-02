import './HeaderComponent.css';
import main_logo from '../../assets/logo2.png';
import hamberger_menu from '../../assets/hamberger-menu.png';
import logo_letter from '../../assets/logo-image-letter.png';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { displaySearchBox, hideSearchBox } from '../../utils/Buttons';
import { Cart } from '../../context/CartContext';
import { Notifications } from '../../context/NotificationContext';

function HeaderComponent() {

    // use states for header
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [toggleHamberger, setToggleHamberger] = useState(false);

    // use context
    const { state } = Cart();
    const { notifiState } = Notifications();

    // get param values
    const { category } = useParams();

    //load localstorage
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const email = user?.email

    //get infor from search result box
    const searchResultBox = useRef();

    //get cart item summery
    let cartHeaderSummery = state.reduce((acc, items) => {
        acc.count += items.quantity;
        acc.fullPrice += items.price * items.quantity;
        return acc;
    },
        { count: 0, fullPrice: 0 })

    // add search values to use state if have more than 1 letter
    const searchInputValues = (event) => {
        const valueData = event.target.value
        valueData.length > 1 && setSearchValue(valueData)
        valueData.length < 1 && setSearchValue("")
        setToggleHamberger(false)
    }

    //get Search Data
    useEffect(() => {
        const fetchSearchData = async () => {
            setLoading(true)
            try {
                const result = await axios.get(`http://localhost:5000/api/v1/products?search=${searchValue}&limit=5`);
                setSearchResult(result.data.data)
            }
            catch (err) {
                console.log(err.response)
                setSearchResult([])
            }
            finally {
                setLoading(false)
            }
        }
        fetchSearchData();
    }, [searchValue])

    return (
        <>
            <div class="header-top">
                <div class="header-top-container">
                    <div class="header-top-left">
                        <div class="tag">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 3h13v13H1z" /><path d="M14 8h4l3 3v5h-7z" /><circle cx="6" cy="18.5" r="1.7" /><circle cx="17.5" cy="18.5" r="1.7" />
                            </svg>
                            <p>Free Delivery on orders over $100</p>
                        </div>
                        <div class="tag">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2l8 3.5v6c0 5-3.6 8.3-8 10.5-4.4-2.2-8-5.5-8-10.5v-6L12 2z" /><path d="M8.5 12l2.3 2.3L15.5 9.7" />
                            </svg>
                            <p>1 Year Warrenty</p>
                        </div>
                        <div class="tag">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 11a9 9 0 1 1 2.6 6.3" /><path d="M3 17v-5h5" />
                            </svg>
                            <p>Easy Reterns</p>
                        </div>
                        <div class="tag">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 11.5a8.5 8.5 0 1 1-3.6-7L21 3l-1 4.5a8.4 8.4 0 0 1 1 4z" />
                            </svg>
                            <p>24/7 Support</p>
                        </div>
                    </div>
                    <div class="header-top-right">
                        <p>Follow us</p>
                        <div class="links">
                            <p><svg class='instagrame' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" />
                            </svg></p>
                            <p><svg class='youtube' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10.5 9l5 3-5 3z" />
                            </svg></p>
                            <p><svg class='tiktok' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.5" /><path d="M14 3c0 2.5 2 4.5 4.5 4.5" />
                            </svg></p>
                            <p><svg class='facebook' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 21v-7h2.5l.5-3H14V9c0-1 .3-1.7 1.8-1.7H17V4.4c-.5 0-1.6-.1-2.4-.1-2.6 0-4.1 1.5-4.1 4.4V11H8v3h2.5v7z" />
                            </svg></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header">
                <div class="header-middle">
                    <div class="header-middle-left">
                        <Link to='/'>
                            <img src={main_logo} class='main-logo' alt="logo" onClick={() => hideSearchBox(searchResultBox)} />
                            <img src={logo_letter} class='logo-letter' alt="logo" onClick={() => hideSearchBox(searchResultBox)} />
                        </Link>
                    </div>
                    <div class="header-middle-center">
                        <div class="search-box" >
                            <svg class='placeholder-logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                            </svg>
                            <input type="text" placeholder="Search for products..." onChange={searchInputValues} onClick={() => displaySearchBox(searchResultBox)} />
                            <Link to={searchValue ? `/search?search=${searchValue}` : '#'} onClick={() => hideSearchBox(searchResultBox)}>
                                <button>
                                    <svg class='button-logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        {
                            //check have more than 1 result
                            searchValue.length > 1 &&
                            <div class="result-box" ref={searchResultBox}>
                                {
                                    //Dsiplay loading text if search loading
                                    loading ?
                                        <div class="not-found">
                                            <h3>Loading...</h3>
                                        </div>
                                        :
                                        // Search not found display
                                        searchResult.length === 0 ?
                                            <div class="not-found">
                                                <h3>Not Found</h3>
                                            </div> :
                                            // if have some result, display
                                            searchResult.map((items) => {
                                                return (
                                                    <Link to={`/details/${items._id}`} style={{ textDecoration: "none" }} key={items._id} onClick={() => { setSearchValue("") }}>
                                                        <div class="result">
                                                            <div class="left-side">
                                                                <h3>{items.name}</h3>
                                                                <p>{items.category}</p>
                                                            </div>
                                                            <div class="right-side">
                                                                <img src={items.image} alt="" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                }
                                <div class="result-btn">
                                    <Link to={!searchValue ? '' : `/search?search=${searchValue}`} onClick={() => hideSearchBox(searchResultBox)}>
                                        <button>See all</button>
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>
                    <div class="header-middle-right">
                        <Link to='/orders' style={{ textDecoration: "none", color: "#000" }}>
                            <div class="orders">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" />
                                </svg>
                                <p>Orders</p>
                            </div>
                        </Link>
                        <Link to='/account' style={{ textDecoration: "none", color: "#000" }}>
                            <div class="profile">
                                <div class="profile-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
                                    </svg>
                                </div>
                                <div class="profile-right">
                                    <p>{email ? "My Account" : "Welcome"}</p>
                                    <svg class='trop-down' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                                <div class="profile-box">

                                </div>
                            </div>
                        </Link>
                        <Link to='/notifications' style={{ textDecoration: "none", color: "#000" }}>
                            <div class="cart">
                                <div class="cart-left">
                                    <svg width="27" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                                    {
                                        (notifiState.filter(items => !items.isread)).length !== 0 &&
                                        <p>{(notifiState.filter(items => !items.isread)).length}</p>
                                    }
                                </div>
                            </div>
                        </Link>
                        <Link to='/cart' style={{ textDecoration: "none", color: "#000" }}>
                            <div class="cart">
                                <div class="cart-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 7H6" />
                                    </svg>
                                    {
                                        cartHeaderSummery.count !== 0 &&
                                        <p>{cartHeaderSummery.count}</p>
                                    }
                                </div>
                                <div class="cart-right">
                                    <p>Your Cart</p>
                                    <h3>${(cartHeaderSummery.fullPrice).toFixed(2)}</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <hr />
                <div class="header-navbar" onClick={() => hideSearchBox(searchResultBox)}>
                    <div class="navbar-left">
                        <div class="navbar-left-selection" onClick={() => setToggleHamberger(prev => !prev)}>
                            <img src={hamberger_menu} alt="" />
                            <p>Browse All Categories</p>
                        </div>
                        {
                            toggleHamberger &&
                            <div class="navbar-left-selection-box">
                                <ul>
                                    <Link to="/products/computers"><li>Computers</li></Link>
                                    <Link to="/products/laptops"><li>Laptops</li></Link>
                                    <Link to="/products/components"><li>Components</li></Link>
                                    <Link to="/products/gamings"><li>Gamings</li></Link>
                                    <Link to="/products/softwares"><li>Softwares</li></Link>
                                </ul>
                            </div>
                        }
                    </div>
                    <div class="navbar-right">
                        <div class="bar-row">
                            <Link to="/products/computers" class={category === 'computers' && 'select-category'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="2.5" y="4" width="19" height="13" rx="2" /><path d="M8.5 21h7" /><path d="M12 17v4" />
                                </svg>
                                <p>Computers</p>
                            </Link>
                            <Link to="/products/laptops" class={category === 'laptops' && 'select-category'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3.5" y="4.5" width="17" height="11" rx="1.5" /><path d="M1.5 19.5h21" />
                                </svg>
                                <p>Laptops</p>
                            </Link>
                            <Link to="/products/components" class={category === 'components' && 'select-category'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
                                </svg>
                                <p>Components</p>
                            </Link>
                            <Link to="/products/gamings" class={category === 'gamings' && 'select-category'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="2" y="7" width="20" height="11" rx="5.5" /><path d="M7 10.5v3M5.5 12h3" /><circle cx="16" cy="10.5" r="1" /><circle cx="18.5" cy="13" r="1" />
                                </svg>
                                <p>Gamings</p>
                            </Link>
                            <Link to="/products/softwares" class={category === 'softwares' && 'select-category'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="3.2" /><path d="M12 3v2.5M12 18.5V21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M3 12h2.5M18.5 12H21M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
                                </svg>
                                <p>Softwares</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}

export default HeaderComponent;