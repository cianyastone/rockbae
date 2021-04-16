import { useContext } from "react";
import { Layout } from 'antd';
// import NavBar from "../components/NavBar";
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import PreferModal from '../components/PreferModal';
import { StoreContext } from "../store"

const { Header, Content, Footer } = Layout;

function Cart() {
    const { state: { page: { title } } } = useContext(StoreContext);
    return (
        <Layout className="container main-layout">
            {/* <Layout className="bg-gray">
                <NavBar />
            </Layout> */}
            <Layout className="bg-gray">
                <Header className="layout-header">
                    <AppHeader title={title} />
                </Header>
                <Content className="layout-content">
                    <PreferModal />
                </Content>
                <Footer className="layout-footer">
                    <AppFooter />
                </Footer>
            </Layout>
        </Layout>
    );
}

export default Cart;