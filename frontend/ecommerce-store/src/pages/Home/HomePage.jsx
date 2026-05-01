import FooterCompoennt from '../../components/Footer/FooterComponent';
import HeaderComponent from '../../components/Header/HeaderComponent';
import delivery_thumb from '../../assets/delevery-thumb.png';
import payment_thumb from '../../assets/payment-thumb.png';
import products_thumb from '../../assets/products-thumb.png';
import not_found_image from '../../assets/image-not-found.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './HomePage.css';

function HomePage() {

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
                <div class="banner">
                    <div class="banner-info">
                        <h1>Alienware Aurora R15 Gaming Desktop</h1>
                        <p>The Alienware Aurora R15 is a high-performance gaming desktop with an Intel Core i9 processor, NVIDIA
                            RTX 4090 graphics, and tool-less chassis for easy upgrades.</p>
                        <button>Shop Now</button>
                    </div>
                </div>
                {/* <!-- Info --> */}
                <div class="info">
                    <div class="info-box">
                        <div class="box-img">
                            <img src={delivery_thumb} alt="info-thumb" />
                        </div>
                        <div class="box-data">
                            <h4>Fast Delivery</h4>
                            <p>Deliver in 24 Hours max!</p>
                        </div>
                    </div>
                    <div class="info-box">
                        <div class="box-img">
                            <img src={payment_thumb} alt="info-thumb" />
                        </div>
                        <div class="box-data">
                            <h4>Safe Payment</h4>
                            <p>100% Secure Payment</p>
                        </div>
                    </div>
                    <div class="info-box">
                        <div class="box-img">
                            <img src={products_thumb} alt="info-thumb" />
                        </div>
                        <div class="box-data">
                            <h4>Best Products</h4>
                            <p>Selling Top Rated Products</p>
                        </div>
                    </div>
                </div>
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
                                        <div class="template-box" key={items.id}>
                                            <div class="box-head">
                                                <img src={not_found_image} alt="product-img" />
                                            </div>
                                            <div class="box-body">
                                                <div class="name">
                                                    <p>{items.name}</p>
                                                </div>
                                                <div class="ratings">                                                    
                                                    {ratings}<span>( 50 )</span>
                                                </div>
                                                <div class="price">
                                                    <p>${items.price}</p>
                                                    <div class="availability">
                                                        <p class={items.availability ? "in-stock" : "out-stock"}>{items.availability ? "In Stock" : "Out Stock"}</p>
                                                    </div>
                                                </div>
                                                <div class="button">
                                                    <button>Add To Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* <!-- category Section --> */}
                <div class="laptop-section">
                    <div class="section-grid">
                        {/* <!-- laptops --> */}
                        <div class="grid-box">
                            <div class="box-header">
                                <p>Laptops</p>
                                <button>View More ▸</button>
                            </div>
                            <div class="box-banner laptops">
                                <div class="banner-details">
                                    <div class="name">
                                        <p>Macbook M1</p>
                                        <h1>Llaptop Macbook M1</h1>
                                    </div>
                                    <div class="price">
                                        <p>Just from: </p>
                                        <h1>$123.43</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="box-card-row">
                                {
                                    laptopProducts.map((items)=>{
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
                                            <div class="card" key={items.id}>
                                                <div class="box-head">
                                                    <img src={not_found_image} alt="product-img" />
                                                </div>
                                                <div class="box-body">
                                                    <div class="name">
                                                        <p>{items.name}</p>
                                                    </div>
                                                    <div class="ratings">
                                                        {ratings}<span>( 50 )</span>
                                                    </div>
                                                    <div class="price">
                                                        <p>{items.price}</p>
                                                        <div class="availability">
                                                            <p class={items.availability ? "in-stock" : "out-stock"}>{items.availability ? "In Stock" : "Out Stock"}</p>
                                                        </div>
                                                    </div>
                                                    <div class="button">
                                                        <button>Add To Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div class="btns">
                                    <button class="left">‹</button>
                                    <button class="right">›</button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- computers --> */}
                        <div class="grid-box">
                            <div class="box-header">
                                <p>Computers</p>
                                <button>View More ▸</button>
                            </div>
                            <div class="box-banner computers">
                                <div class="banner-details">
                                    <div class="name">
                                        <p>Gaming Desktop</p>
                                        <h1>Alienware Aurora R15</h1>
                                    </div>
                                    <div class="price">
                                        <p>Just from: </p>
                                        <h1>$2499.99</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="box-card-row">
                                {
                                    computerProducts.map((items)=>{
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
                                            <div class="card" key={items.id}>
                                                <div class="box-head">
                                                    <img src={not_found_image} alt="product-img" />
                                                </div>
                                                <div class="box-body">
                                                    <div class="name">
                                                        <p>{items.name}</p>
                                                    </div>
                                                    <div class="ratings">
                                                        {ratings}<span>( 50 )</span>
                                                    </div>
                                                    <div class="price">
                                                        <p>{items.price}</p>
                                                        <div class="availability">
                                                            <p class={items.availability ? "in-stock" : "out-stock"}>{items.availability ? "In Stock" : "Out Stock"}</p>
                                                        </div>
                                                    </div>
                                                    <div class="button">
                                                        <button>Add To Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div class="btns">
                                    <button class="left">‹</button>
                                    <button class="right">›</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!---------------- footer ----------------> */}
            <FooterCompoennt />
        </>
    )
}

export default HomePage