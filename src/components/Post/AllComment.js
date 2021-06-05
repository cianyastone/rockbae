import { Comment, Avatar } from 'antd';
import { Button } from "antd";

export default function AllComment({comment}){
  const click = () => {
    console.log(comment.user);
  }
  return(
    <>
    <Comment
      author={<a>Han Solo</a>}
      avatar={
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      }
      content={
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
      }
    />
    <Button type="primary" className="btn-tocar" onClick={click}>
      資訊
    </Button>
    </>
  );
}