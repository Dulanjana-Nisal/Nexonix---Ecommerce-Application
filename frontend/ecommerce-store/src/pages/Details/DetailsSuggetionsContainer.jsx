import ProductComponent from "../../components/Product/ProductComponent";

function DetailsSuggetionsContainer({productRecomendation,scrollWidth,scrollToLeft,scrollToRight}) {
    return (
        <div className="container-suggetions">
            {/* <!-- suggetions --> */}
            <div className="suggetions-header">
                <p>Related Products</p>
            </div>
            <div className="suggetions-card-row">
                {
                    productRecomendation.map((items) => {
                        return (
                            <div className="suggetions-card" style={{ transform: `translateX(${scrollWidth}px)` }}>
                                <ProductComponent items={items} ratings={items.ratings} key={items._id} />
                            </div>
                        )
                    })
                }
                <div className="btns">
                    {
                        scrollWidth !== 0 &&
                        <button className="left" onClick={() => scrollToLeft()}>‹</button>
                    }
                    {
                        productRecomendation.length * 240 > -scrollWidth + 240 &&
                        <button className="right" onClick={() => scrollToRight()}>›</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailsSuggetionsContainer;