import { ACTIONS } from "../context/CartReducer";
import api from "../services/auth";

// Add to cart
export const addCartItems = async (productId,name,image,quantity,price,availability,dispatch,setupMessage)=>{
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
                }
            }
        )
        setupMessage("success","Item Added to Cart ✅")
        dispatch({
            type: ACTIONS.ADD_TO_CART, 
            payload: result.data.data
        })
    }
    catch(err){
        console.log(err.response.data)
        if(err.response.data.message === "Cannot read properties of undefined (reading 'split')"){
            setupMessage("error","Please Signup or Signin!")
        }
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