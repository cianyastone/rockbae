import { useContext } from "react";
import { Layout } from 'antd';
// import NavBar from "../components/NavBar";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import PreferModal from '../components/prefer/PreferModal';
import { StoreContext } from "../store"

const { Header, Content, Footer } = Layout;

function Prefer() {
    const { state: { page: { title } } } = useContext(StoreContext);
    return (
        <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header prefer-header">
            <AppHeader title="Rock Bae"/>
        </Header>
        <div className="prefer-content">
            <Content className="container">
                <Content className="layout-content prefer-content">
                <PreferModal />
                </Content>
            </Content>
        </div>
        <Footer className="prefer-footer">
            <AppFooter />
        </Footer>
        </>
    );
}

export default Prefer;