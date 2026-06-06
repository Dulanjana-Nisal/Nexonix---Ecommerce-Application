import { Link } from "react-router-dom";

function Sections({laptopProducts,computerProducts}) {
    return (
        <>
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
                                laptopProducts.map((items) => {
                                    let ratings;
                                    if (items.ratings === 5) {
                                        ratings = <p class="five-star">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                    } if (items.ratings === 4) {
                                        ratings = <p class="five-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                    } if (items.ratings === 3) {
                                        ratings = <p class="five-star">&#9733; &#9733; &#9733; &#9734; &#9734;</p>
                                    } if (items.ratings === 2) {
                                        ratings = <p class="five-star">&#9733; &#9733; &#9734; &#9734; &#9734;</p>
                                    } if (items.ratings === 1) {
                                        ratings = <p class="five-star">&#9733; &#9734; &#9734; &#9734; &#9734;</p>
                                    }
                                    return (
                                        <div class="card" key={items._id}>
                                            <Link to={`/details/${items._id}`} style={{ textDecoration: "none" }}>
                                                <div class="box-head">
                                                    <img src={items.image} alt="product-img" />
                                                </div>
                                            </Link>
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
                                computerProducts.map((items) => {
                                    let ratings;
                                    if (items.ratings === 5) {
                                        ratings = <p class="five-star">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                    } if (items.ratings === 4) {
                                        ratings = <p class="five-star">&#9733; &#9733; &#9733; &#9733; &#9734;</p>
                                    } if (items.ratings === 3) {
                                        ratings = <p class="five-star">&#9733; &#9733; &#9733; &#9734; &#9734;</p>
                                    } if (items.ratings === 2) {
                                        ratings = <p class="five-star">&#9733; &#9733; &#9734; &#9734; &#9734;</p>
                                    } if (items.ratings === 1) {
                                        ratings = <p class="five-star">&#9733; &#9734; &#9734; &#9734; &#9734;</p>
                                    }
                                    return (
                                        <div class="card" key={items._id}>
                                            <Link to={`/details/${items._id}`} style={{ textDecoration: "none" }}>
                                                <div class="box-head">
                                                    <img src={items.image} alt="product-img" />
                                                </div>
                                            </Link>
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
        </>
    )
}

export default Sections;