import { Row, Col } from "antd";
import ActivityItem from "./ActivityItem";


export default function Activity({activitys}){
    return(
        <Row gutter={[32, 32]}>
        {activitys.map(activity => (
            <Col 
                key={activity.id} 
                sm={{ span: 12 }} 
                lg={{ span: 8 }}
                xl={{ span: 6 }}
                xxl={{ span: 4 }}
            >
            <ActivityItem activity={activity}/>
            </Col>
        ))}
    </Row>

            
    )
}