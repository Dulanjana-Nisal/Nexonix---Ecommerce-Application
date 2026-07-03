import { Link } from "react-router-dom";

function AdminSectionHeader({ notifiState, fetchCartData }) {
    return (
        <div className="section-header">
            <div className="header-top-left">
                <h1>Dashboard</h1>
            </div>
            <div className="header-top-right">
                <Link to='/admin/notifications?status=false' className="no-style-link">
                    <div className="cart">
                        <svg width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        {
                            (notifiState.filter(items => !items.isread)).length !== 0 &&
                            <p>{(notifiState.filter(items => !items.isread)).length}</p>
                        }
                    </div>
                </Link>
                <div className="store">
                    <button onClick={() => fetchCartData()}>
                        <p>Go to Store</p>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminSectionHeader;