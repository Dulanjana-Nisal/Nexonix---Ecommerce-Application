import { ACTIONS } from "../context/CartReducer";
import api from "../services/auth";

// Add to cart
export const addCartItems = async (productId,name,image,quantity,price,availability,dispatch)=>{
    try{
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
        console.log(result.data)
        dispatch({
            type: ACTIONS.ADD_TO_CART, 
            payload: result.data.data
        })
    }
    catch(err){
        console.log(err)
    }

}

// delete cart items
export const deleteCartItem = async (itemId,dispatch) =>{
    try{
        await api.delete(`/cart/${itemId}`)
        
        dispatch({
            type: ACTIONS.DELETE_CART,
            payload: {
                id: itemId
            }
        })
    }
    catch(err){
        console.log(err.response.data)
    }
}