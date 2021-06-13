import { useContext } from "react";
import { Row, Col, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import ActivityItem from "./ActivityItem";
import { StoreContext } from "../../store";

export default function Activity() {
    const { state: { page: { activities }, requestActivity: { loading } } } = useContext(StoreContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#FFF" }} spin />;
    return(
        <>
        {loading
        ? (
            <div className="spinner-wrap"><Spin indicator={antIcon} className="spinner"/></div>
        ) : (
        <Row>
        {activities.map(activity => (
            <Col 
                key={activity.id} 
                xs={{ span: 24 }} 
                sm={{ span: 12 }} 
                lg={{ span: 8 }}
                xl={{ span: 6 }}
                xxl={{ span: 4 }}
            >
                <ActivityItem activity={activity}/>
            </Col>
        ))}
        </Row> 
        )}
        </>      
    );
}