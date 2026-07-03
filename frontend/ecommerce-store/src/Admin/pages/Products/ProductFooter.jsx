function ProductFooter({ pageNumber, prevPage, productData, nextPage }) {
    return (
        <div className="product-footer">
            <div className="box-buttons">
                {
                    pageNumber !== 1 &&
                    <button className="pre" onClick={() => prevPage()}>‹</button>
                }
                <p><span>{pageNumber}</span> of {Math.ceil(productData.all_result / 12)}</p>
                {
                    Math.ceil(productData.all_result / 12) > pageNumber &&
                    <button className="next" onClick={() => nextPage()}>›</button>
                }
            </div>
        </div>
    )
}

export default ProductFooter;