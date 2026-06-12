import './Dashboard.css';

function Dashboard({adminData,productData}) {
    return (
        <>
            <div class="dashboard-section">
                <div class="dashboard-header">
                    <p>Welcome back, <span>{adminData.name} 👋</span></p>
                </div>
                <div class="dashboard-body">
                    <div class="user-count box">
                        <i class="fa-regular fa-user"></i>
                        <div class="details">
                            <h1>3</h1>
                            <p>Total Customers</p>
                        </div>
                    </div>
                    <div class="product-count box">
                        <i class="fa-solid fa-box-archive"></i>
                        <div class="details">
                            <h1>{productData}</h1>
                            <p>Total Products</p>
                        </div>
                    </div>
                    <div class="order-count box">
                        <i class="fa-solid fa-cube"></i>
                        <div class="details">
                            <h1>0</h1>
                            <p>Total Orders</p>
                        </div>
                    </div>
                    <div class="order-status box">
                        <i class="fa-solid fa-clock"></i>
                        <div class="details">
                            <h1>3</h1>
                            <p>Pending Delivery</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;