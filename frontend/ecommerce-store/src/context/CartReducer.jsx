export const ACTIONS = {
   ADD_TO_CART: 'add-to-cart' ,
   UPDATE_CART: 'update-cart',
   DELETE_CART: 'delete-cart'
}

export function cartReducer(state,action){
    switch(action.type){
        case ACTIONS.ADD_TO_CART:
            return []
        case ACTIONS.UPDATE_CART: 
            return
    }
}