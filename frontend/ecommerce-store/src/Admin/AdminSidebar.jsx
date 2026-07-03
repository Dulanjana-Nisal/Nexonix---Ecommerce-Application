import { Link } from "react-router-dom";
import user_profile from '../assets/user-profile-image.png'
import logo from '../assets/logo2.png'
import logo_letter from '../assets/logo-image-letter.png'

function AdminSidebar({path,setProfileToggle,profileToggle,adminData,logout,navigate,dispatch,setupMessage}) {
    return (
        <div className="sidebar">
            <div className="top">
                <div className="sidebar-header">
                    <img src={logo} alt="logo" className="main-logo" />
                    <img src={logo_letter} alt="" className="logo-letter" />
                </div>
                <div className="sidebar-body">
                    <ul>
                        <Link to="/admin/dashboard" className="no-style-link">
                            <li className={path === "dashboard" && "select"}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                <p>Dashboard</p>
                            </li>
                        </Link>
                        <Link to="/admin/users" className="no-style-link">
                            <li className={path === "users" && "select"}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path></svg>
                                <p>Users</p>
                            </li>
                        </Link>
                        <Link to="/admin/products" className="no-style-link">
                            <li className={path === "products" && "select"}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                <p>Products</p>
                            </li>
                        </Link>
                        <Link to="/admin/orders" className="no-style-link">
                            <li className={path === "orders" && "select"}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                                <p>Orders</p>
                            </li>
                        </Link>
                        <Link to="/admin/notifications" className="no-style-link">
                            <li className={path === "notifications" && "select"}>
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                                <p>Notifications</p>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="bottom">
                <div className="responsive-footer">
                    <img src={user_profile} alt="" onClick={() => setProfileToggle(prev => !prev)} />
                    {
                        profileToggle &&
                        <div className="prodile-box">
                            <div className="footer-right">
                                <h3>{adminData.role}</h3>
                                <p>{adminData.email}</p>
                            </div>
                            <button className="log-out" onClick={() => logout(navigate, dispatch, setupMessage)}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"></path></svg>
                                Log Out
                            </button>
                        </div>
                    }
                </div>
                <div className="sidebar-footer">
                    <div className="footer-left">
                        <img src={user_profile} alt="user-profile" onClick={() => setProfileToggle(prev => !prev)} />
                    </div>
                    <div className="footer-right">
                        <h3>{adminData.role}</h3>
                        <p>{adminData.email}</p>
                    </div>
                    <button className="log-out" onClick={() => logout(navigate, dispatch, setupMessage)}>
                        Log Out
                        <svg width="20" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar;