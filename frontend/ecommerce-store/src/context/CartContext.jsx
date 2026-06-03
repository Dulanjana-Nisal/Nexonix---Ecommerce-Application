import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { cartReducer } from "./CartReducer"
import api from "../services/auth"


//create context
const CartContext = createContext()

export default function CartProvider({children}){

    //use states
    const [cart,setCart] = useState([])

    //use reducers
    const [state, dispatch] = useReducer(cartReducer, cart)

    //fetch cart data
    useEffect(()=>{
        const fetchCartData = async () =>{
            const result = await api.get('/cart')
            setCart(result.data.data[0].items)
        }
        fetchCartData()
    }, [])
    console.log(cart)

    return (
        <CartContext.Provider value={{state,dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export function Cart(){
    return useContext(CartContext)
}