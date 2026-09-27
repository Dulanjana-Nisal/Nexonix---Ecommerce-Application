function NotificationFooter({ page, preButton, notificationCount, nextButton }) {
    return (
        <div className="page-footer">
            <div className="box-buttons">
                {
                    page > 1 &&
                    <button className="pre" onClick={() => preButton()}>‹</button>
                }
                <p><span>{1}</span> of {Math.ceil(notificationCount / 10) || 1} </p>
                {
                    Math.ceil(notificationCount / 10) > page &&
                    <button className="next" onClick={() => nextButton()}>›</button>
                }
            </div>
        </div>
    )
}

export default NotificationFooter;