import { useEffect, useContext } from "react";
import React, { createElement, useState } from 'react';
import { Button } from "antd";
import { StoreContext } from "../../store"
import CreateComment from "./CreateComment";
import AllComment from "./AllComment";
import AddToFavorite from "./AddToFavorite";
import { thumbsUp, thumbsDown, setPostDetail } from "../../actions"

export default function PostDetail(){
    const { state: { postDetail: { post, like, comment, checkIfLiked } }, dispatch } = useContext(StoreContext);
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
      <h2 className="product-category">
         {post.article}
      </h2>
      <h2 className="product-category">
         活動：{post.activity}
      </h2>
      <p className="product-category">
         {post.content}
      </p>
      <p>
         有{like.length}個朋朋覺得這則文章有幫助
      </p>
      {checkIfLiked == "false"
        ? <Button type="primary" className="btn-tocar" onClick={ThumbsUp}>
            讚
          </Button>
        : <Button type="primary" className="btn-tocar" onClick={ThumbsDown}>
            收回讚
          </Button>
      }
      <p>留言</p>
      {[...Array(comment.length).keys()].map((x) => (
        <AllComment comment={comment[x]}/>
      ))}
      <CreateComment/>
      <AddToFavorite post={post}/>
      </>
    );
}