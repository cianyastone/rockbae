import { createContext, useReducer } from "react";
import useReducerWithThunk from 'use-reducer-thunk';
import activities from "../json/activity.json"
import Cookie from "js-cookie";

import { 
   PREFER_ADD_ITEM,
   PREFER_REMOVE_ITEM, 
   CART_ADD_ITEM,
   CART_REMOVE_ITEM, 
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
   },
   navBar: {
      activeItem: "",
   },
   preferItems,
   cartItems,
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
            const activity1 = state.cartItems.find((x) => x.id === item1.id);
            if (activity1) {
               cartItems = state.cartItems.map((x) =>
                  x.id === activity1.id ? item1 : x
               );
               return { ...state, cartItems };
            }
            cartItems = [...state.cartItems, item1];
            return { ...state, cartItems };
         case CART_REMOVE_ITEM:
            cartItems = state.cartItems.filter((x) => x.id !== action.payload);
            return { ...state, cartItems };   
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