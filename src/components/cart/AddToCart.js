import { useContext, useEffect } from "react";
import { Button } from "antd"
import { StoreContext } from "../../store"
import Cookie from "js-cookie";
import {addCartItem} from "../../actions"


export default function AddToCart(){
    const { state: { cartItems, activityDetail: { activity, ticketClass, qty } },dispatch } = useContext(StoreContext);

    const addToCart = () => {
      addCartItem(dispatch, activity, qty, ticketClass);
    };

    useEffect(()=>{
      Cookie.set("cartItems", JSON.stringify(cartItems));
   }, [cartItems])

    return (
        <Button type="primary" className="btn-tocar" onClick={addToCart}>
          買爆
        </Button>
    );
}