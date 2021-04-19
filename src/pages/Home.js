import { useContext } from "react"; 
import { Layout } from 'antd';
import ActivityList from "../components/ActivityList";
import { StoreContext } from "../store"
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import Slide from '../components/Slide';

const { Header, Content, Footer } = Layout;

function Home() {
  const { state: { page: {activities} } } = useContext(StoreContext);
  return (
    <>
    <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header new-header">
        <AppHeader title="Rock Bae"/>
      </Header>
    <Layout className="container">
    <Header className="layout-header">
        <AppHeader title="Rock Bae"/>
      </Header>
      <Content className="layout-content content-slide">
        <Slide activities={activities}/>
      </Content>
      <Content className="layout-content content-one">
        <ActivityList activities={activities}/>
      </Content>   
      <Footer className="layout-footer">
        <AppFooter/>  
      </Footer>  
    </Layout>
    </>
  );
}

export default Home;