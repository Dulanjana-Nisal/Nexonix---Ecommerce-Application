import api from "../services/auth";

export const addCartItems = async (productId,name,image,quantity,price,availability)=>{
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
        console.log(result)
    }
    catch(err){
        console.log(err)
    }

}