// Actions
export const ACTIONS = {
    SET_CART: 'set-cart',
    ADD_TO_CART: 'add-to-cart',
    ADD_QNT: 'add-quantity',
    MIN_QNT: 'min-quantity',
    DELETE_CART: 'delete-cart'
}

//delete items
function deleteItems(state, itemsId) {
    return state.filter(items => items.productId !== itemsId)
}

export function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_CART: return action.payload

        case ACTIONS.ADD_TO_CART:
            return [...state, action.payload]

        case ACTIONS.ADD_QNT:
            return state.map((items) =>
                items.productId === action.payload.id ? { ...items, quantity: Number(items.quantity) + 1 } : items
            )

        case ACTIONS.MIN_QNT:
            return state.map((items) =>
                items.productId === action.payload.id ? { ...items, quantity: items.quantity <= 1 ? 1 : Number(items.quantity) - 1 } : items
            )

        case ACTIONS.DELETE_CART:
            return deleteItems(state, action.payload.id)
        default:
            state
    }
}
