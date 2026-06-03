import api from "../services/auth"

export const ACTIONS = {
    SET_CART: 'set-cart',
    ADD_TO_CART: 'add-to-cart',
    UPDATE_CART: 'update-cart',
    DELETE_CART: 'delete-cart'
}

//delete cart item 
const deleteCartItem = async (itemId) =>{
    try{
        await api.delete(`/cart/${itemId}`)
    }
    catch(err){
        console.log(err.response.data)
    }
}

export function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_CART: return action.payload

        case ACTIONS.ADD_TO_CART:
            return [...state, action.payload]

        case ACTIONS.UPDATE_CART:
            return console.log('update cart')

        case ACTIONS.DELETE_CART: 
            return deleteCartItem(action.payload.id)
        default:
            state
    }
}