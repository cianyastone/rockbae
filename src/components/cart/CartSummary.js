import { useContext } from "react";
import { Badge } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { StoreContext } from "../../store";

export default function CartSummary() {
    const { state: { cart: { cartItems } } } = useContext(StoreContext);

    let count = (cartItems.length > 0) ?
        cartItems.reduce((sum,item) => sum+item.qty, 0)
        : 0;
        
    return (
        <>
        <Badge className="nav-item" count={count} size={"small"} style={{ color: 'white', backgroundColor: '#6366F2' }}>
            <ShoppingCartOutlined />
        </Badge>
        </>
    );
}
