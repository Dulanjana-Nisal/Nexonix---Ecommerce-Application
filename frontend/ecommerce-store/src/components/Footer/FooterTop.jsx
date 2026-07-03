import { Link } from 'react-router-dom';
import logo_image from '../../assets/footer-logo.png'

function FooterTop() {
    return (
        <div className="footer-top">
            <div className="location">
                <div className="title">
                    <img src={logo_image} alt="" />
                </div>
                <div className="details">
                    <p>
                        Your one-stop destination for premium computers, components, gaming gear,software and more.
                    </p>
                    <div className="social">
                        <svg className="instagrame" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" />
                        </svg>
                        <svg className="youtube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10.5 9l5 3-5 3z" />
                        </svg>
                        <svg className="tiktok" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.5" /><path d="M14 3c0 2.5 2 4.5 4.5 4.5" />
                        </svg>
                        <svg className="facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 21v-7h2.5l.5-3H14V9c0-1 .3-1.7 1.8-1.7H17V4.4c-.5 0-1.6-.1-2.4-.1-2.6 0-4.1 1.5-4.1 4.4V11H8v3h2.5v7z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="information">
                <div className="title">
                    <p>Shop</p>
                </div>
                <div className="details">
                    <ul>
                        <li><Link to="/products/computers">Computers</Link></li>
                        <li><Link to="/products/laptops">Laptops</Link></li>
                        <li><Link to="/products/components">Components</Link></li>
                        <li><Link to="/products/gamings">Gamings</Link></li>
                        <li><Link to="/products/softwares">Softwares</Link></li>
                    </ul>
                </div>
            </div>
            <div className="links">
                <div className="title">
                    <p>Customer Service</p>
                </div>
                <div className="details">
                    <ul>
                        <li><Link to=''>Contact Us</Link></li>
                        <li><Link to="">Shipping Policy</Link></li>
                        <li><Link to="">Returns & Refunds</Link></li>
                        <li><Link to="">Warranty</Link></li>
                        <li><Link to="/orders">Track Order</Link></li>
                    </ul>
                </div>
            </div>
            <div className="pages">
                <div className="title">
                    <p>Company</p>
                </div>
                <div className="details">
                    <ul>
                        <li><Link to="">About Us</Link></li>
                        <li><Link to="">Terms & Conditions</Link></li>
                        <li><Link to="">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="contact">
                <div className="title">
                    <p>Contact Us</p>
                </div>
                <div className="details">
                    <div className="link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.3" />
                        </svg>
                        <p>123 Tech Street, New York, NY 10001</p>
                    </div>
                    <div className="link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5.5 3.5h3L10 8l-2 1.5a13 13 0 0 0 6.5 6.5L16 14l4.5 1.5v3a2 2 0 0 1-2.2 2A18 18 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2z" />
                        </svg>
                        <p>+1 (555) 123-4567</p>
                    </div>
                    <div className="link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" />
                        </svg>
                        <p>support@nexonix.com</p>
                    </div>
                    <div className="link">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
                        </svg>
                        <p>Mon - Fri: 9AM - 6PM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterTop;