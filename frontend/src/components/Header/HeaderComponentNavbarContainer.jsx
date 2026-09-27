import { Link } from "react-router-dom";

function HeaderComponentNavbarContainer({ hideSearchBox, searchResultBox, setToggleHamberger, hamberger_menu, toggleHamberger, category }) {
    return (
        <div className="header-navbar" onClick={() => hideSearchBox(searchResultBox)}>
            <div className="navbar-left">
                <div className="navbar-left-selection" onClick={() => setToggleHamberger(prev => !prev)}>
                    <img src={hamberger_menu} alt="" />
                    <p>Browse All Categories</p>
                </div>
                {
                    toggleHamberger &&
                    <div className="navbar-left-selection-box">
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
            <div className="navbar-right">
                <div className="bar-row">
                    <Link to="/products/computers" className={category === 'computers' && 'select-category'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2.5" y="4" width="19" height="13" rx="2" /><path d="M8.5 21h7" /><path d="M12 17v4" />
                        </svg>
                        <p>Computers</p>
                    </Link>
                    <Link to="/products/laptops" className={category === 'laptops' && 'select-category'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3.5" y="4.5" width="17" height="11" rx="1.5" /><path d="M1.5 19.5h21" />
                        </svg>
                        <p>Laptops</p>
                    </Link>
                    <Link to="/products/components" className={category === 'components' && 'select-category'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
                        </svg>
                        <p>Components</p>
                    </Link>
                    <Link to="/products/gamings" className={category === 'gamings' && 'select-category'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="7" width="20" height="11" rx="5.5" /><path d="M7 10.5v3M5.5 12h3" /><circle cx="16" cy="10.5" r="1" /><circle cx="18.5" cy="13" r="1" />
                        </svg>
                        <p>Gamings</p>
                    </Link>
                    <Link to="/products/softwares" className={category === 'softwares' && 'select-category'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="3.2" /><path d="M12 3v2.5M12 18.5V21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M3 12h2.5M18.5 12H21M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" />
                        </svg>
                        <p>Softwares</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponentNavbarContainer;