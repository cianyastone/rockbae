import { useContext } from "react"; 
import { Layout } from 'antd';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import Activity from "../components/Activity";
import { StoreContext } from ".."

const { Header, Content, Footer } = Layout;

function Home() {
  const { state: { page: {title, activity} } } = useContext(StoreContext);
  return (
    <Layout className="container main-layout">
      <Header className="layout-header">
        <AppHeader title={title} />
      </Header>
      <Content className="layout-content">
        <Activity activitys={activity}/>
      </Content>
      <Footer className="layout-footer">
        <AppFooter/>  
      </Footer>      
    </Layout>
  );
}

export default Home;