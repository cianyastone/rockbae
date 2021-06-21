import { Comment, Avatar } from 'antd';
import {useEffect, useContext} from "react";
import {  } from '../../../actions';
import {StoreContext} from "../../../store"

export default function AllComment(){
  const {state:{postDetail: { comment }}, dispatch}= useContext(StoreContext);
  return(
    <div className="comment-content">
    {comment.map(content =>(
      <div className="comment-list">
        <Avatar className="comment-avatar">
            {content.user}
        </Avatar>
        <div className="comment-text">
          <p className="comment-time">{content.user} {content.time}</p>
          <p>{content.comment}</p>
        </div>
      </div>
    ))}
    </div>
  );
}