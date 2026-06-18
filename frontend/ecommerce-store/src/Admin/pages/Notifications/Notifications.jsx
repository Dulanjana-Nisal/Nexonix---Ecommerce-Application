import { useEffect, useState } from 'react';
import './Notifications.css';
import api from '../../../services/auth'

function Notifications() {

    // notification states
    const [notifications, setNotifications] = useState([])

    //useEffect for notifications
    useEffect(() => {
        const fetchNotificationsData = async () => {
            const reuslt = await api.get(`/notifications`)
            setNotifications(reuslt.data.data)
        }
        fetchNotificationsData()
    }, [])

    console.log(notifications)

    // set notification UI
    const notificationThumb = {
        "users": <div class="notif-icon info">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                </div>,
        "products": <div class="notif-icon warning">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>,
        "orders": <div class="notif-icon success">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
    }
    const notificationTag = {
        "users": "badge-pill info",
        "products": "badge-pill warning",
        "orders": "badge-pill success"
    }

    return (
        <>
            {/* <!-- Container --> */}
            <div class="notification-container">
                {/* <!-- page body --> */}
                <div class="page-body">
                    <div class="col-main">
                        <div class="tabs">
                            <button class="tab-btn active">All</button>
                            <button class="tab-btn">Unread <span class="tab-badge">5</span></button>
                            <button class="tab-btn">Orders</button>
                            <button class="tab-btn">Users</button>
                            <button class="tab-btn">Products</button>
                            <div class="tab-actions">
                                <button class="btn-primary">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    Mark all as read
                                </button>
                            </div>
                        </div>
                        <div class="notif-list">

                            {
                                notifications.length > 0 &&
                                notifications.map((items) => {
                                    return (
                                        <div class="notif-item" key={items._id}>
                                            {
                                                !items.isRead &&
                                                <div class="unread-dot"></div>
                                            }
                                            {
                                                notificationThumb[items.type]
                                            }
                                            <div class="notif-body">
                                                <div class="notif-title">{items.title}</div>
                                                <div class="notif-desc">{items.message}</div>
                                                <div class="notif-time">2 minutes ago</div>
                                            </div>
                                            <div class="notif-right">
                                                <span class={notificationTag[items.type]}>{items.type}</span>
                                                <button class="menu-btn">
                                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                                                </button>
                                                <div class="actions-box" style={{ display: 'none' }}>
                                                    <div class='read'>
                                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                        <p >Mark as Read</p>
                                                    </div>
                                                    <div class='delete'>
                                                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15" stroke-linecap="round"></line><line x1="9" y1="9" x2="15" y2="15" stroke-linecap="round"></line></svg>
                                                        <p>Delete Notification</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {/* <div class="notif-item">
                                <div class="unread-dot"></div>
                                <div class="notif-icon success">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <div class="notif-body">
                                    <div class="notif-title">New order received</div>
                                    <div class="notif-desc">Order #12564 has been placed by Mike Smith.</div>
                                    <div class="notif-time">15 minutes ago</div>
                                </div>
                                <div class="notif-right">
                                    <span class="badge-pill success">Orders</span>
                                    <button class="menu-btn">
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                                    </button>
                                </div>
                            </div>


                            <div class="notif-item">
                                <div class="unread-dot"></div>
                                <div class="notif-icon warning">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div class="notif-body">
                                    <div class="notif-title">Low stock alert</div>
                                    <div class="notif-desc">Product "Wireless Headphones" is running low on stock.</div>
                                    <div class="notif-time">1 hour ago</div>
                                </div>
                                <div class="notif-right">
                                    <span class="badge-pill warning">Products</span>
                                    <button class="menu-btn">
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                                    </button>
                                </div>
                            </div>


                            <div class="notif-item">
                                <div class="unread-dot"></div>
                                <div class="notif-icon info">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                                </div>
                                <div class="notif-body">
                                    <div class="notif-title">New user registered</div>
                                    <div class="notif-desc">A new user "Sarah Johnson" has registered.</div>
                                    <div class="notif-time">2 minutes ago</div>
                                </div>
                                <div class="notif-right">
                                    <span class="badge-pill info">Users</span>
                                    <button class="menu-btn">
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                                    </button>
                                </div>
                            </div>


                            <div class="notif-item">
                                <div class="unread-dot"></div>
                                <div class="notif-icon success">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <div class="notif-body">
                                    <div class="notif-title">New order received</div>
                                    <div class="notif-desc">Order #12564 has been placed by Mike Smith.</div>
                                    <div class="notif-time">15 minutes ago</div>
                                </div>
                                <div class="notif-right">
                                    <span class="badge-pill success">Orders</span>
                                    <button class="menu-btn">
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                                    </button>
                                </div>
                            </div>


                            <div class="notif-item">
                                <div class="unread-dot"></div>
                                <div class="notif-icon warning">
                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <div class="notif-body">
                                    <div class="notif-title">Low stock alert</div>
                                    <div class="notif-desc">Product "Wireless Headphones" is running low on stock.</div>
                                    <div class="notif-time">1 hour ago</div>
                                </div>
                                <div class="notif-right">
                                    <span class="badge-pill warning">Products</span>
                                    <button class="menu-btn">
                                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                                    </button>
                                </div>
                            </div> */}

                        </div>
                    </div>
                    <div class="col-aside">
                        {/* <!-- Notification Summary --> */}
                        <div class="card">
                            <h3>Notification Summary</h3>
                            <div class="summary-row">
                                <div class="sr-icon all">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                                </div>
                                <span class="label">All Notifications</span>
                                <span class="count">25</span>
                            </div>
                            <div class="summary-row">
                                <div class="sr-icon unread">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></svg>
                                </div>
                                <span class="label">Unread</span>
                                <span class="count">5</span>
                            </div>
                            <div class="summary-row">
                                <div class="sr-icon info2">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                                </div>
                                <span class="label">Users</span>
                                <span class="count">8</span>
                            </div>
                            <div class="summary-row">
                                <div class="sr-icon success2">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span class="label">Orders</span>
                                <span class="count">7</span>
                            </div>
                            <div class="summary-row">
                                <div class="sr-icon warn2">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                                </div>
                                <span class="label">Products</span>
                                <span class="count">6</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* page footer */}
                <div class="page-footer">
                    <div class="box-buttons">
                        <button class="pre">‹</button>
                        <p><span>{1}</span> of 2 </p>
                        <button class="next">›</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notifications;