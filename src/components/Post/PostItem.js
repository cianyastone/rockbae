import { Col } from "antd"
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { StoreContext } from "../../store"
import { setPostDetail, setPostPage } from "../../actions";

export default function PostItem({ post }) {
    const { dispatch } = useContext(StoreContext);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const hover = useSpring( open ? {
        from: { y: 0 },
        to: { y: 5 },
    }:{ 
        from: { y: 5 },
        to: { y: 0 },
    })
    const hover2 = useSpring( open2 ? {
        from: { y: 0 },
        to: { y: 5 },
    }:{ 
        from: { y: 5 },
        to: { y: 0 },
    })
    return (
        <>
        <Col xs={{ span: 24 }} 
         sm={{ span: 12 }} 
         lg={{ span: 13 }}
         xl={{ span: 13 }}
         xxl={{ span: 13 }}
         className="postItem">
            <animated.div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} style={{...hover}}>
            <Link to={`/post/${post.activity}/${post.id}`}
                onClick={() => {
                    setPostPage(dispatch, `/post/${post.activity}`);
                    setPostDetail(dispatch, post.id);
                }}
            >
                <p>{post.article}</p>
            </Link>
            </animated.div>
        </Col>
        <Col xs={{ span: 0 }} 
         sm={{ span: 12 }} 
         lg={{ span: 6 }}
         xl={{ span: 6 }}
         xxl={{ span: 6 }}
        className="postItem">
            <animated.div onMouseEnter={() => setOpen2(true)} onMouseLeave={() => setOpen2(false)} style={{...hover2}}>
            <Link to={`/post/${post.activity}`}
                onClick={() => {setPostPage(dispatch, `/post/${post.activity}`);}}
            >
                <p>{post.activity}</p>
            </Link>
            </animated.div>
        </Col>
        <Col xs={{ span: 0 }} 
         sm={{ span: 0 }} 
         lg={{ span: 3 }}
         xl={{ span: 3 }}
         xxl={{ span: 3 }}>
            <p>{post.author}</p>
        </Col>
        <Col xs={{ span: 0 }} 
         sm={{ span: 0 }} 
         lg={{ span: 2 }}
         xl={{ span: 2 }}
         xxl={{ span: 2 }}>
            <p>{post.like.length}</p>
        </Col>
        </>
    );
}
