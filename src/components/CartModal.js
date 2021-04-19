import { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { Button, Select } from "antd";
import CartSummary from "./CartSummary";
import { useContext } from "react";
import { StoreContext } from "../store"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../utils/constants";
import Cookie from "js-cookie";

const { Option } = Select;

export default function CartModal() {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      setVisible(false);
    };

    const { state: { cartItems }, dispatch } = useContext(StoreContext);

    useEffect(()=>{
        Cookie.set("cartItems", JSON.stringify(cartItems));
     }, [cartItems])

    const addToCart = (activity, qty) => {
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                id: activity.id,
                name: activity.name,
                image: activity.image,
                price: activity.price,
                countInStock: activity.countInStock,
                qty,
            },
        });
    };

    const removeFromCart = (activityId) => {
        dispatch({ type: CART_REMOVE_ITEM, payload: activityId });
    };

    const getTotalPrice = () => {
        return (cartItems.length > 0) ?
            cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
            : 0;
    }
  
    return (
      <>
        <p className="nav-item" activeClassName="nav-item--active" type="primary" onClick={showDrawer}>
            <CartSummary/>
        </p>
        <Drawer
          closable={false}
          onClose={onClose}
          visible={visible}
          className="drawer_style"
          width="350"
        >
          {cartItems.length === 0 ? (
            <div>婐ㄉ心空空如也。･ﾟ･(つд`ﾟ)･ﾟ･</div>
         ) : (
            cartItems.map(item => (
                <div className="cart-item">
                    <div className="cart-image">
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-content">
                        <div className="cart-qty">
                            <div className="cart-name">{item.name}</div>
                            <div className="cart-item-delete" onClick={()=>removeFromCart(item.id)}>
                                x
                            </div>
                        </div>
                        <div className="cart-qty">
                            <div className="product-qty">
                                數量: {"   "}
                                <Select
                                    defaultValue={item.qty}
                                    className="select-style"
                                    onChange={(val) => addToCart(item, val)}
                                    >
                                    <Option key={1} value={1}>
                                        {1}
                                    </Option>
                                    <Option key={2} value={2}>
                                        {2}
                                    </Option>
                                    <Option key={3} value={3}>
                                        {3}
                                    </Option>
                                    <Option key={4} value={4}>
                                        {4}
                                    </Option>
                                </Select>
                            </div>
                            <div className="cart-price">
                                ${item.price * item.qty}    
                            </div>
                        </div>
                    </div>
                </div>
            ))
         )}
        <div className="cart-total-price-wrap">
            Total
            <div className="cart-total-price">${getTotalPrice()}</div>
        </div>
        <Button
            className="cart-modal-btn"
            type="primary"
            >
            <span>結帳去</span>
            </Button>
    </Drawer>
    </>
);}