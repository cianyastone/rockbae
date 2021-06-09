import { useContext } from "react";
import { Row, Col } from "antd";
import ActivityItem from "./ActivityItem";
import { StoreContext } from "../../store";

export default function Activity() {
    const { state: { page: { activities }, requestActivity: { loading } } } = useContext(StoreContext);
    return(
        <>
        <Row>
        {activities.map(activity => (
            <Col 
                key={activity.id} 
                xs={{ span: 24 }} 
                sm={{ span: 24 }} 
                lg={{ span: 8 }}
                xl={{ span: 6 }}
                xxl={{ span: 6 }}
            >
                <ActivityItem activity={activity}/>
            </Col>
        ))}
        </Row> 
        </>      
    );
}