function NotificationPageFooter({page,preButton,notifiState,nextButton}) {
    return (
        <div className="page-footer">
            <div className="box-buttons">
                {
                    page > 1 &&
                    <button className="pre" onClick={() => preButton()}>‹</button>
                }
                <p><span>{1}</span> of {Math.ceil(notifiState.length / 10)} </p>
                {
                    page < Math.ceil(notifiState.length / 10) &&
                    <button className="next" onClick={() => nextButton()}>›</button>
                }
            </div>
        </div>
    )
}

export default NotificationPageFooter;