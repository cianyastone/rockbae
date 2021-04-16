import { Row, Col, Button, Select, Breadcrumb, Card } from "antd";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { StoreContext } from "../store"
import { PREFER_ADD_ITEM, PREFER_REMOVE_ITEM } from "../utils/constants";
import PreferItem from "./PreferItem";

const { Option } = Select;

export default function PreferModal({ isModalVisible, toggleModal }) {
   const { state: { preferItems }, dispatch } = useContext(StoreContext);
   const handleCancel = () => toggleModal(!isModalVisible);
   const addToCart = (product, qty) => {
      dispatch({
         type: PREFER_ADD_ITEM,
         payload: {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty,
         },
      });
   };

   const removeFromPrefer = (productId) => {
      dispatch({ type: PREFER_REMOVE_ITEM, payload: productId });
   };

   const getTotalPrice = () => {
      return (preferItems.length > 0) ?
         preferItems.reduce((sum) => sum + 1, 0)
         : 0;
   }

   return (
      <div>
         <Breadcrumb className="breadcrumb--1">
            <Breadcrumb.Item className="breadcrumb">
               <Link to={`/Home`}>
               首頁
               </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
               <Link to={`/Prefer`} className="breadcrumb-item">
                  想去ㄉ活動
               </Link>
            </Breadcrumb.Item>
         </Breadcrumb>
         {preferItems.length === 0 ? (
            <div className="nopreference">泥還沒有喜歡ㄉ活動，泥484不喜歡我˚‧º·(˚ ˃̣̣̥⌓˂̣̣̥ )‧º·˚</div>
         ) : (
            <Row gutter={[32,32]}>
               {preferItems.map(item => (
                     <Col 
                        key={item.id} 
                        sm={{ span: 12 }} 
                        lg={{ span: 8 }}
                        xl={{ span: 6 }}
                        xxl={{ span: 4 }}
                     >
                     <PreferItem item={item}/>
                     </Col>
               ))}
            </Row> 
         )}
      </div>
   );
}