import { Layout } from 'antd';
import AppHeader from "../components/normal/Header"
import AppFooter from "../components/normal/Footer"
import ActivityDetail from "../components/activitydetail/ActivityDetail";
import activities from "../json/activity.json";

const { Header, Content, Footer } = Layout;

function Activity({ match }) {
   const activity = activities.find(
      (x) => x.id === match.params.activityId
   );
   return (
      <>
      <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header new-header">
        <AppHeader title="Rock Bae"/>
      </Header>
      <Layout className="container main-layout">
         <Header className="layout-header">
            <AppHeader title="Activity Detail"/>
         </Header>
         <Content className="layout-content">
            <ActivityDetail activity = {activity} />
         </Content>
         <Footer className="layout-footer">
            <AppFooter />
         </Footer>
      </Layout>
      </>
   );
}

export default Activity;
