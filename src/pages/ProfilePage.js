import { useContext } from "react";
import { Layout } from 'antd';
// import NavBar from "../components/NavBar";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import Profile from '../components/user/Profile';
import { StoreContext } from "../store"

const { Header, Content, Footer } = Layout;

function ProfilePage() {
    const { state: { page: { title } } } = useContext(StoreContext);
    return (
        <>
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header profile">
                <AppHeader title="Rock Bae"/>
            </Header>
            <Header className="layout-header profile">
                <AppHeader title={title} />
            </Header>
            <Content className="profile">
                <Profile />
            </Content>
            <Footer className="layout-footer profile">
                <AppFooter />
            </Footer>
        </Layout>
        </>
    );
}

export default ProfilePage;