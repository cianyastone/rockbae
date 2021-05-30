import { Row, Col, Tabs, Radio, InputNumber } from "antd";
import React from 'react';
import { useContext } from "react";
import AddToCart from "../cart/AddToCart"
import BreadcrumbItem from "../normal/BreadcrumbItem";
import { StoreContext } from "../../store"
import { setActivityDetail } from "../../actions";

const { TabPane } = Tabs;
function ActivityDetail({activity}) {
   const { state: { activityDetail: { ticket, qty} }, dispatch } = useContext(StoreContext);

   function onChange(e){
      setActivityDetail(dispatch, activity.id, e.target.value, qty);
   };
   
   const App = () => (
      <Radio.Group value={ticket} onChange={onChange}>
         {[...Array(activity.ticketClass.length).keys()].map((x) => (
            <Radio.Button value={x} className="radio-style ">
               {activity.ticketClass[x]}
            </Radio.Button>
         ))}
      </Radio.Group>
   );
   return (
      <>
      <BreadcrumbItem link={`activity/${activity.id}`} name={activity.name} />
      <Row gutter={[4, 32]}>
         <Col lg={{ span: 8 }}>
         <img
            alt={activity.name}
            className="activity-image"
            src={activity.image}
         />           
         </Col>
         <Col lg={{ span: 16 }} >
         <div className="activity-info--detail">
            <h1 className="activity-name activity-name--large">
               {activity.name}
            </h1>
            <div className="activity-price-wrap">
               <p className="activity-price activity-price--large">
                  ${activity.price > "0" ? activity.price[ticket] : "FREE"}
               </p>
            </div>
            <Row gutter={[8, 16]} className="activity-item">
               <Col 
                  xs={{ span: 24 }} 
                  sm={{ span: 24 }} 
                  lg={{ span: 2 }}
                  xl={{ span: 2 }}
                  xxl={{ span: 2 }}>
                  票種
               </Col>
               <Col 
                  xs={{ span: 24 }} 
                  sm={{ span: 24 }} 
                  lg={{ span: 22 }}
                  xl={{ span: 22 }}
                  xxl={{ span: 22 }}>
                  <App/>
               </Col>
               <Col 
                  xs={{ span: 24 }} 
                  sm={{ span: 24 }} 
                  lg={{ span: 2 }}
                  xl={{ span: 2 }}
                  xxl={{ span: 2 }}>
                  <p>數量</p>
               </Col>
               <Col 
                  xs={{ span: 24 }} 
                  sm={{ span: 24 }} 
                  lg={{ span: 22 }}
                  xl={{ span: 22 }}
                  xxl={{ span: 22 }}>
                  <InputNumber
                     min={1} 
                     max={4} 
                     defaultValue={1} 
                     className="input-number"
                     onChange={val => setActivityDetail(dispatch, activity.id, ticket, val, activity.category)}
                  />
               </Col>
               <Col className="ticket-qty">
                  <p className="notice">一人限購4張</p>
               </Col>
            </Row>
            <div className="activity-item">
               <onChange/>
            </div>
            <br/><br/>
            <AddToCart activity={activity} qty={qty} ticket={ticket}/>
         </div>           
         </Col>
         <Col span={24}>
               <Tabs defaultActiveKey="1">
                  <TabPane tab="簡介" key="1">
                  <p>
                     {activity.description_long}
                     <br/><br/>
                     活動名稱：{activity.name}<br/>
                     演出日期：{activity.date}<br/>
                     演出地點：{activity.place}<br/>
                  </p>
                  </TabPane>
                  <TabPane tab="演出陣容" key="2">
                  Content of Tab Pane 2
                  </TabPane>
                  <TabPane tab="主辦單位" key="3">
                  <p>
                     {activity.organizer}
                  </p>
                  </TabPane>
               </Tabs>
         </Col>
      </Row>
      </>
   );
}

export default ActivityDetail;