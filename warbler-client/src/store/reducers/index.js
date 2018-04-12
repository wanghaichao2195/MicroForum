import {combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";

const rootReducer = combineReducers({
    currentUser:currentUser,
    errors:errors,      //can also be written as  currentUser,errors,messages
    messages:messages
})

export default rootReducer;

//import { combineReducers } from 'redux'
////import * as reducers from './reducers'
//const todoApp = combineReducers(reducers)