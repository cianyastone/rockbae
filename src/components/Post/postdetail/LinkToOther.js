import { Col } from "antd"
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { StoreContext } from "../../../store"
import { setPostDetail, setPostPage } from "../../../actions";


export default function LinkToOther({post}){
    const { dispatch } = useContext(StoreContext);
    return(
    <>
        <Col span={13} >
            <Link to={`/post/${post.activity}/${post.id}`}
                onClick={() => {
                    setPostDetail(dispatch, post.id);
                    setPostPage(dispatch, `/post/${post.activity}`);
                }}
            >
                <p>{post.article}</p>
            </Link>
        </Col>
    </>
    );
}