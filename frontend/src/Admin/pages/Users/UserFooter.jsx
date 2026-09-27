function UserFooter({ pageNumber, prevPage, allResultCount, nextPage }) {
    return (
        <div className="user-footer">
            <div className="box-buttons">
                {
                    pageNumber !== 1 &&
                    <button className="pre" onClick={() => prevPage()}>‹</button>
                }
                <p><span>{pageNumber}</span> of {Math.ceil(allResultCount / 10)}</p>
                {
                    (Math.ceil(allResultCount / 10)) > pageNumber &&
                    <button className="next" onClick={() => nextPage()}>›</button>
                }
            </div>
        </div>
    )
}

export default UserFooter;