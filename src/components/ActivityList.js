import { Row, Col } from "antd";
import ActivityItem from "./ActivityItem";
import BreadcrumbItem from "./BreadcrumbItem";

export default function Activity({activities}) {
    return(
        <>
        <BreadcrumbItem />
        <Row gutter={[24,32]}>
        {activities.map(activity => (
            <Col 
                key={activity.id} 
                xs={{ span: 24 }} 
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