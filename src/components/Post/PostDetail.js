import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { Rate, Spin, Row, Col, Breadcrumb, Popover, Image } from "antd";
import { animated, useSpring } from "react-spring";
import { LoadingOutlined, LikeOutlined, LikeFilled, PlusOutlined } from '@ant-design/icons';
import { StoreContext } from "../../store"
import CreateComment from "./postdetail/CreateComment";
import AllComment from "./postdetail/AllComment";
import AddToFavorite from "./favorite/AddToFavorite";
import LinkToOther from "./postdetail/LinkToOther";
import { thumbsUp, thumbsDown, setPostDetail } from "../../actions"

export default function PostDetail(){
    const { state: { postDetail: { post, like, checkIfLiked }, requestPost:{loading}, page:{posts}}, dispatch } = useContext(StoreContext);
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
          <Row gutter={[48, 48]}>
            <Col xs={{ span: 24 }} 
                sm={{ span: 24 }} 
                lg={{ span: 18 }}
                xl={{ span: 18 }}
                xxl={{ span: 18 }}>
              <Row gutter={[48, 8]}>
                <Col xs={{ span: 24 }} 
                    sm={{ span: 12 }} 
                    lg={{ span: 13 }}
                    xl={{ span: 13 }}
                    xxl={{ span: 13 }}>
                  <h1 className="post-detail-article post-detail-article--large">{post.article}</h1>
                  <p>{post.time} By {post.author}</p>
                  <p>推薦指數：<Rate disabled allowHalf defaultValue={post.recommend}/></p>
                  <div className="post-detail-like">
                    <p>有{like.length}個朋朋說這則文章很讚</p>
                    <div className="post-detail-btn-area">
                      <Popover content={"讚"}>
                        {checkIfLiked == "false"
                          ? <LikeOutlined className="post-detail-btn" onClick={ThumbsUp}/>
                          : <LikeFilled className="post-detail-btn" onClick={ThumbsDown}/>
                        }
                      </Popover> 
                      <AddToFavorite post={post}/>
                    </div>
                  </div>
                </Col>
                <Col xs={{ span: 24 }} 
                    sm={{ span: 12 }} 
                    lg={{ span: 10 }}
                    xl={{ span: 10 }}
                    xxl={{ span: 10 }}>
                <Image className="post-image" src="/images/b61a1db0-e44e-460f-a928-c15578c32ad7.jpg"/> 
                </Col>
              </Row>
              <Row>
                <p>{post.content}</p>
              </Row>
              <Row className="post-detail-comment--area">
                <CreateComment/> 
                <AllComment postId={post.id}/>
              </Row>
            </Col>
            <Col xs={{ span: 24 }} 
              sm={{ span: 24 }} 
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
              className="post-detail-right">
              <h3 className="post-detail-article">看看其他{post.activity}的文章</h3>
              <p>
                {posts.length==1
                  ?<>
                  <p>目前只有這篇文章耶...</p>
                  <Link to ="/createPost" className="post-detail-link--none">
                    <p>趕快去發佈一篇吧<PlusOutlined /></p>
                  </Link>
                  </>
                  :posts.map(post => (
                  <LinkToOther post={post}/>
                ))
                }
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