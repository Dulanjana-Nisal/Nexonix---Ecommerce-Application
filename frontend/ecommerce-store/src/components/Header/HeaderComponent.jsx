import './HeaderComponent.css';
import main_logo from '../../assets/logo2.png';
import Shopping_cart from '../../assets/shopping-cart.png';
import user_profile from '../../assets/user-profile.png';
import hamberger_menu from '../../assets/hamberger-menu.png';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { displaySearchBox, hideSearchBox } from '../../utils/Buttons';
import { Cart } from '../../context/CartContext';

function HeaderComponent() {

    // use states 
    const [searchResult,setSearchResult] = useState([]);
    const [searchValue,setSearchValue] = useState('');
    const [loading,setLoading] = useState(false);
    const [toggleHamberger,setToggleHamberger] = useState(false);

    // use context
    const {state} = Cart()

    //load localstorage
    const {email} = JSON.parse(localStorage.getItem("user")) ?JSON.parse(localStorage.getItem("user")) :""

    //get infor from search result box
    const searchResultBox = useRef()
    
    //get cart item summery
    let cartHeaderSummery  = {
        count: 0,
        fullPrice: 0
    };
    state.map((items) => {
        cartHeaderSummery.count = cartHeaderSummery.count + items.quantity
        cartHeaderSummery.fullPrice = cartHeaderSummery.fullPrice + (items.price * items.quantity)
    })

    // add search values to use state if have more than 1 letter
    function searchInputValues(event){
        const valueData = event.target.value
        valueData.length > 1 && setSearchValue(valueData)
        valueData.length < 1 && setSearchValue("")
        setToggleHamberger(false)
    }
 
    //get Search Data
    useEffect(()=>{
        const fetchSearchData = async()=>{
            setLoading(true)
            const result = await axios.get(`http://localhost:5000/api/v1/products?search=${searchValue}&limit=5`);
            setSearchResult(result.data.data)
            setLoading(false)
        }
        fetchSearchData();
    }, [searchValue,searchResultBox])

    return (
        <>
            <div class="header">
                <div class="header-top">
                    <div class="header-top-left">
                        <Link to='/'>
                            <img src={main_logo} alt="logo"  onClick={() => hideSearchBox(searchResultBox)}/>
                        </Link>
                    </div>
                    <div class="header-top-center">
                        <div class="search-box" >
                            <input type="text" placeholder="Search for products..." onChange={searchInputValues} onClick={() => displaySearchBox(searchResultBox)}/>
                                <Link to={!searchValue ? '' : `/search?search=${searchValue}`} onClick={() => hideSearchBox(searchResultBox)}>
                                    <button>Search</button>
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
                                    searchResult.map((items)=>{
                                        return(
                                            <Link to={`/details/${items._id}`} style={{textDecoration: "none"}} key={items._id} onClick={()=>{setSearchValue("")}}>
                                                <div class="result">
                                                    <div className="left-side">
                                                        <h3>{items.name}</h3>
                                                        <p>{items.category}</p>
                                                    </div>
                                                    <div className="right-side">
                                                        <img src={items.image} alt="" />
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                                <div class="result-btn">
                                    <Link to={!searchValue ? '' : `/search?search=${searchValue}`} onClick={() => hideSearchBox()}>
                                        <button>See all</button>
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>
                    <div class="header-top-right">
                        <Link to='/orders' style={{textDecoration: "none", color: "#000"}}>
                            <div class="orders">
                                <p>Orders</p>
                            </div>
                        </Link>
                        <Link to='/account' style={{textDecoration: "none", color: "#000"}}>
                            <div class="profile">
                                <div class="profile-left">
                                    <img src={user_profile} alt="user-profile" />
                                </div>
                                <div class="profile-right">
                                    <p>{email ? "Loged" : "Login"}</p>
                                    <h3>{email ? email : "Account"}</h3>
                                </div>
                            </div>
                        </Link>
                        <Link to='/cart' style={{textDecoration: "none", color: "#000"}}>
                            <div class="cart">
                                <div class="cart-left">
                                    <img src={Shopping_cart} alt="shopping-cart" />
                                    <p>{cartHeaderSummery.count}</p>
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
                <div class="header-navbar"  onClick={()=>hideSearchBox(searchResultBox)}>
                    <div class="navbar-left">
                        <div class="navbar-left-selection" onClick={()=>{toggleHamberger ? setToggleHamberger(false) : setToggleHamberger(true)}}>
                            <img src={hamberger_menu} alt=""/>
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
                        <ul>
                            <li><Link to="/products/computers">Computers</Link></li>
                            <li><Link to="/products/laptops">Laptops</Link></li>
                            <li><Link to="/products/components">Components</Link></li>
                            <li><Link to="/products/gamings">Gamings</Link></li>
                            <li><Link to="/products/softwares">Softwares</Link></li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}

export default HeaderComponent;