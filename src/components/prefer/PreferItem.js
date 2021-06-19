import { Card } from "antd"
import { useContext } from "react";
import { StoreContext } from "../../store"
import { Link } from 'react-router-dom';
import { HeartTwoTone } from '@ant-design/icons';
import {removeFromPrefer} from "../../actions"

export default function PerferItem({ item }) {
    const { state: { preferItems }, dispatch } = useContext(StoreContext);
    return (
        <Card
            hoverable
            className="activity">
            <Link to={`/activity/${item.id}`}>
                <img
                    style={{ width: '100%' }}
                    src={item.image}
                    alt={item.name}
                    className="prefer-img" />
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
                <div className="prefer-item-delete btn-toprefer" onClick={()=>removeFromPrefer(dispatch, item.id)}>
                    <HeartTwoTone twoToneColor="#eb2f96" />
                </div>
            </div>
        </Card>
    );
}
