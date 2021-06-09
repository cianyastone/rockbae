import { Card } from "antd"
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { StoreContext } from "../../store"
import { setPostDetail } from "../../actions";

export default function PostItem({ post }) {
    const { dispatch } = useContext(StoreContext);
    return (
        <Card
            hoverable
            className="bg-gray activity">
            <Link to={`/post/${post.id}`}
                onClick={() => {
                    setPostDetail(dispatch, post.id);
                }}
            >
                <h2 className="activity-name">
                    {post.article}
                </h2>
            </Link>
        </Card>
    );
}
