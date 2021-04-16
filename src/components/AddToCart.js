import { useContext } from "react";
import { Button,notification } from "antd"
import { StoreContext } from "../store"
import { CART_ADD_ITEM } from "../utils/constants"


export default function AddToCart({activity,qty,ticket}){
    const { dispatch } = useContext(StoreContext);
    const openNotification = () => {
        notification.open({
        message: '嘿 朋朋！',
        description:
            ` ${activity.name}在${activity.place_short}等著你ㄌ`,
        onClick: () => {
            console.log('Notification Clicked!');
        },
        placement: 'bottomRight'
        });
    };

    const addToCart = () => {
        openNotification();
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
              id: activity.id,
              name: activity.name,
              image: activity.image,
              price: activity.price[ticket],
              countInStock: activity.countInStock,
              qty,
            },
        });
    };
    return (
        <Button type="primary" className="btn-tocar" onClick={addToCart}>
          買爆
        </Button>
    );
}