import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../store";

export default function PostModal({}){
   const {state: {userSignin: { userInfo }}} = useContext(StoreContext);
   const { displayName } = userInfo;

   return (
      <p>
         {displayName}
      </p>
   );
}