import ProductComponent from "../../components/Product/ProductComponent";

function CategoryBody({category,categoryData,pageNumber,toPrePage,pagesSize,toNextPage}) {
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
                                <ProductComponent items={items} ratings={items.ratings} />
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