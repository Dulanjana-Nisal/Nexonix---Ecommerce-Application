import './MessagesComponent.css';

function MessagesComponent(){
    return(
        <>
            <div class="messages-container error">
                <div class="left-side">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div class="center-side">
                    <p>This is success message!</p>
                </div>
                <div class="right-side">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
        </>
    )
}

export default MessagesComponent;