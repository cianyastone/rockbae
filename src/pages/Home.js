import { useContext } from "react"; 
import { Layout } from 'antd';
import Activity from "../components/Activity";
import { StoreContext } from "../store"
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"

const { Header, Content, Footer } = Layout;

function Home() {
  const { state: { page: {activitys} } } = useContext(StoreContext);
  return (
    <Layout className="container main-layout">
      <Header className="layout-header">
        <AppHeader title="NORDIC NEST Shopping Cart"/>
      </Header>
      <Content className="layout-content">
        <Activity activitys={activitys}/>
      </Content>   
      <Footer className="layout-footer">
        <AppFooter/>  
      </Footer>  
    </Layout>
  );
}

export default Home;