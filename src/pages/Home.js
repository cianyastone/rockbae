import { Layout } from 'antd';
// import NavBar from "../components/NavBar";
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';

const { Header, Content, Footer } = Layout;

function Home() {
    return (
        <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header new-header">
            <AppHeader/>
        </Header>
        <Layout className="container main-layout">
            <Layout className="bg-gray">
                <Header className="layout-header">
                    <AppHeader/>
                </Header>
                <Content className="layout-content content-activity">
                    
                </Content>
                <Footer className="layout-footer">
                    <AppFooter />
                </Footer>
            </Layout>
        </Layout>
        </>
    );
}

export default Home;