import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { StoreContext } from "../../../store"
import { setPostDetail, setPostPage } from "../../../actions";


export default function LinkToOther({post}){
    const { dispatch } = useContext(StoreContext);
    const [open, setOpen] = useState(false);
    const hover = useSpring( open ? {
        from: { y: 0 },
        to: { y: 3 },
    }:{ 
        from: { y: 3 },
        to: { y: 0 },
    })
    return(
    <>
    <animated.div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} style={{...hover}}>
        <Link to={`/post/${post.activity}/${post.id}`}
            onClick={() => {
                setPostDetail(dispatch, post.id);
                setPostPage(dispatch, `/post/${post.activity}`);
            }}
            className="post-detail-link"
        >
            <p>{post.article}</p>
        </Link>
    </animated.div>
    </>
    );
}