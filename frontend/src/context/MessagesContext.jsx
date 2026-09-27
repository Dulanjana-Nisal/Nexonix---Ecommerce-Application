import { createContext, useContext, useState } from "react"
import MessagesComponent from "../components/Messages/MessagesComonent"

const MessageContext = createContext()

export default function MessageProvider({ children }) {

    const [message, setMessage] = useState(null)

    function setupMessage(msgStatus, msgMessage, msgTitle) {
        setMessage({ status: msgStatus, message: msgMessage, title: msgTitle })

        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (
        <MessageContext.Provider value={{ setupMessage }}>
            {children}

            {
                message &&
                <MessagesComponent message={message.message} status={message.status} title={message.title} />
            }

        </MessageContext.Provider>
    )
}

export function Message() {
    return useContext(MessageContext)
}