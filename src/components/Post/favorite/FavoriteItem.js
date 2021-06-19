import { useContext } from "react";
import { StoreContext } from "../../../store"
import { Link } from 'react-router-dom';
import { Card, notification, Avatar, Button, Row, Col } from "antd"
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
            <Row className="favorite-group-large">
                <Col span={8}>
                    <img className="favorite-img" src="/images/b61a1db0-e44e-460f-a928-c15578c32ad7.jpg"/>
                </Col>
                <Col span={16}>
                    <Row className="favorite-group--content">
                        <Link to={`/post/${item.activity}/${item.id}`}>
                            <h1>{item.article}</h1>
                        </Link>
                    </Row>
                    <Row className="favorite-group--content">
                        <p>{item.activity}</p>
                    </Row>
                    <Row className="favorite-group--content">
                        <Col
                        xs={{ span: 0 }} 
                        sm={{ span: 0 }} 
                        lg={{ span: 12 }}
                        xl={{ span: 12 }}
                        xxl={{ span: 12 }}><Row>
                            <Avatar>{item.author}</Avatar>
                            <p>{item.author}</p>
                        </Row></Col>
                        <Col
                        xs={{ span: 24 }} 
                        sm={{ span: 24 }} 
                        lg={{ span: 12 }}
                        xl={{ span: 12 }}
                        xxl={{ span: 12 }}>
                            <Button type="primary" style={{ background: "#B27CC5", borderColor: "#B27CC5"}} className="favorite-button" onClick={removeFavorite}>
                                從收藏中移除
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}
