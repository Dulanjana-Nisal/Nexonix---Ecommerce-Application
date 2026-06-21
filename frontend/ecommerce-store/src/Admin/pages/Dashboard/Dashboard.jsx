import './Dashboard.css';

function Dashboard({adminData,productData,ordersData,userData,loading}) {
    return (
        <>
            <div class="dashboard-section">
                <div class="dashboard-header">
                    <p>Welcome back, <span>{adminData.name} 👋</span></p>
                </div>
                <div class="dashboard-body">
                    <div class="user-count box">
                        <svg width="25" height="25" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path></svg>
                        <div class="details">
                            {
                                loading ? <p>Loading...</p>
                                :
                                <h1>{userData}</h1>
                            }
                            <p>Total Customers</p>
                        </div>
                    </div>
                    <div class="product-count box">
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        <div class="details">
                            {
                                loading ? <p>Loading...</p>
                                :
                                <h1>{productData}</h1>
                            }
                            <p>Total Products</p>
                        </div>
                    </div>
                    <div class="order-count box">
                        <svg width="25" height="25" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                        <div class="details">
                            {
                                loading ? <p>Loading...</p>
                                :
                                <h1>{ordersData.length}</h1>
                            }
                            <p>Total Orders</p>
                        </div>
                    </div>
                    <div class="order-status box">
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <div class="details">
                            {
                                loading ? <p>Loading...</p>
                                :
                                <h1>{(ordersData.filter(items => items.status !== 'Delivered')).length}</h1>
                            }
                            <p>Pending Delivery</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;