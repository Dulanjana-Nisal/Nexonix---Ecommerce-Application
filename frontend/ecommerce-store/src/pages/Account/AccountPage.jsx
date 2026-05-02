import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './AccountPage.css';

function AccountPage() {
    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div class="account-container">
                <div class="container-header">
                    <h1>My Account</h1>
                    <p><span>Home /</span> My Account</p>
                </div>
                <div class="container-body">
                    <div class="signin-container">
                        <div class="signin-header">
                            <p>Sign In</p>
                        </div>
                        <div class="signin-form">
                            <form>
                                <div class="email">
                                    <label>Email Address <span>*</span></label><br />
                                    <input type="text" />
                                </div>
                                <div class="password">
                                    <label>Password <span>*</span></label><br />
                                    <input type="password" />
                                    <img src="../../images/open-eye.png" class="open" alt="" />
                                    <img src="../../images/close-eye.png" class="close" alt="" />
                                </div>
                                <div class="messages">
                                    <p class="success">Success Message</p>
                                </div>
                                <input type="submit" class="button" value="Sign In" />
                            </form>
                        </div>
                    </div>
                    <div class="signup-container">
                        <div class="signup-header">
                            <p>Sign Up</p>
                        </div>
                        <div class="signup-form">
                            <form>
                                <div class="name">
                                    <label>Your Name <span>*</span></label><br />
                                    <input type="text" />
                                </div>
                                <div class="email">
                                    <label>Email Address <span>*</span></label><br />
                                    <input type="text" />
                                </div>
                                <div class="password">
                                    <label>Password <span>*</span></label><br />
                                    <input type="password" />
                                    <img src="../../images/open-eye.png" class="open" alt="" />
                                    <img src="../../images/close-eye.png" class="close" alt="" />
                                </div>
                                <div class="messages">
                                    <p class="error">Error Message</p>
                                </div>
                                <input type="submit" class="button" value="Sign Up" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default AccountPage;