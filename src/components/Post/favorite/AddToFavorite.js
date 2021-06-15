import { useContext, useEffect } from "react";
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { notification, Popover } from "antd";
import { StoreContext } from "../../../store"
import Cookie from "js-cookie";
import { addFavoriteItem, removeFromFavorite } from "../../../actions"


export default function AddToFavorite({post}){
    const { state: { favoriteItems }, dispatch } = useContext(StoreContext);
    var InFavorite = favoriteItems.map(function(item) {
      return item.article;
    }).includes(post.article);
    const openNotification = () => {
      notification.open({
      message: '嘿 朋朋！',
      description:
          ` ${post.article}  已加入收藏的文章`,
          icon: <StarOutlined />,
      onClick: () => {
          console.log('Notification Clicked!');
      },
      placement: 'bottomRight'
      });
    };
    const openNotification2 = () => {
      notification.open({
      message: '嘿 朋朋！',
      description:
          ` ${post.article}  已從收藏的文章中移除`,
          icon: <StarOutlined />,
      onClick: () => {
          console.log('Notification Clicked!');
      },
      placement: 'bottomRight'
      });
    };

    const addToFavorite = () => {
      addFavoriteItem(dispatch, post);
      console.log(InFavorite);
      openNotification();
    };

    const removeFavorite = () => {
      removeFromFavorite(dispatch, post.id);
      console.log(InFavorite);
      openNotification2();
    }

    useEffect(()=>{
      Cookie.set("favoriteItems", JSON.stringify(favoriteItems));
   }, [favoriteItems])

    return (
      <>
      <Popover content={"收藏"}>
      {InFavorite
        ? <StarFilled className="post-detail-btn" onClick={removeFavorite}/>
        : <StarOutlined className="post-detail-btn" onClick={addToFavorite}/>
      }
      </Popover>
      </>
    );
}