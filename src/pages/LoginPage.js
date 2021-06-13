import { useContext } from "react";
import { Layout } from 'antd';
import * as QueryString from "query-string";
// import NavBar from "../components/NavBar";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import Login from '../components/user/Login';
import { StoreContext } from "../store"

const { Header, Content, Footer } = Layout;

function LoginPage(props) {
    const { state: { page: { title } } } = useContext(StoreContext);
    const { redirect } = QueryString.parse(props.location.search);
    return (
        <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header">
            <AppHeader title="Rock Bae"/>
        </Header>
        <Layout className="container main-layout">
            <Layout className="bg-gray">
                <Header className="layout-header">
                    <AppHeader title={title} />
                </Header>
                <Content className="layout-content content-activity">
                    <Login redirect={redirect} />
                </Content>
                <Footer className="layout-footer">
                    <AppFooter />
                </Footer>
            </Layout>
        </Layout>
        </>
    );
}

export default LoginPage;