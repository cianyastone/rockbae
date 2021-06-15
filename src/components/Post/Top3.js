import { Col } from "antd"
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { StoreContext } from "../../store"
import { setPostDetail, setPostPage } from "../../actions";


export default function LinkToOther({post}){
    const { dispatch } = useContext(StoreContext);
    return(
    <>
            <Link to={`/post/${post.activity}/${post.id}`}
                    onClick={() => {
                        setPostDetail(dispatch, post.id);
                    }}
                    className="postList-Top-item"
                >
                    <img className="postList-image" src="/images/b61a1db0-e44e-460f-a928-c15578c32ad7.jpg"/> 
                    <h2>{post.article}</h2>
                </Link>
    </>
    );
}