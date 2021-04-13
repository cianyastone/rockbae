import { Row, Col, Tabs, Radio, Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import React from 'react';
import { useState } from "react";

const { TabPane } = Tabs;
const renderTabBar = (props, DefaultTabBar) => (
   <Sticky bottomOffset={80}>
      {({ style }) => (
         <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
      )}
   </Sticky>
);

function ActivityDetail({ activity }) {
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
                  ${activity.price}
               </p>
            </div>
            <div className="activity-item">
               <p>票種</p>
               <Radio.Group defaultValue="c">
                  {[...Array(activity.ticketClass.length).keys()].map((x) => (
                     <Radio.Button value={activity.ticketClass[x]}>
                        {activity.ticketClass[x]}
                     </Radio.Button>
                  ))}
               </Radio.Group>
            </div>
         </div>           
         </Col>
         <Col span={24}>
            <StickyContainer>
               <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                  <TabPane tab="Tab 1" key="1" style={{ height: 200 }}>
                  Content of Tab Pane 1
                  </TabPane>
                  <TabPane tab="Tab 2" key="2">
                  Content of Tab Pane 2
                  </TabPane>
                  <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                  </TabPane>
               </Tabs>
            </StickyContainer>
         </Col>
      </Row>
      </>
   );
}

export default ActivityDetail;