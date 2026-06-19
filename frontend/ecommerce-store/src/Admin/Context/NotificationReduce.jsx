
// NOTIFICATION ACTIONS
// eslint-disable-next-line react-refresh/only-export-components
export const NOTIFI_ACTIONS = {
    GET_ALL_NOTIFICATIONS: 'get-all-notifications',
}

export function NotificationReducer(state,action){
    switch(action.type){
        case NOTIFI_ACTIONS.GET_ALL_NOTIFICATIONS: return action.payload
    }
}