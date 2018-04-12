import {LOAD_MESSAGES, REMOVE_MESSAGES} from "../actionTypes"

const message = (state=[], action) =>{
    switch(action.type){
        case LOAD_MESSAGES:
            return [...action.messages];
        case REMOVE_MESSAGES:
            return state.filter(message => message._id !== action.id);
        default:
            return state;
    }
}


export default message;