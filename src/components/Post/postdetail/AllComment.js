import { Comment, Avatar } from 'antd';
import {useEffect, useContext} from "react";
import {  } from '../../../actions';
import {StoreContext} from "../../../store"

export default function AllComment(){
  const {state:{postDetail: { comment }}, dispatch}= useContext(StoreContext);
  return(
    <>
    {comment.map(content =>(
    <Comment
      author={<a>{content.user}</a>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      datetime={content.time}
      content={
        <p>
          {content.comment}
        </p>
      }
    />
    ))}
    </>
  );
}