import { Layout } from "antd";
import PlaceOrderCard from "../components/cart/PlaceOrder";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
const { Header, Content, Footer } = Layout;

function PlaceOrder() {
  return (
    <Layout className="container main-layout">
      <Layout className="bg-gray main-area">
        <Header className="layout-header">
            <AppHeader/>
        </Header>
        <Content className="layout-content">
           <PlaceOrderCard />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default PlaceOrder;
