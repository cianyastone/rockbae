import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../store";

export default function PostDetail(){
   const { state: { postDetail: { post} }, dispatch } = useContext(StoreContext);

   return (
      <p>
         <h1 className="activity-name activity-name--large">
            {post.name}
         </h1>
      </p>
   );
}