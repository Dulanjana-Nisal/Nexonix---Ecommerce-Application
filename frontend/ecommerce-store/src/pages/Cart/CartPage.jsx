import { useEffect, useState } from 'react';
import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import './CartPage.css';
import {Link} from 'react-router-dom'
import api from '../../services/auth';
import { Cart } from '../../context/CartContext';

function CartPage() {    
    //use States
    const [selectItmes,setSelectItems] = useState([])
    const [subtotal,setSubtotal] = useState(0)

    // use context 
    const {fetchCartData,setCartData,cartData} = Cart()

    useEffect(()=>{
        fetchCartData()
    }, [setCartData])
    
    //delete cart item 
    const deleteCartItem = async (itemId) =>{
        try{
            await api.delete(`/cart/${itemId}`)
            location.reload()
        }
        catch(err){
            console.log(err.response.data)
        }
    }

    // Min Quantity
    function minQnt(itemId,itemQnt){
        let total = itemQnt - 1
        setCartData(
            cartData.length > 0 && 
            cartData.map((items)=>
                items._id === itemId ? {...items, quantity: total < 1 ? 1 : total} : items
            )
        )  
    }
    // Add Quantity
    function addQnt(itemId,itemQnt){
        let total = itemQnt + 1
        setCartData(
            cartData.length > 0 && 
            cartData.map((items)=>
                items._id === itemId ? {...items, quantity: total} : items
            )
        )
    }

    //geting subtotal in cart item ( subtotal = sum( price*quantity ) )
    useEffect(()=>{
        cartData.length > 0 && 
        cartData.map((items)=>{
            selectItmes.find(findOne => findOne.itemId === items.productId) ?
                setSelectItems(prev=>
                    prev.map(item => 
                        item.itemId === items.productId ?
                            {...item, subtotal: Number((items.price * items.quantity).toFixed(2))}
                        :
                            item
                    )
                )
            :
            setSelectItems((prev)=>[
                ...prev,
                {
                    itemId: items.productId,
                    checked: items.availability ? true : false,
                    subtotal: Number((items.price * items.quantity).toFixed(2))
                }
            ])
        })


    }, [cartData])

    // calculate subtotal 
    useEffect(()=>{
        let total = 0
        cartData.length > 0 && 
        selectItmes.map((items)=>{
            if(items.checked){
                total = total + items.subtotal
                setSubtotal(total)
            }
        })
    }, [selectItmes])

    // select and deselect items
    function itemSelection(e){
        selectItmes.find(findItem => findItem.itemId === e.target.id) ?
            setSelectItems(prev => 
                prev.map(item => 
                    item.itemId === e.target.id ?
                        {...item, checked: e.target.checked}
                    : 
                        item
                )
            )
        :
            setSelectItems(selectItmes)
    }
    return (
        <>
            <HeaderComponent />
            {/* <!---------------- container ----------------> */}
            <div class="cart-container">
                <div class="cart-header">
                    <div class="header-content">
                        <h1>Chopping Cart</h1>
                        <p><span><Link to="/" style={{textDecoration: "none", color: "#8f9293"}}>Home</Link> /</span> Shopping Cart</p>
                    </div>
                </div>
                <div class="cart-body">
                    <div class="cart-details">
                        {
                            cartData.length > 0 &&
                            <div class="details-head">
                                <p class="product">Product</p>
                                <p class="price">Price</p>
                                <p class="quantity">Quantity</p>
                                <p class="subtotal">Subtotal</p>
                                <p></p>
                            </div>
                        }
                        <div class="details-cards">
                            {
                                cartData.length > 0 &&
                                [...cartData].reverse().map((items)=>{
                                    return(
                                        <div class={items.availability ? "card" : "card disabel-card"} key={items._id}>
                                            <div class="card-product product">
                                                <div class="thumb">
                                                    <input type="checkbox" id={items.productId} onClick={itemSelection} defaultChecked={items.availability ? true : false}/>
                                                    <img src={items.image} alt="" />
                                                </div>
                                                <div class="name">
                                                    <p>{items.name}</p>
                                                </div>
                                            </div>
                                            <div class="card-price price">
                                                <p>${items.price}</p>
                                            </div>
                                            <div class="card-quantity quantity">
                                                <button class="plus" onClick={() => minQnt(items._id,items.quantity)}>−</button>
                                                <p>{items.quantity}</p>
                                                <button class="min" onClick={() => addQnt(items._id,items.quantity)}>+</button>
                                            </div>
                                            <div class="card-subtotal subtotal">
                                                <p>${(items.price * Number(items.quantity)).toFixed(2)}</p>
                                            </div>
                                            <button class="delete" onClick={() => deleteCartItem(items.productId)}>✕</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div class="cart-details-responsive">
                        {
                            cartData.length > 0 &&
                            [...cartData].reverse().map((items)=>{
                                return(
                                    <div class={items.availability ? "card" : "card disabel-card"}>
                                        <div class="image">
                                            <input type="checkbox" defaultChecked={true} />
                                            <img src={items.image} alt="" />
                                        </div>
                                        <div class="card-details">
                                            <div class="name">
                                                <h1>{items.name}</h1>
                                                <button onClick={() => deleteCartItem(items.productId)}>✕</button>
                                            </div>
                                            <div class="price">
                                                <p>Price: </p>
                                                <h3>${items.price}</h3>
                                            </div>
                                            <div class="quantity">
                                                <div class="quentity-header">
                                                    <p>Quantity: </p>
                                                </div>
                                                <div class="quentity-body">
                                                    <button class="plus" onClick={() => minQnt(items._id,items.quantity)}>−</button>
                                                <p>{items.quantity}</p>
                                                <button class="min" onClick={() => addQnt(items._id,items.quantity)}>+</button>
                                                </div>
                                            </div>
                                            <div class="subtotal">
                                                <p>Subtotal: </p>
                                                <h3>${(items.price * Number(items.quantity)).toFixed(2)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        cartData.length > 0 &&
                        <div class="total-card">
                            <div class="total-head">
                                <h1>Cart Totals</h1>
                            </div>
                            <div class="total-subtotal info">
                                <h3>Subtotal</h3>
                                <p>${subtotal}</p>
                            </div>
                            <div class="total-shipping info">
                                <h3>Shipping</h3>
                                <p>$20.00</p>
                            </div>
                            <div class="total-total info">
                                <h3>Total</h3>
                                <p><span>${Number(subtotal) + 20}</span></p>
                            </div>
                            <button>Proceed To Checkout</button>
                        </div>
                    }
                </div>
            </div>
            <FooterCompoennt />
        </>
    )
}

export default CartPage;