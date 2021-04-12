import { Row, Col, Breadcrumb } from "antd";
import ActivityItem from "./ActivityItem";

export default function Activity({activitys}) {
    return(
        <>
        <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb">
                <a href="/Home">首頁</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <a></a>
            </Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={[24,24]}>
        {activitys.map(activity => (
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