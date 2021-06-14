import { useContext, useEffect } from "react"; 
import { Layout } from 'antd';
import ActivityList from "../components/activity/ActivityList";
import { StoreContext } from "../store"
import AppHeader from "../components/normal/Header"
import AppFooter from "../components/normal/Footer"
import { setPage } from "../actions";

const { Header, Content, Footer } = Layout;

function Home() {
  const { dispatch } = useContext(StoreContext);
  useEffect(() => {
    setPage(dispatch)
  }, []);

  return (
    <>
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header activity-header">
          <AppHeader title="Rock Bae"/>
      </Header>
      <Header className="layout-header activity-header">
        <AppHeader title="Rock Bae"/>
      </Header>
      <Content className="activity-content">
        <ActivityList />
      </Content>   
      <Footer className="layout-footer activity-footer">
        <AppFooter/>  
      </Footer>  
    </Layout>
    </>
  );
}

export default Home;