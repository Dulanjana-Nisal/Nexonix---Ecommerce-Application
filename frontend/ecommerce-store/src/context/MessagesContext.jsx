import { createContext, useContext, useState } from "react"
import MessagesComponent from "../components/Messages/MessagesComonent"

const MessageContext = createContext()

export default function MessageProvider({children}){

    const [message,setMessage] = useState("")
    const [status,setStatus] = useState("success")

    return(
        <MessageContext.Provider value={{setStatus, setMessage}}>
            {children}
            {
                message &&
                <MessagesComponent message={message} status={status} />
            }

        </MessageContext.Provider>
    )
}

export function Message(){
    return useContext(MessageContext)
}