import { Row, Col, Tabs, Radio, Breadcrumb } from "antd";
import { Link } from 'react-router-dom';

function ActivityDetail({ activity }) {
   const { TabPane } = Tabs;
   const Demo = () => (
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2" tabPosition="center">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    );

   return (
      <>
      <Breadcrumb className="breadcrumb--1">
            <Breadcrumb.Item className="breadcrumb">
                <a href="/Home">首頁</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
               <Link to={`/activity/${activity.id}`}>
                  {activity.name}
               </Link>
            </Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[4, 32]}>
         <Col lg={{ span: 8 }}>
         <img
            alt={activity.name}
            className="activity-image"
            src={activity.image}
         />           
         </Col>
         <Col lg={{ span: 12 }} >
         <div className="activity-info--detail">
            <h1 className="activity-name activity-name--large">
               {activity.name}
            </h1>
            <div className="activity-price-wrap">
               <p className="activity-price activity-price--large">
                  ${activity.price}.00
               </p>
            </div>
            <div className="activity-item">
               <p className="activity-item--name">
                  票種
               </p>
               <Radio.Group defaultValue="a">
                  <Radio.Button value="a">Hangzhou</Radio.Button>
                  <Radio.Button value="b">Shanghai</Radio.Button>
                  <Radio.Button value="c">Beijing</Radio.Button>
                  <Radio.Button value="d">Chengdu</Radio.Button>
               </Radio.Group>
            </div>
         </div>           
         </Col>
         <Col span={24}>
            <Demo />
         </Col>
      </Row>
      </>
   );
}

export default ActivityDetail;