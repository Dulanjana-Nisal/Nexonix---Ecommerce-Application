import { useEffect, useState } from 'react';
import './Notifications.css';
import api from '../../../services/auth'
import empty_notification from '../../../assets/empty-notifications.svg'
import { formatDistanceToNow } from 'date-fns'
import { useSearchParams } from 'react-router-dom';
import { Notifications } from '../../Context/NotificationContext';
import { NOTIFI_ACTIONS } from '../../Context/NotificationReduce';
import LoadingComponent from '../../Components/Loading/LoadingComponent';

function NotificationsPage() {

    // get context data
    const { notifiState, notifiDispatch } = Notifications() || {}

    // notification states
    const [notifications, setNotifications] = useState([])
    const [toggleDetails, setToggleDetails] = useState({ notificationId: null, toggle: false })
    const [notificationCount,setNotificationCount] = useState([])
    const [loading, setLoading] = useState(false)

    // load query data
    const [queryData, setQueryData] = useSearchParams()

    //get page number from query data
    const page = Number(queryData.get('page')) || 1

    // get notification type from query data
    const type = queryData.get('type') || ""

    // get notifications read status from query data
    const isRead = queryData.get('status') || ""

    // useEffect for notifications
    useEffect(() => {
        const fetchNotificationsData = async () => {
            setLoading(true)
            try {
                const reuslt = await api.get(`/notifications?page=${page}&type=${type}&status=${isRead}`)
                setNotifications(reuslt.data.data)
                setNotificationCount(reuslt.data.all_result)
            }
            catch (err) {
                console.log(err.response)
            }
            finally {
                setLoading(false)
            }
        }

        fetchNotificationsData()
    }, [page, type, isRead, notifiDispatch, notifiState])

    // update notifications
    const updateNotifications = async (notifiId) => {
        try {
            await api.patch(`/notifications/${notifiId}`,
                {
                    isread: true
                }
            )
            // update context
            notifiDispatch({
                type: NOTIFI_ACTIONS.UPDATE_NOTIFICATION,
                payload: { _id: notifiId }
            })
        }
        catch (err) {
            console.log(err.responce)
        }
        finally {
            setToggleDetails({})
        }
    }

    // update all notification as read
    const updateAllNotifications = () => {
        const updateAll = async (notificationID) => {
            try {
                await api.patch(`/notifications/${notificationID}`, { isread: true })
            }
            catch (err) {
                console.log(err.response)
            }
        }

        notifiState.map((items) => {
            updateAll(items._id)
        })

        // update context
        notifiDispatch({
            type: NOTIFI_ACTIONS.READ_ALL_NOTIFICATIONS
        })
    }

    // delete notifications
    const deleteNotifications = async (notifiId) => {
        try {
            await api.delete(`/notifications/${notifiId}`)

            // update context
            notifiDispatch({
                type: NOTIFI_ACTIONS.DELETE_NOTIFICATION,
                payload: { _id: notifiId }
            })
        }
        catch (err) {
            console.log(err.responce)
        }
        finally {
            setToggleDetails({})
        }
    }

    // pages buttons
    const preButton = () => {
        const newQuery = new URLSearchParams(queryData)
        if (page <= 0) {
            newQuery.set('page', 1)
        }
        newQuery.set('page', page - 1)
        setQueryData(newQuery)
        window.scroll({ top: 0, behavior: 'smooth' })
    }
    const nextButton = () => {
        const newQuery = new URLSearchParams(queryData)
        newQuery.set('page', page + 1)
        setQueryData(newQuery)
        window.scroll({ top: 0, behavior: 'smooth' })
    }

    // notifications filter by type
    const filterByType = (value) => {
        const newQuery = new URLSearchParams(queryData);
        if (!value) {
            setQueryData({})
            return
        }
        if (value === 'unread') {
            setQueryData({ 'status': false })
            return
        }
        newQuery.delete('status')
        newQuery.set('type', value)
        setQueryData(newQuery)
        window.scroll({ top: 0, behavior: 'smooth' })
    }

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
        </div>,
        'deletes': <div class="notif-icon error">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
    }
    const notificationTag = {
        "users": "badge-pill info",
        "products": "badge-pill warning",
        "orders": "badge-pill success",
        "deletes": "badge-pill error"
    }

    return (
        <>
            {/* <!-- Container --> */}
            <div class="notification-container-admin">
                {/* <!-- page body --> */}
                <div class="page-body">
                    <div class="col-main">
                        <div class="tabs">
                            <button class={`tab-btn ${!type && !isRead && 'active'}`} onClick={() => filterByType('')}>All</button>
                            <button class={`tab-btn ${isRead === 'false' && 'active'}`} onClick={() => filterByType('unread')}>
                                Unread
                                {
                                    (notifiState && notifiState.filter(items => !items.isread)).length !== 0 &&
                                    <span class="tab-badge">{(notifiState && notifiState.filter(items => !items.isread)).length}</span>
                                }
                            </button>
                            <button class={`tab-btn ${type === 'orders' && 'active'}`} onClick={() => filterByType('orders')}>Orders</button>
                            <button class={`tab-btn ${type === 'users' && 'active'}`} onClick={() => filterByType('users')}>Users</button>
                            <button class={`tab-btn ${type === 'products' && 'active'}`} onClick={() => filterByType('products')}>Products</button>
                            <button class={`tab-btn ${type === 'deletes' && 'active'}`} onClick={() => filterByType('deletes')}>Deletes</button>
                            <div class="tab-actions">
                                <button class="btn-primary refesh" onClick={() => location.reload()}>
                                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path></svg>
                                    <p>Refesh</p>
                                </button>
                                <button class="btn-primary read" onClick={() => updateAllNotifications()}>
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
                                    <div class="admin-empty-notifi-container">
                                        <div class="container-top">
                                            <img src={empty_notification} alt="emty-cart-image" />
                                        </div>
                                        <div class="container-bottom">
                                            <h1>Your Notification list is empty</h1>
                                            <p>Looks like you haven't any notifications yet.</p>
                                        </div>
                                    </div>
                                    :
                                    <div class="notif-list">

                                        {
                                            notifications.length > 0 &&
                                            notifications.map((items) => {
                                                return (
                                                    <div class="notif-item" key={items._id}>
                                                        {
                                                            items.isread ? <div class="read-dot"></div> : <div class="unread-dot"></div>
                                                        }
                                                        {
                                                            notificationThumb[items.type]
                                                        }
                                                        <div class="notif-body">
                                                            <div class="notif-title">{items.title}</div>
                                                            <div class="notif-desc">{items.message}</div>
                                                            <div class="notif-time">
                                                                {formatDistanceToNow(new Date(items.createdAt),
                                                                    {
                                                                        addSuffix: true,
                                                                    }
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div class="notif-right">
                                                            <span class={notificationTag[items.type]}>{items.type}</span>
                                                            <button class="menu-btn" onClick={() => setToggleDetails({ notificationId: items._id, toggle: !toggleDetails.toggle })}>
                                                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                                                            </button>
                                                            {
                                                                toggleDetails.toggle && toggleDetails.notificationId === items._id &&
                                                                <div class="action-box">
                                                                    <div class='read' onClick={() => updateNotifications(items._id)}>
                                                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" width="14" height="14"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                                        <p >Mark as Read</p>
                                                                    </div>
                                                                    <div class='delete' onClick={() => deleteNotifications(items._id)}>
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
                    <div class="col-aside-admin">
                        {/* <!-- Notification Summary --> */}
                        <div class="notifi-card">
                            <h3>Notification Summary</h3>
                            <div class="summary-row">
                                <div class="sr-icon all">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                                </div>
                                <span class="label">All Notifications</span>
                                <span class="count">{notifiState.length}</span>
                            </div>
                            <div class="summary-row">
                                <div class="sr-icon unread">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></svg>
                                </div>
                                <span class="label">Unread</span>
                                <span class="count">{(notifiState.filter(items => !items.isread)).length}</span>
                            </div>
                            <div class="summary-row">
                                <div class="sr-icon info2">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                                </div>
                                <span class="label">Users</span>
                                <span class="count">{(notifiState.filter(items => items.type === 'users')).length}</span>
                            </div>
                            <div class="summary-row">
                                <div class="sr-icon success2">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span class="label">Orders</span>
                                <span class="count">{(notifiState.filter(items => items.type === 'orders')).length}</span>
                            </div>
                            <div class="summary-row">
                                <div class="sr-icon warn2">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                                </div>
                                <span class="label">Products</span>
                                <span class="count">{(notifiState.filter(items => items.type === 'products')).length}</span>
                            </div>
                            <div class="summary-row">
                                <div class="sr-icon unread">
                                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <span class="label">Deletion</span>
                                <span class="count">{(notifiState.filter(items => items.type === 'deletes')).length}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* page footer */}
                <div class="page-footer">
                    <div class="box-buttons">
                        {
                            page > 1 &&
                            <button class="pre" onClick={() => preButton()}>‹</button>
                        }
                        <p><span>{1}</span> of {Math.ceil(notificationCount / 10) || 1} </p>
                        {
                            Math.ceil(notificationCount / 10) > page &&
                            <button class="next" onClick={() => nextButton()}>›</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationsPage;