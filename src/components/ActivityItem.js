import { Card } from "antd"
import { Link } from 'react-router-dom';

export default function ActivityItem({ activity }) {
    return (
        <Card className="bg-gray activity">
            <Link to={`/activity/${activity.id}`}>
                <img
                    style={{ width: '100%' }}
                    src={activity.image}
                    alt={activity.name} />
            </Link>
            <div className="activity-info">
                <h6 className="activity-category">
                    {activity.category}
                </h6>
                <h2 className="activity-name">
                    {activity.name}
                </h2>
                <p className="activity-description">
                    {activity.description}
                </p>
                <div className="activity-more">
                    <Link to={`/activity/${activity.id}`} className="activity-link">
                        See More ...
                    </Link>
                    <span
                        className="text-gray">
                        USD {activity.price}.00
                    </span>
                </div>
            </div>
        </Card>
    );
}
