import { Layout } from "antd";
import PlaceOrderCard from "../components/order/PlaceOrder";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
const { Header, Content, Footer } = Layout;

function PlaceOrder() {
  return (
    <>
    <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header placeOrder-header">
        <AppHeader title="Rock Bae"/>
    </Header>
    <div className="placeOrder-content">
    {/* <Header className="layout-header">
            <AppHeader />
    </Header> */}
    <Content className="container">
        <Content className="layout-content placeOrder-content">
          <PlaceOrderCard />
        </Content>
    </Content>
    </div>
    <Footer className="layout-footer placeOrder-footer">
        <AppFooter />
    </Footer>
    </>
  );
}

export default PlaceOrder;
