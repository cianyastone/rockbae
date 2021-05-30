import { 
  SET_PAGE_CONTENT,
    PREFER_ADD_ITEM,
    PREFER_REMOVE_ITEM, 
    CART_ADD_ITEM,
    CART_REMOVE_ITEM, 
    SET_ACTIVITY_DETAIL,
    BEGIN_ACTIVITY_REQUEST,
    SUCCESS_ACTIVITY_REQUEST,
    FAIL_ACTIVITY_REQUEST,
    BEGIN_LOGIN_REQUEST,
    SUCCESS_LOGIN_REQUEST,
    FAIL_LOGIN_REQUEST,
    LOGOUT_REQUEST,
    REMEMBER_LOGIN,
    BEGIN_REGISTER_REQUEST,
    SUCCESS_REGISTER_REQUEST,
    FAIL_REGISTER_REQUEST,
    BEGIN_UPDATE_USERINFO,
    SUCCESS_UPDATE_USERINFO,
    FAIL_UPDATE_USERINFO,
    BEGIN_POSTING,
    SUCCESS_POSTING,
    BEGIN_POST_DETAIL,
    SUCCESS_POST_DETAIL,
    FAIL_POST_DETAIL,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
} from "../utils/constants"

import {
  getActivityById,
  getActivities,
    signInWithEmailPassword,
    registerWithEmailPassword,
    signOut,
    updateUserInfoApi,
    createPostApi,
    getPostById,
} from "../api";


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
      ticketClass: activity.ticketClass[ticket],
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
      ticketClass: activity.ticketClass,
      price: activity.price,
      countInStock: activity.countInStock,
      qty,
    };
    dispatch({
      type: CART_ADD_ITEM,
      payload: item,
    });
};

export const removeFromCart = (dispatch, activityTicketClass) => {
    dispatch({
        type: CART_REMOVE_ITEM, 
        payload: activityTicketClass,
    });
};

export const setActivityDetail = async (dispatch, activityId, ticket, qty) => {
  try {
    const activity = await getActivityById(activityId);
    dispatch({
      type: SET_ACTIVITY_DETAIL,
      payload: {
        activity,
        ticket,
        qty,
      }
    })
  } catch (error) {
    console.log(error);
    dispatch({ payload: error });
  }
}

export const setPage = async (dispatch) => {
  let activities;
  dispatch({ type: BEGIN_ACTIVITY_REQUEST });
  try {
    activities = await getActivities();
    dispatch({
      type: SET_PAGE_CONTENT,
      payload: { activities },
    });
    dispatch({ type: SUCCESS_ACTIVITY_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_ACTIVITY_REQUEST, payload: error });
  }
}

export const loginToFirebase = async (dispatch, userInfo) => {
    dispatch({ type: BEGIN_LOGIN_REQUEST });
    try {
      const user = await signInWithEmailPassword(userInfo.email, userInfo.password);
      dispatch({
        type: SUCCESS_LOGIN_REQUEST,
        payload: user.user.providerData[0],
      })
      return user;
    } catch (e) {
      dispatch({
        type: FAIL_LOGIN_REQUEST,
        payload: e.message
      })
      console.log(e)
      return null;
    }
}
  
export const rememberLoginUser = (dispatch, remember) => {
    dispatch({
      type: REMEMBER_LOGIN,
      payload: remember,
    })
}
  
export const registerToFirebase = async (dispatch, userInfo) => {
    dispatch({ type: BEGIN_REGISTER_REQUEST });
    try {
      const user = await registerWithEmailPassword(userInfo.email, userInfo.password, userInfo.name);
      console.log(user)
      dispatch({
        type: SUCCESS_REGISTER_REQUEST,
        payload: user.providerData[0],
      })
      return user;
    } catch (e) {
      dispatch({
        type: FAIL_REGISTER_REQUEST,
        payload: e.message
      })
      console.log(e)
      return null;
    }
}
  
export const updateUserInfo = async (dispatch, userInfo) => {
    dispatch({ type: BEGIN_UPDATE_USERINFO });
    try {
      const user = await updateUserInfoApi(
        userInfo.email,
        userInfo.password,
        userInfo.name
      );
      dispatch({
        type: SUCCESS_UPDATE_USERINFO,
        payload: user.providerData[0],
      });
    } catch (e) {
      dispatch({
        type: FAIL_UPDATE_USERINFO,
        payload: e.message,
      });
      console.log(e);
    }
};
  
export const logoutFromFirebase = async (dispatch) => {
    signOut();
    dispatch({ type: LOGOUT_REQUEST });
}

export const createPost = async (dispatch, postData) => {
  dispatch({ type: BEGIN_POSTING });
  try {
    const post = {
      article: postData.article,
      activity: postData.activity,
      content: postData.content,
    };    
    const postInfo = await createPostApi(post);
    dispatch({ 
      type: SUCCESS_POSTING, 
      payload: postInfo
    });
    return postInfo;
  } catch (error) {
    console.log(error);
    //dispatch({ type: FAIL_POSTING, payload: error });
    return null;
  }  
};

export const requestPostDetail = async (dispatch, postId) => {
  dispatch({ type: BEGIN_POST_DETAIL });
  try {
    const post = await getPostById(postId);
    dispatch({ 
      type: SUCCESS_POST_DETAIL,
      payload: post
    });
  } catch (error) {
    dispatch({ 
      type: FAIL_POST_DETAIL, 
      payload: error 
    });
  }
}

export const saveShippingAddress = (dispatch, shippingAddress) => {
  console.log('Address: ')
  console.log(shippingAddress)
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
}

export const savePaymentMethod = (dispatch, paymentMethod) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: paymentMethod.paymentMethod,
  });
}