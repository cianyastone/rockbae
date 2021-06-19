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
        <Layout className="new-container">
            <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header login">
                <AppHeader title="Rock Bae"/>
            </Header>
            <Header className="layout-header login">
                <AppHeader title="Rock Bae"/>
            </Header>
            <Content className="login">
                <Login redirect={redirect}/>
            </Content>
            <Footer className="layout-footer login">
                <AppFooter />
            </Footer>
        </Layout>
        </>
    );
}

export default LoginPage;