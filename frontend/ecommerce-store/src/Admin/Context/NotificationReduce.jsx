
// NOTIFICATION ACTIONS
// eslint-disable-next-line react-refresh/only-export-components
export const NOTIFI_ACTIONS = {
    GET_ALL_NOTIFICATIONS: 'get-all-notifications',
    CREATE_NOTIFICATION: 'create-notification',
    UPDATE_NOTIFICATION: 'update-notification',
    DELETE_NOTIFICATION: 'delete-notification',
    READ_ALL_NOTIFICATIONS: 'read-all-notifications'
}

export function NotificationReducer(state,action){
    switch(action.type){
        case NOTIFI_ACTIONS.GET_ALL_NOTIFICATIONS: return action.payload;

        case NOTIFI_ACTIONS.CREATE_NOTIFICATION: return [...state, action.payload]

        case NOTIFI_ACTIONS.UPDATE_NOTIFICATION: return state.map((items) => 
            items._id === action.payload._id ? {...items, isread: true} : items
        )

        case NOTIFI_ACTIONS.DELETE_NOTIFICATION: return state.filter(items => items._id !== action.payload._id)

        case NOTIFI_ACTIONS.READ_ALL_NOTIFICATIONS: return state.map((items)=> ({...items, isread: true}))
    }
}