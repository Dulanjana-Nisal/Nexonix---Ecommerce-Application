import ProductComponent from "../../components/Product/ProductComponent";

function DetailsSuggetionsContainer({productRecomendation,scrollWidth,scrollToLeft,scrollToRight}) {
    return (
        <div class="container-suggetions">
            {/* <!-- suggetions --> */}
            <div class="suggetions-header">
                <p>Related Products</p>
            </div>
            <div class="suggetions-card-row">
                {
                    productRecomendation.map((items) => {
                        return (
                            <div class="suggetions-card" style={{ transform: `translateX(${scrollWidth}px)` }}>
                                <ProductComponent items={items} ratings={items.ratings} key={items._id} />
                            </div>
                        )
                    })
                }
                <div class="btns">
                    {
                        scrollWidth !== 0 &&
                        <button class="left" onClick={() => scrollToLeft()}>‹</button>
                    }
                    {
                        productRecomendation.length * 240 > -scrollWidth + 240 &&
                        <button class="right" onClick={() => scrollToRight()}>›</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailsSuggetionsContainer;