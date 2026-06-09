import ProductComponent from "../../components/Product/ProductComponent";

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
                                    return (
                                        <ProductComponent items={items} ratings={items.ratings} key={items._id} />
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
                                    return (
                                        <ProductComponent items={items} ratings={items.ratings} key={items._id} />
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