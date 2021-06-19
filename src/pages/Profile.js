import { useContext } from "react";
import { Layout } from 'antd';
import * as QueryString from "query-string";
// import NavBar from "../components/NavBar";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import ProfileForMobile from '../components/user/ProfileForMobile';
import { StoreContext } from "../store"

const { Header, Content, Footer } = Layout;

function RegisterPage(props) {
    const { state: { page: { title } } } = useContext(StoreContext);
    const { redirect } = QueryString.parse(props.location.search);
    return (
        <>
        <Layout className="new-container">
            <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header profile-color">
                <AppHeader title="Rock Bae"/>
            </Header>
            <Header className="layout-header profile-color">
                <AppHeader title="Rock Bae"/>
            </Header>
            <Content className="profile-color">
                <ProfileForMobile />
            </Content>
            <Footer className="layout-footer profile-color">
                <AppFooter />
            </Footer>
        </Layout>
        </>
    );
}

export default RegisterPage;