import React, { Component } from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from './Navbar';
import Main from "./Main"
import {setAuthorizationToken, setCurrentUser} from "../store/actions/auth";
import jwtDecode from "jwt-decode";

const store = configureStore();
//hydration   if server go down or redux store were to be cleared when the page refreshs we could still see if there's a token in local storage
//if so we can repopulate or rehydrate our state with the current user
if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);//add jwt to header
  //prevent someone from manually tampering with the key of jwtToken in localStorage
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  }catch(e){
    store.dispatch(setCurrentUser({}));
  }
}

const App = ()=> (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>

)

export default App;
