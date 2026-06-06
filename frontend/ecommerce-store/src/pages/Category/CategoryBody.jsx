import ProductComponent from "../../components/Product/ProductComponent";

function CategoryBody({category,categoryData,pageNumber,toPrePage,pagesSize,toNextPage}) {

    // display ratings
    const ratingsQuery = {
        5: <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9733; <span>( 50 Reviews )</span></p>,
        4: <p class="four-star">&#9733; &#9733; &#9733; &#9733; &#9734; <span>( 50 Reviews )</span></p>,
        3: <p class="four-star">&#9733; &#9733; &#9733; &#9734; &#9734; <span>( 50 Reviews )</span></p>,
        2: <p class="four-star">&#9733; &#9733; &#9734; &#9734; &#9734; <span>( 50 Reviews )</span></p>,
        1: <p class="four-star">&#9733; &#9734; &#9734; &#9734; &#9734; <span>( 50 Reviews )</span></p>,
    }

    return (
        <>
            <div class="container-body">
                <div class="body-head">
                    <h1>{category}</h1>
                </div>
                <div class="body-template">
                    {
                        categoryData.map((items) => {
                            return (
                                <ProductComponent items={items} ratings={ratingsQuery[items.ratings]} />
                            )
                        })
                    }
                </div>
                <div class="body-buttons">
                    {
                        pageNumber > 1 &&
                        <button class="pre" onClick={() => toPrePage()}>‹ Previous</button>
                    }
                    <p>{pageNumber} of {pagesSize}</p>
                    {
                        pagesSize != pageNumber &&
                        <button class="next" onClick={() => toNextPage()}>Next ›</button>
                    }
                </div>
            </div>
        </>
    )
}

export default CategoryBody;