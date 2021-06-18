import { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { Button, Select } from "antd";
import CartSummary from "./CartSummary";
import { useContext } from "react";
import { StoreContext } from "../../store"
import Cookie from "js-cookie";
import { Link, useHistory, NavLink } from 'react-router-dom';
import {removeFromCart, addCartItemforModal} from "../../actions/index"
import UserModal from "../user/UserModal";

const { Option } = Select;

export default function CartModal() {
    const [visible, setVisible] = useState(false);
    const { state: { cart: { cartItems }, userSignin: { userInfo } }, dispatch } = useContext(StoreContext);

    const showDrawer = () => {setVisible(true);};
    const onClose = () => {setVisible(false);};

    const history = useHistory();
    const checkoutHandler = () => {
        history.push("/shipping");
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        onClose();
        setIsModalVisible(!isModalVisible);
    };
    
    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
     }, [cartItems])

    const getTotalPrice = () => {
        return (cartItems.length > 0) ?
            cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
            : 0;
    }
  
    return (
        <>
        <div onClick={showDrawer}>
            <CartSummary/>
        </div>
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
                    <Link to={`/activity/${item.id}`}>
                        <div className="cart-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                    </Link>
                    <div className="cart-item-content">
                        <div className="cart-qty">
                            <Link to={`/activity/${item.id}`} className="cart-name link">{item.name}</Link>
                            <div className="cart-item-delete" onClick={()=>removeFromCart(dispatch, item.ticketClass)}>
                                x
                            </div>
                        </div>
                        <div className="product-qty">
                            票種: {item.ticketClass}
                        </div>
                        <div className="cart-qty">
                            <div className="product-qty">
                                數量: {"   "}
                                <Select
                                    defaultValue={item.qty}
                                    className="select-style"
                                    onChange={(val) => addCartItemforModal(dispatch, item, val)}
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
        {userInfo
        ?<Button
            className="cart-modal-btn"
            type="primary"
            onClick={checkoutHandler}
            style={{ background: "#A2B9BD", borderColor: "#A2B9BD" }}
        >
            <span>結帳去</span>
        </Button>
        :<Button
            className="cart-modal-btn"
            type="primary"
            onClick={toggleModal}
        >  
            <span>結帳去</span>
            <UserModal isModalVisible={isModalVisible} toggleModal={toggleModal}/>
        </Button>
        }
    </Drawer>
    </>
);}