import LoadingComponent from "../../Components/Loading/LoadingComponent";
import empty_notification from '../../../assets/empty-notifications.svg';
import { formatDistanceToNow } from 'date-fns'

function NotificationMainContainer({ type, isRead, filterByType, notifiState, updateAllNotifications, loading, notifications, notificationThumb, notificationTag, setToggleDetails, toggleDetails, updateNotifications, deleteNotifications }) {
    return (
        <div className="col-main">
            <div className="tabs">
                <button className={`tab-btn ${!type && !isRead && 'active'}`} onClick={() => filterByType('')}>All</button>
                <button className={`tab-btn ${isRead === 'false' && 'active'}`} onClick={() => filterByType('unread')}>
                    Unread
                    {
                        (notifiState && notifiState.filter(items => !items.isread)).length !== 0 &&
                        <span className="tab-badge">{(notifiState && notifiState.filter(items => !items.isread)).length}</span>
                    }
                </button>
                <button className={`tab-btn ${type === 'orders' && 'active'}`} onClick={() => filterByType('orders')}>Orders</button>
                <button className={`tab-btn ${type === 'users' && 'active'}`} onClick={() => filterByType('users')}>Users</button>
                <button className={`tab-btn ${type === 'products' && 'active'}`} onClick={() => filterByType('products')}>Products</button>
                <button className={`tab-btn ${type === 'deletes' && 'active'}`} onClick={() => filterByType('deletes')}>Deletes</button>
                <div className="tab-actions">
                    <button className="btn-primary refesh" onClick={() => location.reload()}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path></svg>
                        <p>Refesh</p>
                    </button>
                    <button className="btn-primary read" onClick={() => updateAllNotifications()}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                        <p>Mark all as read</p>
                    </button>
                </div>
            </div>
            {
                loading ?
                    <LoadingComponent />
                    :
                    notifications.length === 0 ?
                        <div className="admin-empty-notifi-container">
                            <div className="container-top">
                                <img src={empty_notification} alt="emty-cart-image" />
                            </div>
                            <div className="container-bottom">
                                <h1>Your Notification list is empty</h1>
                                <p>Looks like you haven't any notifications yet.</p>
                            </div>
                        </div>
                        :
                        <div className="notif-list">

                            {
                                notifications.length > 0 &&
                                notifications.map((items) => {
                                    return (
                                        <div className="notif-item" key={items._id}>
                                            {
                                                items.isread ? <div className="read-dot"></div> : <div className="unread-dot"></div>
                                            }
                                            {
                                                notificationThumb[items.type]
                                            }
                                            <div className="notif-body">
                                                <div className="notif-title">{items.title}</div>
                                                <div className="notif-desc">{items.message}</div>
                                                <div className="notif-time">
                                                    {formatDistanceToNow(new Date(items.createdAt),
                                                        {
                                                            addSuffix: true,
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                            <div className="notif-right">
                                                <span className={notificationTag[items.type]}>{items.type}</span>
                                                <button className="menu-btn" onClick={() => setToggleDetails({ notificationId: items._id, toggle: !toggleDetails.toggle })}>
                                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                                                </button>
                                                {
                                                    toggleDetails.toggle && toggleDetails.notificationId === items._id &&
                                                    <div className="action-box">
                                                        <div className='read' onClick={() => updateNotifications(items._id)}>
                                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                            <p >Mark as Read</p>
                                                        </div>
                                                        <div className='delete' onClick={() => deleteNotifications(items._id)}>
                                                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15" stroke-linecap="round"></line><line x1="9" y1="9" x2="15" y2="15" stroke-linecap="round"></line></svg>
                                                            <p>Delete Notification</p>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
            }
        </div>
    )
}

export default NotificationMainContainer;