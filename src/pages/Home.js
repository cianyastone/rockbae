import { useContext } from "react"; 
import { Layout } from 'antd';
import ActivityList from "../components/ActivityList";
import { StoreContext } from "../store"
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"

const { Header, Content, Footer } = Layout;

function Home() {
  const { state: { page: {activities} } } = useContext(StoreContext);
  return (
    <Layout className="container main-layout">
      <Header className="layout-header">
        <AppHeader title="NORDIC NEST Shopping Cart"/>
      </Header>
      <Content className="layout-content">
        <ActivityList activities={activities}/>
      </Content>   
      <Footer className="layout-footer">
        <AppFooter/>  
      </Footer>  
    </Layout>
  );
}

export default Home;