import { useContext } from "react";
import { Layout } from 'antd';
// import NavBar from "../components/NavBar";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import FavoriteModal from '../components/Post/favorite/FavoriteModal';
import { StoreContext } from "../store"

const { Header, Content, Footer } = Layout;

function Cart() {
    const { state: { page: { title } } } = useContext(StoreContext);
    return (
        <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header favorite">
            <AppHeader title="Rock Bae"/>
        </Header>
        <Layout className="new-container">
            <Header className="layout-header favorite">
                <AppHeader title={title} />
            </Header>
            <Content className="favorite">
                <FavoriteModal />
            </Content>
            <Footer className="layout-footer favorite">
                <AppFooter />
            </Footer>
        </Layout>
        </>
    );
}

export default Cart;