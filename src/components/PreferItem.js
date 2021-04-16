import { Card } from "antd"
import { useContext } from "react";
import { StoreContext } from "../store"
import { Link } from 'react-router-dom';
import { PREFER_REMOVE_ITEM } from "../utils/constants";
import { HeartTwoTone } from '@ant-design/icons';

export default function PerferItem({ item }) {
    const { state: { preferItems }, dispatch } = useContext(StoreContext);
    const removeFromPrefer = (productId) => {
        dispatch({ type: PREFER_REMOVE_ITEM, payload: productId });
     };
    return (
        <Card
            hoverable
            className="bg-gray activity">
            <Link to={`/activity/${item.id}`}>
                <img
                    style={{ width: '100%' }}
                    src={item.image}
                    alt={item.name}
                    className="activityItem-img" />
            </Link>
            <div className="activity-info">
                <h6 className="activity-category">
                    {item.category}
                </h6>
                <h2 className="activity-name">
                    {item.name}
                </h2>
            </div>
            <div className="prefer-item-end">
                <div className="prefer-item-delete btn-toprefer" onClick={()=>removeFromPrefer(item.id)}>
                    <HeartTwoTone twoToneColor="#eb2f96" />
                </div>
            </div>
        </Card>
    );
}
