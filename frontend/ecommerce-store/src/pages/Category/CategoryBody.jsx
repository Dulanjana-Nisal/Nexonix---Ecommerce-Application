import LoadingComponent from "../../components/Loading/LoadingComponent";
import ProductComponent from "../../components/Product/ProductComponent";

function CategoryBody({category,categoryData,pageNumber,toPrePage,pagesSize,toNextPage,loading}) {

    const capitalizeWord = (char) => {
        if(!char) return ""
        return char.charAt(0).toUpperCase() + char.slice(1)
    }

    return (
        <>
            <div class="container-body">
                <div class={`body-head ${category}-section`}>
                    <h1>{capitalizeWord(category)}</h1>
                </div>
                {
                    loading ? <LoadingComponent />
                    :
                    <div class="body-template">
                        {
                            categoryData.map((items) => {
                                return (
                                    <ProductComponent items={items} ratings={items.ratings} />
                                )
                            })
                        }
                    </div>
                }
                <div class="box-buttons">
                    {
                        pageNumber > 1 &&
                        <button class="prv" onClick={() => toPrePage()}>‹</button>
                    }
                    <p><span>{pageNumber}</span> of {pagesSize}</p>
                    {
                        pagesSize != pageNumber &&
                        <button class="next" onClick={() => toNextPage()}>›</button>
                    }
                </div>
            </div>
        </>
    )
}

export default CategoryBody;