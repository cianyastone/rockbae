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
    <h2 className="orderList-title">Order List</h2>
    <Row>
      {orderList.length === 0 ?
        (
          <div className="orderList-list--empty">Your order list is empty.</div>
        ) : (
          <>
            {orderList.map( order => (
              <Col
                xs={{ span: 20 , offset: 2 }}
                sm={{ span: 20 , offset: 2 }}
                lg={{ span: 12 , offset: 6 }}
              >
              <div className="card card-body">
                <h2 style={{ color: 'white' }}>{order.id}</h2>
                {order.orderItems.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-content">
                      <div className="cart-name">{item.name}</div>
                      <div className="product-qty">
                        Qty: {item.qty}
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
                  <div>Items</div>
                  <div>${order.itemsPrice}</div>
                </div>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </div>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </div>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
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
