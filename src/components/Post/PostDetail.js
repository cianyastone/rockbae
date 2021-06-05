import { useEffect, useContext } from "react";
import { StoreContext } from "../../store"
import CreateComment from "./CreateComment";
import AddToFavorite from "./AddToFavorite";

export default function PostDetail(){
   const { state: { postDetail: { post} }, dispatch } = useContext(StoreContext);

   return (
      <>
      <h2 className="product-category">
         {post.article}
      </h2>
      <h2 className="product-category">
         活動：{post.activity}
      </h2>
      <p className="product-category">
         {post.content}
      </p>
      <CreateComment/>
      <AddToFavorite post={post}/>
      </>
   );
}