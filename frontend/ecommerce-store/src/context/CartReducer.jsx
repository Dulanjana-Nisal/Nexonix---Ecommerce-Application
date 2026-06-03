import api from "../services/auth"

export const ACTIONS = {
    ADD_TO_CART: 'add-to-cart',
    UPDATE_CART: 'update-cart',
    DELETE_CART: 'delete-cart'
}

const addCartItems = async (productId, name, image, quantity, price, availability) => {
    try {
        const result = await api.post('/cart',
            {
                "items": {
                    "productId": productId,
                    "name": name,
                    "image": image,
                    "quantity": quantity,
                    "price": price,
                    "availability": availability
                },
                "totle_items": 1
            }
        )
        console.log(result)
    }
    catch (err) {
        console.log(err)
    }

}

export function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART:
            return addCartItems(
                action.playload.id,
                action.playload.name,
                action.playload.image,
                action.playload.quantity,
                action.playload.price,
                action.playload.availability,
            )
            
        case ACTIONS.UPDATE_CART:
            return console.log('update cart')

        case ACTIONS.DELETE_CART: {
            const itemId = action.playload.id
            const findItem = state.filter(items => items._id !== itemId)
            findItem ? findItem : state
        }
    }
}