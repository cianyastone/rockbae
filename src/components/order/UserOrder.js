import { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import { getUserOrder } from "../../actions"
import { StoreContext } from "../../store";
import BreadcrumbItem from "../normal/BreadcrumbItem";

export default function OrderList() {
  const { state: { userInfo, orderList }, dispatch } = useContext(StoreContext);
  // const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#8183ff" }} spin />;

  useEffect(() => {
    getUserOrder(dispatch);
  }, [userInfo]);

  return (
    <>
    <BreadcrumbItem  name='我的訂單' />
    <Row>
      {orderList.length === 0 ?
        (
          <div className="orderList-list--empty">Your order list is empty.</div>
        ) : (
          <>
            {orderList.map( order => (
              <Col
              xs={{ span: 20, offset: 2 }}
              md={{ span: 12, offset: 0 }}
              lg={{ span: 12 , offset: 0 }}
              >
              <div className="userOrder-card">
                <span className="dot dot-rd"></span>
                <span className="dot dot-y"></span>
                <span className="dot dot-g"></span>
                <hr className="hr"></hr>
                <h4 className="orderCard-title">訂單編號：{order.id}</h4>
                {order.orderItems.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="orderCard-image cart-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-content">
                      <div className="cart-name">{item.name}</div>
                      <div className="orderCard-text">{item.ticketClass}</div>
                      <div className="orderCard-qty">
                        數量: {item.qty}
                      </div>
                    </div>
                    <div>
                      <div className="orderCard-price">
                        ${item.price * item.qty}
                      </div>
                    </div>
                  </li>
                ))}
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
                    <strong>總共！</strong>
                </div>
                <div className="orderCard-price">
                    <strong>${order.totalPrice}</strong>
                </div>
                </div>
              </div>
            </Col>
          ))}
          </>
      )}
    </Row>
    </>
  );
}
