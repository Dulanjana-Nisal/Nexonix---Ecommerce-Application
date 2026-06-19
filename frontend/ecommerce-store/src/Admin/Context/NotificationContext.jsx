import { createContext, useContext, useEffect, useReducer } from "react"
import { NOTIFI_ACTIONS, NotificationReducer } from "./NotificationReduce";
import api from '../../services/auth'

const NotificationContext = createContext();

export default function NotifiContext({children}){

    const [state,dispatch] = useReducer(NotificationReducer, [])

    useEffect(()=>{
        const fetchNotificationData = async()=>{ 
            try{
                const result = await api.get('/notifications')
                dispatch({type: NOTIFI_ACTIONS.GET_ALL_NOTIFICATIONS, payload: result.data.data})
            }
            catch(err){
                console.log(err.response)
            }
        }
        fetchNotificationData()
    }, [])

    return(
        <NotificationContext.Provider value={{state}} >
            {children}
        </NotificationContext.Provider>
    )
}

export function Notifications(){
    return useContext(NotificationContext)
}