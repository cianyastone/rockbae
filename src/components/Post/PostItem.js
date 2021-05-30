import { Card } from "antd"
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { StoreContext } from "../../store"
import { requestPostDetail } from "../../actions";

export default function PostItem({ post }) {
    const { dispatch } = useContext(StoreContext);
    return (
        <Card
            hoverable
            className="bg-gray activity">
            <Link to={`/post/${post.id}`}
                onClick={() => {
                    requestPostDetail(dispatch, post.id, 0, 1);
                }}
            >
                <h2 className="activity-name">
                    {post.name}
                </h2>
            </Link>
        </Card>
    );
}
