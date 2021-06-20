import { createContext } from "react";
import useReducerWithThunk from 'use-reducer-thunk';
import Cookie from "js-cookie";

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
  BEGIN_POST_REQUEST,
  SUCCESS_POST_REQUEST,
  FAIL_POST_REQUEST,
  SET_POST_DETAIL,
  FAVORITE_ADD_ITEM,
  FAVORITE_REMOVE_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  BEGIN_COMMENT,
  SUCCESS_COMMENT,
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

export const StoreContext = createContext();
let preferItems = Cookie.getJSON("preferItems");
if(!preferItems) preferItems = []; 

let cartItems;
try{
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (!cartItems) cartItems = [];
} catch(e) {
  cartItems = [];
}

let shippingAddress;
try {
  shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
} catch(e) {
  shippingAddress = {};
}
let favoriteItems = Cookie.getJSON("favoriteItems");
if(!favoriteItems) favoriteItems = []; 

let orderInfo_order;
try {
  orderInfo_order = JSON.parse(localStorage.getItem('orderInfo'));
} catch(e) {
  orderInfo_order = { id: "" };
}

const initialState = {
  allActivites: [],
  preferItems,
  cartItems,
  page: {
    title: "Rock Bae",
    activities:[],
    posts:[],
  },
  activityDetail: {
    activity: {},
    ticket: 0,
    qty: 1,
  },
  cart: {
    cartItems,
    shippingAddress,
    paymentMethod: 'Google',
  },
  orderInfo: {
    loading: false,
    order: orderInfo_order,
    success: false,
    error: null,
  },
  orderDetail: {
    loading: true,
    order: { cartItems: []},
    error: null,
  },
  requestActivity: {
    loading: false,
    error: null,
  },
  requestPost: {
    loading: false,
    error: null,
  },
  userSignin: {
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    remember: true,
    error: "",
  },
  userRegister: {
    loading: false,
    userInfo: null,
    error: "",
  },
  createPost: {
    loading:false,
  },
  postDetail: {
    post: {},
    like: [],
    comment: [],
    checkIfLiked: {},
    loading: true,
    error: null,
  },
  favoriteItems,
  createComment:{
    loading:false,
  },
  cart: {
    cartItems,
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'Google',
  },
  orderInfo: {
    loading: false,
    order: orderInfo_order,
    success: false,
    error: null,
  },
  orderDetail: {
    loading: true,
    order: { cartItems: []},
    error: null,
  },
  orderList: []
};

function reducer(state, action) {
  switch (action.type) {
    case SET_PAGE_CONTENT:
      return {
        ...state,
        page: action.payload,
      };
    case PREFER_ADD_ITEM:
      const item = action.payload;
      const activity = state.preferItems.find((x) => x.id === item.id);
      if (activity) {
         preferItems = state.preferItems.map((x) =>
            x.id === activity.id ? item : x
         );
         return { ...state, preferItems };
      }
      preferItems = [...state.preferItems, item];
      return { ...state, preferItems };  
    case PREFER_REMOVE_ITEM:
      preferItems = state.preferItems.filter((x) => x.id !== action.payload);
      return { ...state, preferItems };
    case CART_ADD_ITEM:
      const item1 = action.payload;
      const activity1 = state.cart.cartItems.find((x) => x.ticketClass === item1.ticketClass);
      if (activity1) {
          cartItems = state.cart.cartItems.map((x) =>
            x.ticketClass === activity1.ticketClass ? item1 : x
          );
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      cartItems = [...state.cart.cartItems, item1];
      return { ...state, cart: { ...state.cart, cartItems } };    
    case CART_REMOVE_ITEM:
      cartItems = state.cart.cartItems.filter((x) => x.ticketClass !== action.payload);
      return { ...state, cart: { ...state.cart, cartItems } };  
    case EMPTY_CART:
      cartItems = [];
      return { ...state, cart: { ...state.cart, cartItems } };
    case SET_ACTIVITY_DETAIL:
      return { ...state, activityDetail: { ...state.activityDetail, ...action.payload} };
    case BEGIN_ACTIVITY_REQUEST:
      return {
        ...state,
        requestActivity: { ...state.requestActivity, loading: true },
      };
    case SUCCESS_ACTIVITY_REQUEST:
      return {
        ...state,
        requestActivity: { ...state.requestActivity, loading: false },
      };
    case FAIL_ACTIVITY_REQUEST:
      return {
        ...state,
        requestActivity: {
          ...state.requestActivity,
          loading: false,
          error: action.payload,
        },
      };
    case SAVE_SHIPPING_ADDRESS:
      console.log('action.payload.shippingAddress = ')
      console.log(action.payload)
      return { ...state, cart: { ...state.cart, shippingAddress: action.payload } };
    case SAVE_PAYMENT_METHOD:
      return { ...state, cart: { ...state.cart, paymentMethod: action.payload } };
    case BEGIN_LOGIN_REQUEST:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case SUCCESS_LOGIN_REQUEST:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
      };
    case FAIL_LOGIN_REQUEST:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: null,
          error: action.payload,
        },
      };
    case BEGIN_UPDATE_USERINFO:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case SUCCESS_UPDATE_USERINFO:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
      };
    case FAIL_UPDATE_USERINFO:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          error: action.payload,
        },
      };
    case LOGOUT_REQUEST:
      cartItems = [];
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          userInfo: null,
        },
      };
    case REMEMBER_LOGIN:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          remember: action.payload,
        },
      };
    case BEGIN_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: { ...state.userRegister, loading: true },
      };
    case SUCCESS_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
        userSignin: {
          ...state.userSignin,
          userInfo: action.payload,
        },
      };
    case FAIL_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          loading: false,
          userInfo: null,
          error: action.payload,
        },
      }; 
    case BEGIN_POSTING:
      return { ...state, createPost: { ...state.createPost, loading: true } };
    case SUCCESS_POSTING:
      return {
        ...state,
        createPost: {
          ...state.createPost,
          loading: false,
        },
      };
    case BEGIN_POST_REQUEST:
      return {
        ...state,
        requestPost: { ...state.requestPost, loading: true },
      };
    case SUCCESS_POST_REQUEST:
      return {
        ...state,
        requestPost: { ...state.requestPost, loading: false },
      };
    case FAIL_POST_REQUEST:
      return {
        ...state,
        requestPost: {
          ...state.requestPost,
          loading: false,
          error: action.payload,
        },
      };
    case BEGIN_COMMENT:
      return { ...state, createComment: { ...state.createComment, loading: true } };
    case SUCCESS_COMMENT:
      return {
        ...state,
        createComment: {
          ...state.createComment,
          loading: false,
        },
      };
    case SET_POST_DETAIL:
      return { ...state, postDetail: { ...state.postDetail, ...action.payload} };
    case FAVORITE_ADD_ITEM:
      const item3 = action.payload;
      const post = state.favoriteItems.find((x) => x.id === item3.id);
      if (post) {
        favoriteItems = state.favoriteItems.map((x) =>
            x.id === post.id ? item3 : x
         );
         return { ...state, favoriteItems };
      }
      favoriteItems = [...state.favoriteItems, item3];
      return { ...state, favoriteItems };  
    case FAVORITE_REMOVE_ITEM:
      favoriteItems = state.favoriteItems.filter((x) => x.id !== action.payload);
      return { ...state, favoriteItems };
      case BEGIN_ORDER_CREATE:
        return {
          ...state,
          orderInfo: {
            ...state.orderInfo,
            loading: true,
            success: false,
          }
        };
      case SUCCESS_ORDER_CREATE:
        return {
          ...state,
          orderInfo: {
            ...state.orderInfo,
            loading: false,
            order: action.payload,
            success: true,
            error: null,
          },
        };
      case FAIL_ORDER_CREATE:
        return {
          ...state,
          orderInfo: {
            ...state.orderInfo,
            loading: false,
            order: { id: "" },
            success: false,
            error: action.payload,
          },
        };
      case RESET_ORDER:
        return {
          ...state,
          orderInfo: {
            ...state.orderInfo,
            loading: false,
            order: { id: "" },
            success: false,
          },
        };
      case BEGIN_ORDER_DETAIL:
        return {
          ...state,
          orderDetail: {
            ...state.orderDetail,
            loading: true,
          }
        };
      case SUCCESS_ORDER_DETAIL:
        return {
          ...state,
          orderDetail: {
            ...state.orderDetail,
            loading: false,
            order: action.payload,
          },
        };
      case FAIL_ORDER_DETAIL:
        return {
          ...state,
          orderDetail: {
            ...state.orderDetail,
            loading: false,
            error: action.payload,
          },
        };
      case GET_ORDER_LIST:
        return {
          ...state,
          orderList: action.payload,
        };
    default:
      return state;
   }
}

export function StoreProvider(props) {
   const [state, dispatch] = useReducerWithThunk(reducer, initialState,"example");
   const value = { state, dispatch };

   return (
      <StoreContext.Provider value={value}>
        {props.children}
      </StoreContext.Provider>
   );
}