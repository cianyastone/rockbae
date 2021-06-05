import { useContext, useEffect } from "react";
import { Button } from "antd"
import { StoreContext } from "../../store"
import Cookie from "js-cookie";
import { useHistory } from 'react-router-dom';
import {addFavoriteItem} from "../../actions"


export default function AddToFavorite({post}){
    const { state: { favoriteItems },dispatch } = useContext(StoreContext);
    const history = useHistory();

    const addToFavorite = () => {
      history.push("/login?redirect=favoritePost");
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