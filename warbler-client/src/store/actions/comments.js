import {apiCall} from "../../services/api";
import {addError} from "./errors";


export const postNewComment = (message_id, text) => (dispatch, getState) =>{//thunk
    let {currentUser} = getState();
    const id = currentUser.user.id;
    return apiCall("post", `/api/users/${id}/messages/${message_id}/comment`, { text })
    .then(res=>{})//post will return an object but we will not use that one
    .catch(err=> dispatch(addError(err.message)));
};