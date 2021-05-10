import { useContext } from "react";
import { Badge } from "antd";
import { StoreContext } from "../../store";

export default function CartSummary() {
    const { state: { cartItems } } = useContext(StoreContext);

    let count = (cartItems.length > 0) ?
        cartItems.reduce((sum,item) => sum+item.qty, 0)
        : 0;
        
    return (
        <>
        <Badge className="nav-item nav-prefer" count={count} size={"small"} style={{ color: 'white', backgroundColor: '#6366F2' }}>
            <p>婐ㄉ購物車</p>
        </Badge>
        </>
    );
}
