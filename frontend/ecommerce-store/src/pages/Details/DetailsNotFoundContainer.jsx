import { Link } from "react-router-dom";
import not_found from '../../assets/404-background.png';

function DetailsNotFoundContainer() {
    return (
        <div class="notfound-container">
            <img src={not_found} alt="404 notfound" />
            <div class="background-details">
                <h4>Oops! Page Not Found</h4>
                <h1>Look like you're lost</h1>
                <p>The page you're looking for dosen't exist or has been moved. Let's get you back on track.</p>
                <div class="buttons">
                    <Link to="/" class="no-style-link">
                        <button class="home-btn">
                            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                <path d="M3 9.5 12 3l9 6.5"></path>
                                <path d="M5 8.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V8.5"></path>
                            </svg>
                            Go to Homepage
                        </button>
                    </Link>
                    <Link to="/products/computers" class="no-style-link">
                        <button class="cat-btn">
                            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            Browse Categories
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DetailsNotFoundContainer;