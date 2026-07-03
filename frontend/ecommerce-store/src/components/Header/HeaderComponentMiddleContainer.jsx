import { Link } from "react-router-dom";
import main_logo from '../../assets/logo2.png';
import logo_letter from '../../assets/logo-image-letter.png';

function HeaderComponentMiddleContainer({ hideSearchBox, searchResultBox, displaySearchBox, searchInputValues, searchValue, loading, searchResult, setSearchValue, email, notifiState, cartHeaderSummery }) {
    return (
        <div className="header-middle">
            <div className="header-middle-left">
                <Link to='/'>
                    <img src={main_logo} className='main-logo' alt="logo" onClick={() => hideSearchBox(searchResultBox)} />
                    <img src={logo_letter} className='logo-letter' alt="logo" onClick={() => hideSearchBox(searchResultBox)} />
                </Link>
            </div>
            <div className="header-middle-center">
                <div className="search-box" >
                    <svg className='placeholder-logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                    </svg>
                    <input type="text" placeholder="Search for products..." onChange={searchInputValues} onClick={() => displaySearchBox(searchResultBox)} />
                    <Link to={searchValue ? `/search?search=${searchValue}` : '#'} onClick={() => hideSearchBox(searchResultBox)}>
                        <button>
                            <svg className='button-logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                            </svg>
                        </button>
                    </Link>
                </div>
                {
                    //check have more than 1 result
                    searchValue.length > 1 &&
                    <div className="result-box" ref={searchResultBox}>
                        {
                            //Dsiplay loading text if search loading
                            loading ?
                                <div className="not-found">
                                    <h3>Loading...</h3>
                                </div>
                                :
                                // Search not found display
                                searchResult.length === 0 ?
                                    <div className="not-found">
                                        <h3>Not Found</h3>
                                    </div> :
                                    // if have some result, display
                                    searchResult.map((items) => {
                                        return (
                                            <Link to={`/details/${items._id}`} style={{ textDecoration: "none" }} key={items._id} onClick={() => { setSearchValue("") }}>
                                                <div className="result">
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
                        <div className="result-btn">
                            <Link to={!searchValue ? '' : `/search?search=${searchValue}`} onClick={() => hideSearchBox(searchResultBox)}>
                                <button>See all</button>
                            </Link>
                        </div>
                    </div>
                }
            </div>
            <div className="header-middle-right">
                <Link to='/orders' style={{ textDecoration: "none", color: "#000" }}>
                    <div className="orders">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" />
                        </svg>
                        <p>Orders</p>
                    </div>
                </Link>
                <Link to='/account' style={{ textDecoration: "none", color: "#000" }}>
                    <div className="profile">
                        <div className="profile-left">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
                            </svg>
                        </div>
                        <div className="profile-right">
                            <p>{email ? "My Account" : "Welcome"}</p>
                            <svg className='trop-down' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                        <div className="profile-box">

                        </div>
                    </div>
                </Link>
                <Link to='/notifications' style={{ textDecoration: "none", color: "#000" }}>
                    <div className="cart">
                        <div className="cart-left">
                            <svg width="27" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                            {
                                (notifiState.filter(items => !items.isread)).length !== 0 &&
                                <p>{(notifiState.filter(items => !items.isread)).length}</p>
                            }
                        </div>
                    </div>
                </Link>
                <Link to='/cart' style={{ textDecoration: "none", color: "#000" }}>
                    <div className="cart">
                        <div className="cart-left">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L22 7H6" />
                            </svg>
                            {
                                cartHeaderSummery.count !== 0 &&
                                <p>{cartHeaderSummery.count}</p>
                            }
                        </div>
                        <div className="cart-right">
                            <p>Your Cart</p>
                            <h3>${(cartHeaderSummery.fullPrice).toFixed(2)}</h3>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default HeaderComponentMiddleContainer;