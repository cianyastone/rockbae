import { useEffect, useContext } from "react";
// import { Link, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
// import { LoadingOutlined } from '@ant-design/icons';
import { getUserOrder } from "../../actions"
import { StoreContext } from "../../store";

export default function OrderList() {
  const { state: { userInfo, orderList }, dispatch } = useContext(StoreContext);
  // const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#8183ff" }} spin />;

  useEffect(() => {
    getUserOrder(dispatch);
  }, [userInfo]);

  return (
    <>
    <h2 className="orderList-title">訂單</h2>
    <Row>
      {orderList.length === 0 ?
        (
          <div className="orderList-list--empty">Your order list is empty.</div>
        ) : (
          <>
            {orderList.map( order => (
              <Col
                xs={{ span: 20 , offset: 6 }}
                sm={{ span: 20 , offset: 2 }}
                lg={{ span: 12 , offset: 0 }}
              >
              <div className="card card-body">
                <h2 style={{ color: 'black' }}>訂單編號：{order.id}</h2>
                {order.orderItems.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-content">
                      <div className="cart-name">{item.name}</div>
                      <div className="product-qty">
                        數量: {item.qty}
                      </div>
                    </div>
                    <div className="cart-item-end">
                      <div className="cart-price">
                        ${item.price * item.qty}
                      </div>
                    </div>
                  </li>
                ))}
                <div className="row">
                <div>項目</div>
                    <div>${order.itemsPrice}</div>
                  </div>
                <div className="row">
                <div>運費</div>
                <div>${order.shippingPrice}</div>
                </div>
                <div className="row">
                <div>
                    <strong>總共！</strong>
                </div>
                <div>
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
