import { 
    PREFER_ADD_ITEM,
    PREFER_REMOVE_ITEM, 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM, 
 } from "../utils/constants"

export const addPreferItem = (dispatch, activity) => {
    const item = {
        id: activity.id,
        name: activity.name,
        image: activity.image,
    };
    dispatch({
        type: PREFER_ADD_ITEM,
        payload: item,
    });
};

export const removeFromPrefer = (dispatch, activityId) => {
    dispatch({
        type: PREFER_REMOVE_ITEM, 
        payload: activityId,
    });
};

export const addCartItem = (dispatch, activity, qty, ticket) => {
    const item = {
      id: activity.id,
      name: activity.name,
      image: activity.image,
      price: activity.price[ticket],
      countInStock: activity.countInStock,
      qty,
    };
    dispatch({
      type: CART_ADD_ITEM,
      payload: item,
    });
};

export const addCartItemforModal = (dispatch, activity, qty) => {
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

export const removeFromCart = (dispatch, activityId) => {
    dispatch({
        type: CART_REMOVE_ITEM, 
        payload: activityId,
    });
};