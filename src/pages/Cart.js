import { useContext } from "react";
import { Layout } from 'antd';
// import NavBar from "../components/NavBar";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import CartModalformobile from '../components/cart/CartModalformobile';
import { StoreContext } from "../store"

const { Header, Content, Footer } = Layout;

function Cart() {
    const { state: { page: { title } } } = useContext(StoreContext);
    return (
        <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header cart-haeder">
            <AppHeader title="Rock Bae"/>
        </Header>
        <Header className="layout-header">
            <AppHeader title={title} />
        </Header>
        <div className="main-layout">
        <Content className="layout-content cart-content">
            <CartModalformobile />
        </Content>
        </div>
        </>
    );
}

export default Cart;