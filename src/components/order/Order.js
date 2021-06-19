import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
// import GooglePayButton from '@google-pay/button-react';
import { requestOrderDetail } from "../../actions"
import { StoreContext } from "../../store";

export default function OrderCard({ orderId }) {
   const { state: { orderDetail: { loading, order } }, dispatch } = useContext(StoreContext);
   const { orderItems } = order;
   const history = useHistory()
   const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#fff" }} spin />;

   const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["MASTERCARD", "VISA"]
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example"
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: "12345678901234567890",
        merchantName: "Demo Merchant"
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: String(order.totalPrice),
        currencyCode: "USD",
        countryCode: "US"
      }
    };

   useEffect(() => {
      requestOrderDetail(dispatch, orderId)
   }, [orderId])

   return (
      <>
         {loading
            ? (
               <div className=" order-container spinner-wrap">
                  <Spin indicator={antIcon} className="spinner" />
               </div>
            ) : (
               <>
               <p className="order-id">
                  訂單編號：{orderId}
               </p>
               <Row gutter={[48, 48]}>
                  <Col
                     xs={{ span: 20, offset: 2 }}
                     md={{ span: 12, offset: 0 }}
                     lg={{ span: 12, offset: 1 }}
                  >
                     <div className="Order-card">
                     <span className="dot dot-rd"></span>
                     <span className="dot dot-y"></span>
                     <span className="dot dot-g"></span>
                     <hr className="hr"></hr>
                        <h2 className="order-title">泥ㄉ運送資訊</h2>
                        <p className="order-text">
                           <strong>姓名：</strong> {order.shippingAddress.fullName} <br />
                           <strong>地址：</strong> {order.shippingAddress.address},
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  ,{order.shippingAddress.country}
                        </p>
                     </div>
                     <div className="Order-card">
                     <span className="dot dot-rd"></span>
                     <span className="dot dot-y"></span>
                     <span className="dot dot-g"></span>
                     <hr className="hr"></hr>
                        <h2 className="order-title">泥ㄉ付款資訊</h2>
                        <p className="order-text">
                           <strong>付款方式：</strong> {order.shippingAddress.paymentMethod}
                        </p>
                     </div>
                     <div className="Order-card">
                     <span className="dot dot-rd"></span>
                     <span className="dot dot-y"></span>
                     <span className="dot dot-g"></span>
                     <hr className="hr"></hr>
                        <h2 className="order-title">泥ㄉ訂單</h2>
                        {orderItems.length === 0 ? (
                           <div>Cart is empty</div>
                        ) : (
                           orderItems.map(item => (
                              <li key={item.id} className="cart-item">
                                 <div className="orderCard-image cart-image">
                                    <img src={item.image} alt={item.name} />
                                 </div>
                                 <div className="cart-item-content">
                                    <div className="cart-name">{item.name}</div>
                                    <div className="orderCard-text">{item.ticketClass}</div>
                                    <div className="orderCard-qty">
                                       數量：{item.qty}
                                    </div>
                                 </div>
                                 <div className="cart-item-end">
                                    <div className="orderCard-price">
                                       ${item.price * item.qty}
                                    </div>
                                 </div>

                              </li>
                           ))
                        )}
                        <div className="row orderCard-row">
                           <strong>總共</strong>
            <div className="orderCard-price">${order.totalPrice}</div>
                        </div>
                     </div>

                  </Col>
                  <Col
                     xs={{ span: 20, offset: 2 }}
                     md={{ span: 12, offset: 0 }}
                     lg={{ span: 10, offset: 0 }}
                  >
                     <div className="Order-card">
                     <span className="dot dot-rd"></span>
                     <span className="dot dot-y"></span>
                     <span className="dot dot-g"></span>
                     <hr className="hr"></hr>
                        <h2 className="order-title">總和</h2>
                        <div className="row orderCard-row">
                           <div>項目</div>
                           <div className="orderCard-price">${order.itemsPrice}</div>
                        </div>
                        <div className="row orderCard-row">
                           <div>運費</div>
                           <div className="orderCard-price">${order.shippingPrice}</div>
                        </div>
                        <div className="row orderCard-row">
                           <div>
                              <strong> 總共！</strong>
                           </div>
                           <div className="orderCard-price">
                              <strong>${order.totalPrice}</strong>
                           </div>
                        </div>
                     </div>

                  </Col>
               </Row>
               </>

            )

         }
      </>


   );
}