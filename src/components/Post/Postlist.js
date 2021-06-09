import { useContext } from "react";
import { Row, Col, Avatar } from "antd";
import PostItem from "./PostItem";
import { StoreContext } from "../../store";

export default function Post() {
    const { state: { page: { posts, activities } } } = useContext(StoreContext);
    return(
        <>
        {[...Array(activities.length).keys()].map((x) => (
            <Avatar size={64} src={activities[x].image} />
        ))}
        <Row gutter={[24,32]}>
        {posts.map(post => (
            <Col 
                key={post.id} 
                xs={{ span: 24 }} 
                sm={{ span: 24 }} 
                lg={{ span: 12 }}
                xl={{ span: 8 }}
                xxl={{ span: 8 }}
            >
                <PostItem post={post}/>
            </Col>
        ))}
        </Row> 
        </>      
    );
}