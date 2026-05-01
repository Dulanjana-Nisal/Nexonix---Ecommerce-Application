import './HeaderComponent.css'
import main_logo from '../../assets/logo2.png'
import Shopping_cart from '../../assets/shopping-cart.png'
import user_profile from '../../assets/user-profile.png'
import hamberger_menu from '../../assets/hamberger-menu.png'

function HeaderComponent() {
    return (
        <>
            <div class="header">
                <div class="header-top">
                    <div class="header-top-left">
                        <img src={main_logo} alt="logo" />
                    </div>
                    <div class="header-top-center">
                        <div class="search-box">
                            <input type="text" placeholder="Search for products..." />
                            <button>Search</button>
                        </div>
                        <div class="result-box">
                            <div class="result">
                                <h3>Razer BlackWidow V4 Pro</h3>
                                <p>gamings</p>
                            </div>
                            <div class="result">
                                <h3>Razer BlackWidow V4 Pro</h3>
                                <p>gamings</p>
                            </div>
                            <div class="result">
                                <h3>Razer BlackWidow V4 Pro</h3>
                                <p>gamings</p>
                            </div>
                            <div class="result">
                                <h3>Razer BlackWidow V4 Pro</h3>
                                <p>gamings</p>
                            </div>
                            <div class="result-btn">
                                <button>See all</button>
                            </div>
                        </div>
                    </div>
                    <div class="header-top-right">
                        <div class="orders">
                            <p>Orders</p>
                        </div>
                        <div class="profile">
                            <div class="profile-left">
                                <img src={user_profile} alt="user-profile" />
                            </div>
                            <div class="profile-right">
                                <p>Login</p>
                                <h3>Account</h3>
                            </div>
                        </div>
                        <div class="cart">
                            <div class="cart-left">
                                <img src={Shopping_cart} alt="shopping-cart" />
                                <p>0</p>
                            </div>
                            <div class="cart-right">
                                <p>Your Cart</p>
                                <h3>$0.00</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="header-navbar">
                    <div class="navbar-left">
                        <div class="navbar-left-selection">
                            <img src={hamberger_menu} alt="" />
                            <p>Browse All Categories</p>
                        </div>
                        <div class="navbar-left-selection-box">
                            <ul>
                                <li><a href="#">Computers</a></li>
                                <li><a href="#">Laptops</a></li>
                                <li><a href="#">Components</a></li>
                                <li><a href="#">Gamings</a></li>
                                <li><a href="#">Softwares</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="navbar-right">
                        <ul>
                            <li><a href="#">Computers</a></li>
                            <li><a href="#">Laptops</a></li>
                            <li><a href="#">Components</a></li>
                            <li><a href="#">Gamings</a></li>
                            <li><a href="#">Softwares</a></li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}

export default HeaderComponent;