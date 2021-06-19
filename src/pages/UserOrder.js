import { Layout } from 'antd';
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import UserOrderPage from '../components/order/UserOrder';

const { Header, Content, Footer } = Layout;

function UserOrder() {
    return (
        <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header userOrder-header">
            <AppHeader title="Rock Bae"/>
        </Header>
        <div className="userOrder-content">
        {/* <Header className="layout-header">
                <AppHeader />
        </Header> */}
        <Content className="container userOrder-container">
            <Content className="layout-content userOrder-content">
                <UserOrderPage />
            </Content>
        </Content>
        </div>
        <Footer className="layout-footer userOrder-footer">
            <AppFooter />
        </Footer>
        </>
    );
}

export default UserOrder;