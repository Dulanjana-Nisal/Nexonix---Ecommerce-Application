import { createContext, useContext, useEffect, useReducer } from "react"
import { NOTIFI_ACTIONS, NotificationReducer } from "./NotificationReducer";
import api from '../services/auth'

const NotificationContext = createContext();

export default function NotifiUserContext({children}){

    const [notifiState,notifiDispatch] = useReducer(NotificationReducer, [])

    useEffect(()=>{
        const fetchNotificationData = async()=>{ 
            try{
                const result = await api.get('/notifications/all?receiver=user')
                notifiDispatch({type: NOTIFI_ACTIONS.GET_ALL_NOTIFICATIONS, payload: result.data.data})
            }
            catch(err){
                console.log(err.response)
            }
        } 
        fetchNotificationData()  
    }, [])

    return(
        <NotificationContext.Provider value={{notifiState,notifiDispatch}} >
            {children}
        </NotificationContext.Provider>
    )
}

export function Notifications(){
    return useContext(NotificationContext)
}