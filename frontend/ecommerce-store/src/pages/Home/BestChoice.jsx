import ProductComponent from "../../components/Product/ProductComponent";

function BestChoice({bestChoiceProduct}) {
    return (
        <>
            <div class="best-choice">
                <div class="best-choice-head">
                    <h1>Best Choice 🔥</h1>
                </div>
                <div class="best-choice-body">
                    <div class="body-template">
                        {
                            bestChoiceProduct.map((items) => {
                                return (
                                    <ProductComponent items={items} ratings={items.ratings} key={items._id} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BestChoice;