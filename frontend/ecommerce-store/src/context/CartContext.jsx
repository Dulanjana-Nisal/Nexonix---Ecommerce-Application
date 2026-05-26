import { createContext, useContext, useEffect, useState } from "react"
import api from "../services/auth";

const CartContext = createContext();

export function CartProvider({ children }) {

    //use state
    const [cartData, setCartData] = useState([])
    const [cartCounte, setCartCount] = useState(0)

    // fetch cart items data
    const fetchCartData = async () => {
        try {
            const result = await api.get('/cart');
            setCartData(result.data.data[0].items);
        }
        catch (err) {
            setCartData(err.response.data)
        } 
    }

    // add items in to cart
    const addCartItems = async (productId, name, image, quantity, price, availability) => {
        try {
            await api.post('/cart',
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
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(()=>{
        let total = 0
        cartData.length > 0 && 
        cartData.map((items)=>{
            total = Number(total) + Number(items.quantity)
            setCartCount(total)
        })
    }, [cartData])

    return (
        <CartContext.Provider value={{ cartData, cartCounte,setCartData,fetchCartData, addCartItems }}>
            {children}
        </CartContext.Provider>
    )
}

export function Cart(){
    return useContext(CartContext)
}