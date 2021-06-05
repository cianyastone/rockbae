import { useEffect, useContext } from "react";
import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import { Button } from "antd";
import { StoreContext } from "../../store"
import CreateComment from "./CreateComment";
import AddToFavorite from "./AddToFavorite";
import { thumbsUp, setPostDetail } from "../../actions"

export default function PostDetail(){
   const { state: { postDetail: { post, like, comment } }, dispatch } = useContext(StoreContext);
   const ThumbsUp = () => {
      thumbsUp(dispatch, post.id);
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
      {[...Array(comment.length).keys()].map((x) => (
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
      ))}
      <CreateComment/>
      <AddToFavorite post={post}/>
      <Button type="primary" className="btn-tocar" onClick={ThumbsUp}>
        讚
      </Button>
      </>
   );
}