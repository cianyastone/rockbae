import { useContext,useState } from "react";
import { Button } from "antd"
import { StoreContext } from "../store"
import { CART_ADD_ITEM } from "../utils/constants"


export default function AddToCart({activity,qty,ticket}){
    const { dispatch } = useContext(StoreContext);

    const addToCart = () => {
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
              id: activity.id,
              name: activity.name,
              image: activity.image,
              price: activity.price[ticket],
              ticket: ticket,
              countInStock: activity.countInStock,
              qty,
            },
        });
    };

    return (
        <Button disabled={activity.countInStock[ticket] > 0 ? false : true} type="primary" className="btn-tocar" onClick={addToCart}>
          買爆
        </Button>
    );
}