import { Layout } from "antd";
import AppHeader from '../components/normal/Header';
import OrderCard from "../components/order/Order";
import AppFooter from "../components/normal/Footer";
const { Header, Content, Footer } = Layout;

function Order({ match }) {
   return (
    <Layout className="container main-layout">
      <Layout className="bg-gray main-area">
      <Header className="layout-header">
            <AppHeader/>
        </Header>
        <Content className="layout-content">
           <OrderCard orderId={match.params.orderId} />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Order;
