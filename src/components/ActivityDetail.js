import { Row, Col, Tabs, Radio, Breadcrumb, InputNumber } from "antd";
import { Link } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import React from 'react';
import { useState } from "react";
import AddToCart from "./AddToCart"

const { TabPane } = Tabs;
const renderTabBar = (props, DefaultTabBar) => (
   <Sticky bottomOffset={80}>
      {({ style }) => (
         <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
      )}
   </Sticky>
);
function ActivityDetail({ activity }) {
   const [qty, setQty] = useState(activity.countInStock > 0 ? 1 : 0);
   const [ticket, setTicket] = useState(0);
   function onChange(e){
      setTicket(e.target.value);
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
      <Breadcrumb className="breadcrumb--1">
            <Breadcrumb.Item className="breadcrumb">
               <Link to={`/Home`}>
               首頁
               </Link>
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
               <Col span={2}>
                  <p>票種</p>
               </Col>
               <Col span={22}>
                  <App/>
               </Col>
               <Col span={2}>
                  <p>數量</p>
               </Col>
               <Col span={2}>
                  <InputNumber
                     min={1} 
                     max={4} 
                     defaultValue={1} 
                     className="input-number"
                     onChange={value=>setQty(value)}
                     disabled={activity.countInStock[ticket] > 0 ? false : true} />
               </Col>
               <Col className="ticket-qty">
                  <p className="notice">一人限購4張</p>
               </Col>
            </Row>
            <div className="activity-item">
               
               
               <onChange/>
            </div>
            <br/><br/>
            <AddToCart />
         </div>           
         </Col>
         <Col span={24}>
            <StickyContainer>
               <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
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
            </StickyContainer>
         </Col>
      </Row>
      </>
   );
}

export default ActivityDetail;