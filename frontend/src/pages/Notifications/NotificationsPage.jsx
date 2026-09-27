import { useEffect, useState } from 'react';
import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './NotificationsPage.css';
import { useSearchParams } from 'react-router-dom';
import api from '../../services/auth';
import { NOTIFI_ACTIONS } from '../../context/NotificationReducer';
import { Notifications } from '../../context/NotificationContext';
import NotificationPageHeader from './NotificationsPageHeader';
import NotificationsPageBody from './NotificationPageBody';
import NotificationPageFooter from './NotificationPageFooter';

function NotificationsPage() {

    // get data from context
    const { notifiState, notifiDispatch } = Notifications();

    // notification states
    const [notifications, setNotifications] = useState([])
    const [toggleDetails, setToggleDetails] = useState({ notificationId: null, toggle: false })
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
                const reuslt = await api.get(`/notifications?page=${page}&type=${type}&status=${isRead}&receiver=user`)
                setNotifications(reuslt.data.data)
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
        "products": <div className="notif-icon warning">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>,
        "orders": <div className="notif-icon success">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
    }
    const notificationTag = {
        "orders": "badge-pill success",
        "products": "badge-pill warning"
    }

    return (
        <>
            <HeaderComponent />
            {/* <!-- Container --> */}
            <div className="notification-main-container">
                {/* notification page header */}
                <NotificationPageHeader />
                
                <div className="notification-container">
                    {/* <!-- page body --> */}
                    <NotificationsPageBody type={type} isRead={isRead} filterByType={filterByType} notifiState={notifiState} updateAllNotifications={updateAllNotifications} loading={loading} notifications={notifications} notificationThumb={notificationThumb} notificationTag={notificationTag} setToggleDetails={setToggleDetails} toggleDetails={toggleDetails} updateNotifications={updateNotifications} deleteNotifications={deleteNotifications} />
                    
                    {/* page footer */}
                    <NotificationPageFooter page={page} preButton={preButton} notifiState={notifiState} nextButton={nextButton} />
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default NotificationsPage;