import { useContext, useEffect } from "react";
import { Button } from "antd"
import { StoreContext } from "../../store"
import Cookie from "js-cookie";
import {addCartItem} from "../../actions"


export default function AddToCart({activity, qty,ticket}){
    const { state: { cartItems },dispatch } = useContext(StoreContext);

    const addToCart = () => {
      addCartItem(dispatch, activity, qty, ticket);
    };

    useEffect(()=>{
      Cookie.set("cartItems", JSON.stringify(cartItems));
   }, [cartItems])

    return (
        <Button disabled={activity.countInStock[ticket] > 0 ? false : true} type="primary" className="btn-tocar" onClick={addToCart}>
          買爆
        </Button>
    );
}