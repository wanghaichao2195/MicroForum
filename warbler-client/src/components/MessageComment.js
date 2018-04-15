import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const MessageItem = ({
        date, 
        profileImageUrl, 
        text, 
        username,
        removeMessage,
        isCorrectUser,
        comments
    }) => (
    <div>
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
                        {date}
                    </Moment>
                </span>
                <p>{text}</p>
                {isCorrectUser && (
                    <a className="btn btn-danger btn-sm" onClick={removeMessage} >
                        Delete
                    </a>
                )}
                
            </div>
            
        </li>
        <div>
                {comments[0].text}
        </div>
    </div>

);

export default MessageItem;