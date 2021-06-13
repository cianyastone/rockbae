import { Layout } from 'antd';
// import NavBar from "../components/NavBar";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';

const { Header, Content, Footer } = Layout;

function Home() {
    return (
        <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header">
            <AppHeader/>
        </Header>
        <Layout className="container main-layout">
            <Header className="layout-header">
                <AppHeader/>
            </Header>
            <Content className="layout-content content-activity">
                    
            </Content>
            <Footer className="layout-footer">
                <AppFooter />
            </Footer>
        </Layout>
        </>
    );
}

export default Home;