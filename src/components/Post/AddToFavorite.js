import { useContext, useEffect } from "react";
import { Button } from "antd"
import { StoreContext } from "../../store"
import Cookie from "js-cookie";
import {addFavoriteItem} from "../../actions"


export default function AddToFavorite({post}){
    const { state: { favoriteItems },dispatch } = useContext(StoreContext);

    const addToFavorite = () => {
      addFavoriteItem(dispatch, post);
    };

    useEffect(()=>{
      Cookie.set("favoriteItems", JSON.stringify(favoriteItems));
   }, [favoriteItems])

    return (
      <Button type="primary" className="btn-tocar" onClick={addToFavorite}>
        收藏
      </Button>
    );
}