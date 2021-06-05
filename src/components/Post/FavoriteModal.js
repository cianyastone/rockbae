import { Row, Col } from "antd";
import { useContext, useEffect} from "react";
import { StoreContext } from "../../store"
import FavoriteItem from "./FavoriteItem";
import BreadcrumbItem from "../normal/BreadcrumbItem";
import Cookie from "js-cookie";

export default function FavoriteModal() {
    const { state: { favoriteItems } } = useContext(StoreContext);

    useEffect(()=>{
        Cookie.set("favoriteItems", JSON.stringify(favoriteItems));
    }, [favoriteItems])

    return (
        <div>
            <BreadcrumbItem link={'favoritePost'} name={'收藏ㄉ文章'} />
                <Row gutter={[32,32]}>
                {favoriteItems.map(item => (
                    <Col 
                        key={item.id} 
                        sm={{ span: 12 }} 
                        lg={{ span: 8 }}
                        xl={{ span: 6 }}
                        xxl={{ span: 4 }}
                    >
                        <FavoriteItem item={item}/>
                    </Col>
                ))}
                </Row> 
        </div>
    );
}