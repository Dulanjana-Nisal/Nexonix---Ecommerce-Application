
export const REVIEW_ACTIONS = {
    SET_REIVEWS: 'set-reviews',
    ADD_REVIEWS: 'add-reviews',
    DELETE_REVIEWS: 'delete-reviews'
} 

//delete reviews function
function deleteReviews(state, reviewId){
    return state.filter(items => items._id !== reviewId)
}

export function reducer(state,action){
    switch(action.type){
        case REVIEW_ACTIONS.SET_REIVEWS: return action.payload;
        case REVIEW_ACTIONS.ADD_REVIEWS: return [...state, action.payload];
        case REVIEW_ACTIONS.DELETE_REVIEWS: return deleteReviews(state, action.payload.id)
    }
}