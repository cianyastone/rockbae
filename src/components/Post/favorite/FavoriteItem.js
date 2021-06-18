import { useContext } from "react";
import { StoreContext } from "../../../store"
import { Link } from 'react-router-dom';
import { Card, notification, Avatar, Button } from "antd"
import { StarOutlined } from '@ant-design/icons';
import { removeFromFavorite, setPostPage } from "../../../actions"

export default function FavoriteItem({ item }) {
    const { dispatch } = useContext(StoreContext);
    const removeFavorite = () => {
        removeFromFavorite(dispatch, item.id);
        openNotification2();
    }
    const openNotification2 = () => {
        notification.open({
        message: '嘿 朋朋！',
        description:` ${item.article}  已從收藏的文章中移除`,
        icon: <StarOutlined />,
        placement: 'bottomRight'
        });
    };
    return (
        <Card className="favorite-card">
            <div className="favorite-group-large">
                <img className="favorite-img" src="/images/b61a1db0-e44e-460f-a928-c15578c32ad7.jpg"/>
                <div className="favorite-group--content">
                    <Link to={`/post/${item.activity}/${item.id}`}>
                        <h1>{item.article}</h1>
                    </Link>
                    <p>{item.activity}</p>
                    <div className="favorite-group">
                        <Avatar>
                            {item.author}
                        </Avatar>
                        <p>{item.author}</p>
                    </div>
                    <Button type="primary" style={{ background: "#B27CC5", borderColor: "#B27CC5"}} className="favorite-button" onClick={removeFavorite}>
                        從收藏中移除
                    </Button>
                </div>
            </div>
        </Card>
    );
}
