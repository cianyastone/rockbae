import { Layout } from 'antd';
// import NavBar from "../components/NavBar";
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import Feeder from "../components/Feeder";

const { Header, Content, Footer } = Layout;

function Feed() {
  return (
    // <Layout className="container main-layout">
    //   <Layout className="bg-gray nav-area">
    //     <NavBar />
    //   </Layout>
    //   <Layout className="bg-gray main-area">
    //     <Header className="layout-header">
    //       <AppHeader title="Feed JSON Page" />
    //     </Header>
    //     <Content className="layout-content">
    //       <Feeder />
    //     </Content>
    //     <Footer className="layout-footer">
    //       <AppFooter />
    //     </Footer>
    //   </Layout>
    // </Layout>
      <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header new-header">
          <AppHeader/>
        </Header>
        <Layout className="container main-layout">
          <Layout className="bg-gray">
            <Header className="layout-header">
              <AppHeader/>
            </Header>
            <Content className="layout-content">
              <Feeder />
            </Content>
            <Footer className="layout-footer">
              <AppFooter />
            </Footer>
          </Layout>
        </Layout>
      </>
  );
}

export default Feed;
