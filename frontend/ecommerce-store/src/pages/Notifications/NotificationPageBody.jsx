import LoadingComponent from "../../components/Loading/LoadingComponent";
import { formatDistanceToNow } from 'date-fns';
import empty_notificataios from '../../assets/empty-notifications.svg';

function NotificationsPageBody({type,isRead,filterByType,notifiState,updateAllNotifications,loading,notifications,notificationThumb,notificationTag,setToggleDetails,toggleDetails,updateNotifications,deleteNotifications}) {
    return (
        <div className="page-body">
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
                    <div className="tab-actions">
                        <button className="btn-primary refesh" onClick={() => location.reload()}>
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path></svg>
                            <p>Refesh</p>
                        </button>
                        <button className="btn-primary read" onClick={() => updateAllNotifications()}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                            Mark all as read
                        </button>
                    </div>
                </div>
                {
                    loading ?
                        <LoadingComponent />
                        :
                        notifications.length === 0 ?
                            <div className="empty-notifi-container">
                                <div className="container-top">
                                    <img src={empty_notificataios} alt="emty-cart-image" />
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
                                                                <svg className="delete" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                                                <p>Delete</p>
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
            <div className="col-aside">
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
                        <div className="sr-icon success2">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="label">Orders</span>
                        <span className="count">{(notifiState.filter(items => items.type === 'orders')).length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationsPageBody;