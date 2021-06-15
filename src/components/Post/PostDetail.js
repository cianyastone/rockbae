import { useContext } from "react";
import { Link } from 'react-router-dom';
import { Button, Rate, Spin, Row, Col, Breadcrumb,  } from "antd";
import { LoadingOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import { StoreContext } from "../../store"
import CreateComment from "./postdetail/CreateComment";
import AllComment from "./postdetail/AllComment";
import AddToFavorite from "./favorite/AddToFavorite";
import LinkToOther from "./postdetail/LinkToOther";
import BreadcrumbItem from "../normal/BreadcrumbItem";
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
          <Row gutter={[48, 8]}>
            <Col span={16}>
            <Breadcrumb className="breadcrumb--1">
              <Breadcrumb.Item className="breadcrumb">
                <Link to={`/Home`}>
                  首頁
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/post/${post.activity}`} className="breadcrumb-item">
                  {post.activity}
                </Link>
              </Breadcrumb.Item>
                <Breadcrumb.Item>
                <Link to={`/post/${post.activity}/${post.id}`} className="breadcrumb-item">
                  {post.article}
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
              <Row gutter={[48, 8]}>
                <Col span={13}>
                  <h1 className="post-detail-article">{post.article}</h1>
                  <p>By {post.author}</p>
                  <p>推薦指數：<Rate disabled allowHalf defaultValue={post.recommend}/></p>
                  <div className="post-detail-like">
                    <p>有{like.length}個朋朋說這則文章很讚</p>
                    {checkIfLiked == "false"
                      ? <LikeOutlined className="post-detail-btn" onClick={ThumbsUp}/>
                      : <LikeFilled className="post-detail-btn" onClick={ThumbsDown}/>
                    }
                    <AddToFavorite post={post}/>
                  </div>
                </Col>
                <Col span={10}>
                <img className="post-image" src="/images/b61a1db0-e44e-460f-a928-c15578c32ad7.jpg"/> 
                </Col>
              </Row>
              <p>{post.content}</p>
            </Col>
            <Col span={8}>
              <p>看看其他{post.activity}的文章</p>
              <p>
                {posts.map(post => (
                  <LinkToOther post={post}/>
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