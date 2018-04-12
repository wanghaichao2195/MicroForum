import React, {Component} from "react"  
import {connect} from "react-redux";

export default function withAuth(ComponentToBeRendered){ //higher order component
    class Authenticate extends Component {
        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.props.history.push("/signin");//because we are using react router
                //we can have access to the history to redirect
            }
        }

        componentWillUpdate(nextProps){//when any kind of state(both react or redux state) change        make sure nextProps of that props is getting, is still Authenticated
            if(!nextProps.isAuthenticated){
                this.props.history.push("/signin");
            }
        }
        render(){
            return <ComponentToBeRendered {...this.props}/>
        }
    }

    function mapStateToProps(state){
        return {
            isAuthenticated:state.currentUser.isAuthenticated
        }
    }
    
    return connect(mapStateToProps)(Authenticate);
}



