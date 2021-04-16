import { Row, Col, Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import ActivityItem from "./ActivityItem";
import BreadcrumbItem from "./BreadcrumbItem";

export default function Activity({activities}) {
    return(
        <>
        <BreadcrumbItem />
        <Row gutter={[24,24]}>
        {activities.map(activity => (
            <Col 
                key={activity.id} 
                sm={{ span: 24 }} 
                lg={{ span: 12 }}
                xl={{ span: 8 }}
                xxl={{ span: 8 }}
            >
                <ActivityItem activity={activity}/>
            </Col>
        ))}
        </Row> 
        </>      
    );
}