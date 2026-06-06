import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './HomePage.css';
import ProductComponent from '../../components/Product/ProductComponent';
import { Cart } from '../../context/CartContext';
import Banner from './Banner';
import Info from './Info';
import Sections from './Sections';

function HomePage() {

    //use context
    const {state,dispatch} = Cart();

    //home page states
    const [bestChoiceProduct,setBestChoiceProduct] = useState([]);
    const [laptopProducts,setLaptopProducts] = useState([]);
    const [computerProducts,setComputerProducts] = useState([]);

    useEffect(()=>{
        //fetch Best Choice Products
        const fetchBestChoiceProducts = async()=>{
            const result = await axios.get('http://localhost:5000/api/v1/products?page=1')
            setBestChoiceProduct(result.data.data)
        }
        //fetch Laptops Products
        const fetchLaptopsProducts = async()=>{
            const result = await axios.get('http://localhost:5000/api/v1/products?limit=5&category=laptops')
            setLaptopProducts(result.data.data)
        }
        //fetch Computer Products
        const fetchComputerProducts = async()=>{
            const result = await axios.get('http://localhost:5000/api/v1/products?limit=5&category=computers')
            setComputerProducts(result.data.data)
        }
        fetchBestChoiceProducts();
        fetchLaptopsProducts();
        fetchComputerProducts();
    }, [])

    return (
        <>
            {/* <!---------------- Header ----------------> */}
            <HeaderComponent />
            {/* ---------------- container ---------------- */}
            <div class="container">
                {/* <!-- Banner --> */}
                <Banner />
                {/* <!-- Info --> */}
                <Info />
                {/* <!-- best choice Section --> */}
                <div class="best-choice">
                    <div class="best-choice-head">
                        <h1>Best Choice</h1>
                    </div>
                    <div class="best-choice-body">
                        <div class="body-template">
                            {
                                bestChoiceProduct.map((items)=>{
                                    let ratings;
                                    if(items.ratings === 5){
                                        ratings = <p class="five-star">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                    }if(items.ratings === 4){
                                        ratings = <p class="five-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                    }if(items.ratings === 3){
                                        ratings = <p class="five-star">&#9733; &#9733; &#9733; &#9734; &#9734;</p>
                                    }if(items.ratings === 2){
                                        ratings = <p class="five-star">&#9733; &#9733; &#9734; &#9734; &#9734;</p>
                                    }if(items.ratings === 1){
                                        ratings = <p class="five-star">&#9733; &#9734; &#9734; &#9734; &#9734;</p>
                                    }
                                    return(
                                        <ProductComponent items={items} ratings={ratings} state={state} dispatch={dispatch} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* <!-- category Section --> */}
                <Sections laptopProducts={laptopProducts} computerProducts={computerProducts} />
            </div>
            {/* <!---------------- footer ----------------> */}
            <FooterCompoennt />
        </>
    )
}

export default HomePage