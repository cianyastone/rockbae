import { Layout } from "antd";
import AppHeader from '../components/normal/Header';
import OrderCard from "../components/order/Order";
import AppFooter from "../components/normal/Footer";
const { Header, Content, Footer } = Layout;

function Order({ match }) {
   return (
    <>
    <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header Order-header">
        <AppHeader title="Rock Bae"/>
    </Header>
    <div className="Order-content">
    {/* <Header className="layout-header">
            <AppHeader />
    </Header> */}
    <Content className="container">
        <Content className="layout-content">
          <OrderCard orderId={match.params.orderId} />
        </Content>
    </Content>
    </div>
    <Footer className="layout-footer Order-footer">
        <AppFooter />
    </Footer>
    </>
  );
}

export default Order;
