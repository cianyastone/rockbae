import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Spin } from "antd";
import PostItem from "./PostItem";
import Top3 from "./Top3";
import { StoreContext } from "../../store";
import { setPostPage } from "../../actions"


export default function Post() {
    const { state: { page: { activities, posts },requestPost: { loading } }, dispatch } = useContext(StoreContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#FFF" }} spin />;
    const [open, setOpen] = useState(false);
    const hover = useSpring( open ? {
        from: { transform: "scale(0.9)", },
        to: { transform: "scale(1)", }
    }:{ 
        from: { transform: "scale(1)" },
        to: { transform: "scale(0.9)" }
    })
    const clamp = (value, clampAt = 20) => {
        if (value > 0) {
          return value > clampAt ? clampAt : value;
        } else {
          return value < -clampAt ? -clampAt : value;
        }
    };
    const [style, set] = useSpring(() => ({
        transform: "perspective(500px) rotateY(0deg)",
        opacity: 1
    }));

    const bind = useScroll(event => {
        set({
        transform: `perspective(500px) rotateY(${
            event.scrolling ? clamp(event.delta[0]) : 0
        }deg)`
        });
    });
    return(
        <>
        {loading
        ? (
            <div className="postList-container spinner-wrap"><Spin indicator={antIcon} className="spinner"/></div>
        ) : (
            <div className="postList-container">
            <div>
                <animated.div className="postList-scroll" {...bind()} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                    <animated.div>
                        <Link to={`/post`}
                            onClick={() => {setPostPage(dispatch, `/post`);}}
                        >
                            <animated.div style={{...hover}}>
                                <animated.div className="postList-card" style={{...style }}>
                                    <h1>All</h1>
                                </animated.div>
                            </animated.div>
                        </Link>
                    </animated.div>
                    {[...Array(activities.length).keys()].map((x) => (
                    <Link to={`/post/${activities[x].name}`}
                        onClick={() => {setPostPage(dispatch, `/post/${activities[x].name}`);}}
                    >
                        <animated.div style={{...hover}}>
                        <animated.img
                            className="postList-card"
                            style={{
                            ...style,
                            }}
                            src={activities[x].image}
                        />
                        </animated.div>
                    </Link>
                    ))}
                </animated.div>
            </div>
            <div className="postList-content">
            <Row className="postList-Top-item ">
                <h1 className="post-detail-article--large">最新貼文</h1>
            </Row>
            <div className="postList-Top">
                {posts.length > 3
                ?<>
                <Top3 post={posts[0]}/>
                <Top3 post={posts[1]}/>
                <Top3 post={posts[2]}/>
                </>
                :posts.map(post => (
                    <Top3 post={post}/>
                ))
                }
            </div>
            <Row className="postList-topic">
                <Col xs={{ span: 24 }} 
         sm={{ span: 12 }} 
         lg={{ span: 13 }}
         xl={{ span: 13 }}
         xxl={{ span: 13 }}>
                    <p>標題</p>
                </Col>
                <Col xs={{ span: 0 }} 
         sm={{ span: 12 }} 
         lg={{ span: 6 }}
         xl={{ span: 6 }}
         xxl={{ span: 6 }}>
                    <p>活動分類</p>
                </Col>
                <Col xs={{ span: 0 }} 
         sm={{ span: 0 }} 
         lg={{ span: 3 }}
         xl={{ span: 3 }}
         xxl={{ span: 3 }}>
                    <p>作者</p>
                </Col>
                <Col xs={{ span: 0 }} 
         sm={{ span: 0 }} 
         lg={{ span: 2 }}
         xl={{ span: 2 }}
         xxl={{ span: 2 }}>
                    <p>發布日期</p>
                </Col>
            </Row>
            <Row className="postList-item">
                {posts.map(post => (
                    <PostItem post={post}/>
                ))}
            </Row> 
            </div>
            </div>
        )
      }
      </>
    );
}