import { Card } from "antd"
import { useContext } from "react";
import { StoreContext } from "../../../store"
import { Link } from 'react-router-dom';
import { HeartTwoTone } from '@ant-design/icons';
import { removeFromFavorite } from "../../../actions"

export default function FavoriteItem({ item }) {
    const { dispatch } = useContext(StoreContext);
    return (
        <Card
            hoverable
            className="bg-gray activity">
            <Link to={`/post/${item.id}`}>
                <h2 className="activity-name">
                    {item.article}
                </h2>
            </Link>
            <div className="prefer-item-end">
                <div className="prefer-item-delete btn-toprefer" onClick={()=>removeFromFavorite(dispatch, item.id)}>
                    <HeartTwoTone twoToneColor="#eb2f96" />
                </div>
            </div>
        </Card>
    );
}
