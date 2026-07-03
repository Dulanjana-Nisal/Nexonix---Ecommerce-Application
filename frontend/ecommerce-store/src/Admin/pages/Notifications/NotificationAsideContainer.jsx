function NotificationAsideContainer({notifiState}) {
    return (
        <div className="col-aside-admin">
            {/* <!-- Notification Summary --> */}
            <div className="notifi-card">
                <h3>Notification Summary</h3>
                <div className="summary-row">
                    <div className="sr-icon all">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                    </div>
                    <span className="label">All Notifications</span>
                    <span className="count">{notifiState.length}</span>
                </div>
                <div className="summary-row">
                    <div className="sr-icon unread">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></svg>
                    </div>
                    <span className="label">Unread</span>
                    <span className="count">{(notifiState.filter(items => !items.isread)).length}</span>
                </div>
                <div className="summary-row">
                    <div className="sr-icon info2">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                    </div>
                    <span className="label">Users</span>
                    <span className="count">{(notifiState.filter(items => items.type === 'users')).length}</span>
                </div>
                <div className="summary-row">
                    <div className="sr-icon success2">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="label">Orders</span>
                    <span className="count">{(notifiState.filter(items => items.type === 'orders')).length}</span>
                </div>
                <div className="summary-row">
                    <div className="sr-icon warn2">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                    </div>
                    <span className="label">Products</span>
                    <span className="count">{(notifiState.filter(items => items.type === 'products')).length}</span>
                </div>
                <div className="summary-row">
                    <div className="sr-icon unread">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <span className="label">Deletion</span>
                    <span className="count">{(notifiState.filter(items => items.type === 'deletes')).length}</span>
                </div>
            </div>
        </div>
    )
}

export default NotificationAsideContainer;