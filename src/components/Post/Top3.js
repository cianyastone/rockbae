import { Col } from "antd"
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";
import { animated, useSpring } from "react-spring";
import { StoreContext } from "../../store"
import { setPostDetail, setPostPage } from "../../actions";

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

export default function LinkToOther({post}){
    const { dispatch } = useContext(StoreContext);
    const [props, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: { mass: 5, tension: 350, friction: 40 }
      }));
    return(
    <>
    <Link to={`/post/${post.activity}/${post.id}`}
        onClick={() => {
            setPostDetail(dispatch, post.id);
        }}
        className="postList-Top-item"
    >
        <animated.div
            class="top3-card"
            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.interpolate(trans) }}
        >
            <img className="postList-image" src="/images/b61a1db0-e44e-460f-a928-c15578c32ad7.jpg"/> 
        </animated.div>                
        <h2>{post.article}</h2>
    </Link>
    </>
    );
}