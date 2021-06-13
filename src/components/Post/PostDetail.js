import { useContext } from "react";
import { Link } from 'react-router-dom';
import { Button, Rate, Spin, Row, Col } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { StoreContext } from "../../store"
import CreateComment from "./CreateComment";
import AllComment from "./AllComment";
import AddToFavorite from "./AddToFavorite";
import { thumbsUp, thumbsDown, setPostDetail } from "../../actions"

export default function PostDetail(){
    const { state: { postDetail: { post, like, comment, checkIfLiked }, requestPost:{loading}, page:{posts}}, dispatch } = useContext(StoreContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#FFF" }} spin />;
    const ThumbsUp = () => {
      thumbsUp(dispatch, post.id);
      setPostDetail(dispatch, post.id);
    };
    const ThumbsDown = () => {
      thumbsDown(dispatch, post.id);
      setPostDetail(dispatch, post.id);
    };

    return (
      <>
      {loading
        ? (
          <div className="spinner-wrap">
            <Spin indicator={antIcon} className="spinner" />
          </div>
        ) : (
        <div className="post-detail-content">
          <Row>
            <Col span={18}>
              <div className="post-detail-article">
                <h1>{post.article}</h1>
              </div>
              <p>活動分類：{post.activity}</p>
              <p>{post.content}</p>
              <p>推薦指數：<Rate disabled allowHalf defaultValue={post.recommend}/></p>
              <p>有{like.length}個朋朋說這則文章很讚</p>
              {checkIfLiked == "false"
                ? <Button type="primary" className="btn-tocar" onClick={ThumbsUp}>
                    讚
                  </Button>
                : <Button type="primary" className="btn-tocar" onClick={ThumbsDown}>
                    收回
                  </Button>
              }
              <AddToFavorite post={post}/>
            </Col>
            <Col span={6}>
              <p>看看其他{post.activity}的文章</p>
              <p>
                {posts.map((x) => (
                  <p>hi</p>
                ))}
              </p>
            </Col>
          </Row>
        </div>
      )}
      
      </>
      /*<p>留言</p>
      {[...Array(comment.length).keys()].map((x) => (
        <AllComment comment={comment[x]}/>
      ))}
      <CreateComment/> */
    );
}