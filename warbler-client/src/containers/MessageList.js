import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchMessages, removeMessage} from "../store/actions/messages";
<<<<<<< HEAD
=======


>>>>>>> addComments
import MessageItem from "../components/MessageItem";

class MessageList extends Component{
    componentDidMount() {
        this.props.fetchMessages();
    }
    render(){
        const { messages, removeMessage, currentUser } = this.props
        let MessageList = messages.map(m =>(
<<<<<<< HEAD
            <MessageItem 
                key={m._id}
                date={m.createAt}
=======
            <MessageItem
                comments={m.comments}
                key={m._id}
                message_date={m.createAt}
>>>>>>> addComments
                text={m.text}
                username={m.user.username}
                profileImageUrl={m.user.profileImageUrl}
                removeMessage={removeMessage.bind(this, m.user._id, m._id)}
<<<<<<< HEAD
=======
                m_id={m._id}
>>>>>>> addComments
                isCorrectUser={currentUser === m.user._id}
            />
        ));
        return (
            <div className="row col-sm-8">
                <div className="offset-1 col-sm-10">
                    <ul className="list-group" id="messages">
                        {MessageList}
                    </ul>
                </div>
            </div>
        )
    }
    
}

function mapStateToProps(state){
    return {
        messages:state.messages,
        currentUser: state.currentUser.user.id//we just want the user id for isCorrectUser
    };
}

export default connect(mapStateToProps, {fetchMessages, removeMessage})(MessageList);

