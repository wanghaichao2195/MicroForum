import {combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";

const rootReducer = combineReducers({
    currentUser:currentUser,
    errors:errors      //can also be written as  currentUser,errors
})

export default rootReducer;