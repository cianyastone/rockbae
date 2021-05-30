import { createContext } from "react";
import useReducerWithThunk from 'use-reducer-thunk';
import activities from "../json/activity.json"
import Cookie from "js-cookie";

import { 
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

export const StoreContext = createContext();
let preferItems = Cookie.getJSON("preferItems");
if(!preferItems) preferItems = []; 
let cartItems = Cookie.getJSON("cartItems");
if(!cartItems) cartItems = []; 

const initialState = {
  page: {
    title: "Rock Bae",
    activities,
    posts:[],
  },
  navBar: {
    activeItem: "",
  },
  preferItems,
  cartItems,
  requestActivity: {
    loading: false,
    error: null,
  },
  activityDetail: {
    activity: {},
    ticket: 0,
    qty: 1,
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
    loading: true,
    post: {},
    error: null,
  },
  cart: {
    cartItems,
<<<<<<< HEAD
    // shippingAddress: localStorage.getItem('shippingAddress')
    //   ? JSON.parse(localStorage.getItem('shippingAddress'))
    //   : {},
    // paymentMethod: 'Google',
  },
=======
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'Google',
    },
>>>>>>> 7fae29ee5b3bd6f8687182126440aa6bffbf0f3d
};

function reducer(state, action) {
   switch (action.type) {
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
          const activity1 = state.cartItems.find((x) => x.ticketClass === item1.ticketClass);
          if (activity1) {
              cartItems = state.cartItems.map((x) =>
                x.ticketClass === activity1.ticketClass ? item1 : x
              );
            return { ...state, cartItems };
          }
          cartItems = [...state.cartItems, item1];
          return { ...state, cartItems };
      case CART_REMOVE_ITEM:
          cartItems = state.cartItems.filter((x) => x.ticketClass !== action.payload);
          return { ...state, cartItems };  
<<<<<<< HEAD
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
=======
      case SAVE_SHIPPING_ADDRESS:
          console.log('action.payload.shippingAddress = ')
          console.log(action.payload)
          return { ...state, cart: { ...state.cart, shippingAddress: action.payload } };
      case SAVE_PAYMENT_METHOD:
          return { ...state, cart: { ...state.cart, paymentMethod: action.payload } };
>>>>>>> 7fae29ee5b3bd6f8687182126440aa6bffbf0f3d
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
      case BEGIN_POST_DETAIL:
          return {
              ...state,
              postDetail: {
                ...state.postDetail,
                loading: true,
              }
            };
      case SUCCESS_POST_DETAIL:
          return {
              ...state,
              postDetail: {
                ...state.postDetail,
                loading: false,
                post: action.payload,
              },
            };
      case FAIL_POST_DETAIL:
          return {
              ...state,
              postDetail: {
                ...state.postDetail,
                loading: false,
                error: action.payload,
              },
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