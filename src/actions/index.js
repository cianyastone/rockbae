import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from "../utils/constants";

export const cartItemAdd = (dispatch, activity, qty) => {
  const item = {
    id: activity.id,
    name: activity.name,
    image: activity.image,
    price: activity.price,
    countInStock: activity.countInStock,
    qty,
  };
  dispatch({
    type: CART_ADD_ITEM,
    payload: item,
  });
};

export const cartItemRemove = (dispatch, activityId) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: activityId,
  });
};