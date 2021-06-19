import { Layout } from "antd";
import Shipping from "../components/order/Shipping";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
const { Header, Content, Footer } = Layout;

function PlaceOrder() {
  return (
    <>
    <Layout className="new-container">
      <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header shipping-header">
          <AppHeader title="Rock Bae"/>
      </Header>
      <Header className="layout-header shipping-header ship-header">
              <AppHeader />
      </Header>
      <div className="shipping-content">
      <Content className="ship-content">
        <Shipping />
      </Content>
      </div>
      <Footer className="layout-footer shipping-footer">
          <AppFooter />
      </Footer>
    </Layout>
    </>
  );
}

export default PlaceOrder;
