// Actions
export const ACTIONS = {
    SET_CART: 'set-cart',
    ADD_TO_CART: 'add-to-cart',
    UPDATE_CART: 'update-cart',
    DELETE_CART: 'delete-cart'
}

function deleteItems(state,itemsId){
    return state.filter(items => items.productId !== itemsId)
}

export function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_CART: return action.payload

        case ACTIONS.ADD_TO_CART:
            return [...state, action.payload]

        case ACTIONS.UPDATE_CART:
            return console.log('update cart')

        case ACTIONS.DELETE_CART: 
            return deleteItems(state, action.payload.id)
        default:
            state
    }
}
