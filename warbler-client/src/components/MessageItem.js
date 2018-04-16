import React, {Component} from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {postNewComment} from "../store/actions/comments";

import DefaultProfileImg from "../images/default-profile-image.jpg";
import MessageComment from "./MessageComment"

class MessageItem extends Component{

    constructor(props){
        super(props)
        this.state ={
            newComment:""
        };
    }

   
    handleNewComment = event =>{
        event.preventDefault();
        this.props.postNewComment(this.props.m_id, this.state.newComment);
        this.setState({newComment:""});
        //this.props.history.push("/messages");//react router
          
    };

   




    render(){
        const { message_date, 
                profileImageUrl, 
                text, 
                username,
                removeMessage,
                isCorrectUser,
                comments,
                currentUser,
                messages
        } = this.props

        let comment = comments.map(c =>(
            <MessageComment
                key={c._id}
                comment={c}
                isCorrectUser={currentUser === c.user._id}
            />
        ));

        let divStyle = {  
            marginBottom: '10px'
        }  
          
        return(
            <div style={divStyle}>
                <li className="list-group-item">
                    <img 
                        src={profileImageUrl || DefaultProfileImg} 
                        alt={username} 
                        height="100" 
                        width="100" 
                        className="timeline-image"
                    />
                    <div className="message-area">
                        <Link to="/">@{username} &nbsp;</Link>
                        <span className="text-muted">
                            <Moment className="text-muted" format="Do MMM YYYY">
                                {message_date}
                            </Moment>
                        </span>
                        <p>{text}</p>
                        {isCorrectUser && (
                            <a className="btn btn-danger btn-md" onClick={removeMessage} >
                                Delete
                            </a>
                        )}
                        
                    </div>

                  
                    
                </li>
                <div>
                    <form onSubmit={this.handleNewComment}>
                        {this.props.errors.message && (
                            <div className="alert alert-danger">
                                {this.props.errors.message}
                            </div>
                        )}
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.newComment}
                            onChange={ e => this.setState({newComment:e.target.value})}
                        />
                        <button type="submit" className="btn btn-sm btn-success" >
                            Add a comment
                        </button>
                    </form>
                </div>
                <div>
                    {comment}
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state){
    return {
        messages:state.messages,
        currentUser: state.currentUser.user.id,//we just want the user id for isCorrectUser
        errors: state.errors               
    };
}

export default connect(mapStateToProps,{ postNewComment })(MessageItem);
