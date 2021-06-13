import { Layout } from 'antd';
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import UserOrderPage from '../components/order/UserOrder';

const { Header, Content, Footer } = Layout;

function UserOrder() {
    return (
        <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header">
            <AppHeader title="Rock Bae"/>
        </Header>
        <Layout className="container main-layout">
            <Layout className="bg-gray">
                <Header className="layout-header">
                    <AppHeader />
                </Header>
                <Content className="layout-content content-activity">
                    <UserOrderPage />
                </Content>
                <Footer className="layout-footer">
                    <AppFooter />
                </Footer>
            </Layout>
        </Layout>
        </>
    );
}

export default UserOrder;