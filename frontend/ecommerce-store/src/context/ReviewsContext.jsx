import { createContext, useContext, useEffect, useReducer } from "react"
import { reducer, REVIEW_ACTIONS } from "./ReviewReducer";
import api from "../services/auth";

// create context
const ReviewContext = createContext();

export default function ReviewProvider({children}){
    
    const [state, dispatch] = useReducer(reducer, [])

   //fetch reviews data
    useEffect(()=>{
        const fetchReviewsData = async () =>{
            const result = await api.get('/reviews/')
            dispatch({
                type: REVIEW_ACTIONS.SET_REIVEWS,
                payload: result.data.data[0].items
            })
        }
        fetchReviewsData()
    }, [])

    return(
        <ReviewContext.Provider value={{state,dispatch}}>
            {children}
        </ReviewContext.Provider>
    )
}

export function Review(){
    return useContext(createContext)
}