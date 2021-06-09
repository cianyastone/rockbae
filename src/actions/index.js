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
  BEGIN_POST_REQUEST,
  SUCCESS_POST_REQUEST,
  FAIL_POST_REQUEST,
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
  BEGIN_COMMENT,
  SUCCESS_COMMENT,
  SET_POST_DETAIL,
  BEGIN_THUMBS_UP,
  SUCCESS_THUMBS_UP,
  FAIL_THUMBS_UP,
  BEGIN_THUMBS_DOWN,
  SUCCESS_THUMBS_DOWN,
  FAIL_THUMBS_DOWN,
  FAVORITE_ADD_ITEM,
  FAVORITE_REMOVE_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  BEGIN_ORDER_CREATE,
  SUCCESS_ORDER_CREATE,
  FAIL_ORDER_CREATE,
  RESET_ORDER,
  BEGIN_ORDER_DETAIL,
  SUCCESS_ORDER_DETAIL,
  FAIL_ORDER_DETAIL,
  EMPTY_CART,
  GET_ORDER_LIST,
} from "../utils/constants"

import {
  getActivityById,
  getActivities,
  getPosts,
  signInWithEmailPassword,
  registerWithEmailPassword,
  signOut,
  updateUserInfoApi,
  createPostApi,
  createCommentApi,
  getPostById,
  thumbsUpApi,
  thumbsDownApi,
  getLikesByPost,
  getCommentsByPost,
  checkLike,
  createOrderApi,
  getOrderById,
  getOrderByUser,
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
  let posts;
  dispatch({ type: BEGIN_ACTIVITY_REQUEST });
  try {
    activities = await getActivities();
    posts = await getPosts();
    dispatch({
      type: SET_PAGE_CONTENT,
      payload: { activities, posts },
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
      recommend:postData.recommend,
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

export const setPostDetail = async (dispatch, postId) => {
  const post = await getPostById(postId);
  const like = await getLikesByPost(postId);
  const comment = await getCommentsByPost(postId);
  const checkIfLiked = await checkLike(postId);
  dispatch({
    type: SET_POST_DETAIL,
    payload: {
      post,
      like,
      comment,
      checkIfLiked,
    }
  })
}

export const setPostPage = async (dispatch, url) => {
  let posts;
  let activities;
  dispatch({ type: BEGIN_POST_REQUEST });
  try {
    posts = await getPosts(url);
    activities = await getActivities();
    dispatch({
      type: SET_PAGE_CONTENT,
      payload: { posts, activities },
    });
    dispatch({ type: SUCCESS_POST_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_POST_REQUEST, payload: error });
  }
}

export const addFavoriteItem = (dispatch, post) => {
  const item = {
    id: post.id,
    article: post.article,
    content: post.content,
  };
  dispatch({
    type: FAVORITE_ADD_ITEM,
    payload: item,
  });
};

export const removeFromFavorite = (dispatch, postId) => {
  dispatch({
    type: FAVORITE_REMOVE_ITEM, 
    payload: postId,
  });
};

export const thumbsUp = async (dispatch, postId) => {
  dispatch({ type: BEGIN_THUMBS_DOWN });
  const post= await thumbsUpApi(postId);
  try {
    dispatch({ type: SUCCESS_THUMBS_DOWN, payload: { post }, });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_THUMBS_DOWN, payload: error });
  }
};

export const thumbsDown = async (dispatch, postId) => {
  dispatch({ type: BEGIN_THUMBS_DOWN });
  const post= await thumbsDownApi(postId);
  try {
    dispatch({ type: SUCCESS_THUMBS_DOWN, payload: { post }, });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_THUMBS_DOWN, payload: error });
  }
};

export const createComment = async (dispatch, postId, commentData) => {
  dispatch({ type: BEGIN_COMMENT });
  try {
    const commentInfo = await createCommentApi(postId, commentData);
    dispatch({ 
      type: SUCCESS_COMMENT, 
      payload: commentInfo
    });
    return commentInfo;
  } catch (error) {
    console.log(error);
    //dispatch({ type: FAIL_POSTING, payload: error });
    return null;
  }  
};

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

export const createOrder = async (dispatch, cart) => {
  dispatch({ type: BEGIN_ORDER_CREATE });
  try {
    const item = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    };    
    const orderInfo = await createOrderApi(item);
    localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
    dispatch({ 
      type: SUCCESS_ORDER_CREATE, 
      payload: orderInfo
    });
    dispatch({ type: EMPTY_CART,})
    
    localStorage.removeJSON("cartItems");
    return orderInfo;
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_ORDER_CREATE, payload: error });
    return null;
  }  
};

export const requestOrderDetail = async (dispatch, orderId) => {
  dispatch({ type: BEGIN_ORDER_DETAIL });
  try {
    const order = await getOrderById(orderId);
    dispatch({ 
      type: SUCCESS_ORDER_DETAIL,
      payload: order
    });
  } catch (error) {
    dispatch({ 
      type: FAIL_ORDER_DETAIL, 
      payload: error 
    });
  }
}

export const resetOrder = (dispatch) => {
  dispatch({ type: RESET_ORDER });
}

export const getUserOrder = async (dispatch) => {
  const orderList = await getOrderByUser();
  dispatch({
    type: GET_ORDER_LIST,
    payload: orderList,
  });
}