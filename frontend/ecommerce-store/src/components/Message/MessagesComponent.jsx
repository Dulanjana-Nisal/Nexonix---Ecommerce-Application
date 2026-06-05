import { useState } from 'react';
import './MessagesComponent.css'

function MessagesComponent(){

    // messages states
    const [display,setDisplay] = useState(false)

    return(
        <>
        {
            display &&
            <div class="messages-container">
                <div class="message error">
                    <p>Some test message!</p>
                </div>
                <div class="cls-btn" onClick={() => setDisplay(false)}>✕</div>
            </div>
        }
        </>
    )
}

export default MessagesComponent;