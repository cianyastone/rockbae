import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { createOrder, resetOrder } from "../../actions"
import { StoreContext } from "../../store";

export default function PlaceOrderCard() {
  const { state: { cart, orderInfo: { loading, success, order } }, dispatch } = useContext(StoreContext);
  const { cartItems } = cart;
  const history = useHistory()
  const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#8183ff" }} spin />;

  const placeOrderHandler = () => {
    createOrder(dispatch, cart)
  };

  const getTotalPrice = () => {
    return (cartItems.length > 0) ?
      cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
      : 0;
  }

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  useEffect(() => {
    if (success) {
      resetOrder(dispatch);
      // requestOrderDetail(dispatch, order.id)
      history.push(`/order/${order.id}`);
    }
  }, [success]);

  return (
    <>
      {loading
        ? (
          <div className="spinner-wrap">
            <Spin indicator={antIcon} className="spinner" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            <Col
              xs={{ span: 20, offset: 2 }}
              lg={{ span: 13, offset: 2 }}
            >
              <div className="Order-card">
                <span className="dot dot-rd"></span>
                <span className="dot dot-y"></span>
                <span className="dot dot-g"></span>
                <hr className="hr"></hr>
                <h2 className="order-title">泥ㄉ運送資訊</h2>
                <p className="order-content">
                  <strong>姓名：</strong> {cart.shippingAddress.fullName} <br />
                  <strong>地址：</strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </p>
              </div>
              <div className="Order-card">
                <span className="dot dot-rd"></span>
                <span className="dot dot-y"></span>
                <span className="dot dot-g"></span>
                <hr className="hr"></hr>
                <h2 className="order-title">泥ㄉ付款資訊</h2>
                <p className="order-content">
                  <strong>付款方式：</strong> {cart.shippingAddress.paymentMethod}
                </p>
              </div>
              <div className="Order-card">
                <span className="dot dot-rd"></span>
                <span className="dot dot-y"></span>
                <span className="dot dot-g"></span>
                <hr className="hr"></hr>
                <h2 className="order-title">泥ㄉ訂單</h2>
                {cartItems.length === 0 ? (
                  <div>Cart is empty</div>
                ) : (
                  cartItems.map(item => (
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
                  總共
            <div className="orderCard-price">${getTotalPrice()}</div>
                </div>
              </div>

            </Col>
            <Col
              xs={{ span: 20, offset: 2 }}
              lg={{ span: 7, offset: 0 }}
            >
              <div className="Order-card">
                <span className="dot dot-rd"></span>
                <span className="dot dot-y"></span>
                <span className="dot dot-g"></span>
                <hr className="hr"></hr>
                <h2 className="order-title">總和</h2>
                <div className="row orderCard-row">
                    <div>項目</div>
                    <div className="orderCard-price">${cart.itemsPrice}</div>
                  </div>
                  <div className="row orderCard-row">
                    <div>運費</div>
                    <div className="orderCard-price">${cart.shippingPrice}</div>
                  </div>
                  <div className="row orderCard-row">
                    <div>
                      <strong>總共！</strong>
                    </div>
                    <div className="orderCard-price">
                      <strong>${cart.totalPrice}</strong>
                    </div>
                  </div>
                  <Button
                    className="primary-btn"
                    block
                    type="primary"
                    onClick={placeOrderHandler}
                    style={{ background: "#8C9C9D", borderColor: "#8C9C9D" }}
                  >
                    完成訂單！
                </Button>
                </div>

            </Col>
          </Row>
        )
      }
    </>

  );
}

