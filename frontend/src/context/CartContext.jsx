import { createContext, useContext, useEffect, useReducer } from "react"
import { ACTIONS, cartReducer } from "./CartReducer"
import api from "../services/auth"


//create context
const CartContext = createContext()

export default function CartProvider({ children }) {

    //use reducers
    const [state, dispatch] = useReducer(cartReducer, [])

    //load user
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    //fetch cart data
    useEffect(() => {
        const fetchCartData = async () => {
            const result = await api.get('/cart')
            dispatch({
                type: ACTIONS.SET_CART,
                payload: result.data.data[0].items
            })
        }
        fetchCartData()
    }, [])

    return (
        <CartContext.Provider value={{ state, dispatch, user }}>
            {children}
        </CartContext.Provider>
    )
}

export function Cart() {
    return useContext(CartContext)
}