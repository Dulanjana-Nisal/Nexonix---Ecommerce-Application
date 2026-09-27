import './AdminPage.css';
import api, { logout } from '../services/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ACTIONS } from '../context/CartReducer';
import { Cart } from '../context/CartContext';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Products/Products';
import Users from './pages/Users/Users';
import Orders from './pages/Orders/Orders';
import NotificationsPage from './pages/Notifications/Notifications';
import { Notifications } from './Context/NotificationContext';
import { Message } from '../context/MessagesContext';
import AdminSidebar from './AdminSidebar';
import AdminSectionHeader from './AdminSectionHeader';

function AdminPage() {

    //load context
    const { dispatch } = Cart() || [];
    const { notifiState } = Notifications() || {};
    const { setupMessage } = Message() || [];

    //products states
    const [productData, setProductData] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);

    //get admin data from localstorage
    const adminData = JSON.parse(localStorage.getItem('user'));

    //navigations
    const navigate = useNavigate();

    // get params value
    const { path } = useParams();

    //fetch product data
    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true)
            try {
                const [productResult, ordersResult, usersResult] = await Promise.all([
                    api.get(`/products`),
                    api.get(`/orders/all?limit=1`),
                    api.get('/users')
                ]);

                setProductData(productResult.data.all_result);
                setOrdersData(ordersResult.data.data);
                setUserData(usersResult.data.all_result);
            }
            catch (err) {
                console.log(err.response);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProductData();
    }, []);

    //refesh reducer
    const fetchCartData = async () => {
        const result = await api.get('/cart')
        dispatch({
            type: ACTIONS.SET_CART,
            payload: result.data.data[0].items
        });
        navigate('/');
    }

    return (
        <>
            <div className="admin-container">
                {/* Admin sidebar */}
                <AdminSidebar path={path} setProfileToggle={setProfileToggle} profileToggle={profileToggle} adminData={adminData} logout={logout} navigate={navigate} dispatch={dispatch} setupMessage={setupMessage} />

                <div className="sections">
                    {/* Admin section header */}
                    <AdminSectionHeader notifiState={notifiState} fetchCartData={fetchCartData} />

                    <div className="sections-body">
                        {/* <!-- Dashboard Section --> */}
                        {
                            path === 'dashboard' &&
                            <Dashboard adminData={adminData} productData={productData} ordersData={ordersData} userData={userData} loading={loading} />
                        }
                        {/* <!-- Users Section --> */}
                        {
                            path === 'users' &&
                            <Users />
                        }
                        {/* <!-- product Section --> */}
                        {
                            path === 'products' &&
                            <Products path={path} />
                        }
                        {/* <!-- Orders Section --> */}
                        {
                            path === 'orders' &&
                            <Orders path={path} />
                        }
                        {/* <!-- Notifications Section --> */}
                        {
                            path === 'notifications' &&
                            <NotificationsPage path={path} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPage