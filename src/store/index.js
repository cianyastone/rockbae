import { createContext, useReducer } from "react";
import activities from "../json/activity.json"
import Cookie from "js-cookie";

import { 
   PAGE_TITLE_SET,
   PAGE_CONTENT_SET,
   NAVBAR_ITEM_SET,
   PREFER_ADD_ITEM,
   PREFER_REMOVE_ITEM, 
} from "../utils/constants"

export const StoreContext = createContext();
let preferItems = Cookie.getJSON("preferItems");
if(!preferItems) preferItems = []; 

const initialState = {
   page: {
      title: "Rock Bae",
      activities,
   },
   navBar: {
      activeItem: "",
   },
   preferItems,
};

function reducer(state, action) {
   switch (action.type) {
      case PAGE_TITLE_SET:
         return {
            ...state,
            page: {
               ...state.page,
               title: action.payload,
            },
         };
      case PAGE_CONTENT_SET:
         return {
            ...state,
            page: {
               ...state.page,
               activities: action.payload,
            },
         };
      case NAVBAR_ITEM_SET:
         return {
            ...state,
            navBar: {
               activeItem: action.payload
            }
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
      default:
         return state;
   }
}

export function StoreProvider(props) {
   const [state, dispatch] = useReducer(reducer, initialState);
   const value = { state, dispatch };

   return (
      <StoreContext.Provider value={value}>
         {props.children}
      </StoreContext.Provider>
   );
}