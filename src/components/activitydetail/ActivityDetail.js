import { Row, Col, Tabs, Radio, InputNumber } from "antd";
import React from 'react';
import { useContext } from "react";
import AddToCart from "../cart/AddToCart"
import BreadcrumbItem from "../normal/BreadcrumbItem";
import { StoreContext } from "../../store"
import { setActivityDetail } from "../../actions";
import { useSpring, animated } from 'react-spring'

const { TabPane } = Tabs;
function ActivityDetail() {
   const { state: { activityDetail: { activity, ticket, qty} }, dispatch } = useContext(StoreContext);

   function onChange(e){
      var result = (activity.ticketClass).indexOf(e.target.value);
      setActivityDetail(dispatch, activity.id, result, qty);
   };
   
   const App = () => (
      <Radio.Group value={ticket} onChange={onChange}>
         {activity.ticketClass.length >0
         ?(activity.ticketClass).map(x => (
            <Radio.Button value={x} className="radio-style ">
               {x}
            </Radio.Button>
         ))
         :<Radio.Button value={ticket} className="radio-style ">
            {ticket}
         </Radio.Button>
         }
      </Radio.Group>
   );
   const STATUS = {
      STILL: "still",
      GOING_UP: "up",
      GOING_DOWN: "down"
    };

   const trans = status =>
   status === STATUS.STILL ? 0 : status === STATUS.GOING_UP ? 1000 : 100;

   const useHover = () => {
      const [props, set] = useSpring(() => ({
        scale: 1,
        status: STATUS.STILL,
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.62)",
        config: { mass: 2, tension: 170, friction: 12 }
      }));
      const onMouseLeave = () =>
      set({
        to: [
          {
            scale: 1,
            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.62)",
            status: STATUS.GOING_DOWN,
            
          },
          { status: STATUS.STILL }
        ]
      }); 
      const onMouseEnter = () =>
      set({
         to: [
         { status: STATUS.GOING_UP },
         {
            scale: 1.1,
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.42)",
            transform: 'translate3d(0px,0,1)',
         }
         ]
      });
  return [props, onMouseEnter, onMouseLeave];
};
   const [leftIconProps, onLeftIconEnter, onLeftIconLeave] = useHover();
   const [midIconProps, onMidIconEnter, onMidIconLeave] = useHover();
   const [rightIconProps, onRightIconEnter, onRightIconLeave] = useHover();
   
   return (
      <>
      <BreadcrumbItem link={`activity/${activity.id}`} name={activity.name} />
      <Row gutter={[4, 32]}>
         <Col lg={{ span: 8 }}>
         <animated.img
            alt={activity.name}
            className="activity-image"
            src={activity.image}
            style={
            {scale: leftIconProps.scale,
            boxShadow: leftIconProps.boxShadow,
            zIndex: leftIconProps.status.to(trans)}}
            onMouseEnter={onLeftIconEnter}
            onMouseLeave={onLeftIconLeave}
         />            
         </Col>
         <Col lg={{ span: 8 }} >
         <animated.div 
         className="activity-info--detail"
         style={
            {scale: midIconProps.scale,
            boxShadow: midIconProps.boxShadow,
            zIndex: midIconProps.status.to(trans)}}
            onMouseEnter={onMidIconEnter}
            onMouseLeave={onMidIconLeave}
         >
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
         </animated.div>           
         </Col>
         <Col span={8}>
               <animated.div
               style={
                  {scale: rightIconProps.scale,
                  boxShadow: rightIconProps.boxShadow,
                  zIndex: rightIconProps.status.to(trans)}}
                  onMouseEnter={onRightIconEnter}
                  onMouseLeave={onRightIconLeave}
               className="activity-info--detail"
               >
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
               </animated.div>
         </Col>
      </Row>
      </>
   );
}

export default ActivityDetail;