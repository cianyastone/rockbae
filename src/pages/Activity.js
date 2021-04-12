import { Layout } from 'antd';
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ActivityDetail from "../components/ActivityDetail";
import activities from "../json/activity.json";

const { Header, Content, Footer } = Layout;

function Activity({ match }) {
   const activity = activities.find(
      (x) => x.id === match.params.activityId
   );
   return (
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
   );
}

export default Activity;
