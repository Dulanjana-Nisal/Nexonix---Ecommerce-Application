function OrderFooter({ page, prevPage, allOrdersCounts, nextPage }) {
    return (
        <div className="orders-container-footer">
            <div className="box-buttons">
                {
                    page !== 1 &&
                    <button className="pre" onClick={() => prevPage()}>‹</button>
                }
                <p><span>{page}</span> of {Math.ceil(allOrdersCounts.all_result / 10)} </p>
                {
                    Math.ceil(allOrdersCounts.all_result / 10) > page &&
                    <button className="next" onClick={() => nextPage()}>›</button>
                }
            </div>
        </div>
    )
}

export default OrderFooter;