import './MessagesComponent.css';

function MessagesComponent({message,status}){
    return(
        <>
            <div class={`messages-container ${status}`}>
                <div class="left-side">
                    {
                        status === 'error' ?
                        <i class="fa-solid fa-x"></i>
                        :
                        <i class="fa-solid fa-check"></i>
                    }
                </div>
                <div class="center-side">
                    <p>{message}</p>
                </div>
            </div>
        </>
    )
}

export default MessagesComponent;