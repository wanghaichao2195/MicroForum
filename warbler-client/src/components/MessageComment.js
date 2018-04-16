import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";


const MessageItem = ({
        comment,
        isCorrectUser
    }) => (
    <div>
        <li className="list-group-item">
            <div className="message-area" style={{marginBottom:"-2px",wordWrap:"break-word",width:"500px"}}>
                <Link to="/">@{comment.user.username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment className="text-muted" format="Do MMM HH:mm">
                        {comment.createdAt}
                    </Moment>
                </span>
                <p> {comment.text} </p> 
                {isCorrectUser && (
                    <a className="btn btn-sm btn-danger "  > 
                        Delete
                    </a>
                )}
               
            </div>
            
        </li>
    </div>

);

export default MessageItem;