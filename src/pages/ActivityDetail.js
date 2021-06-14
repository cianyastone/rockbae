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
      <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header activityDetail-header">
        <AppHeader title="Rock Bae"/>
      </Header>
      <div className="activityDetail-content">
      <Content className="container">
         <Content className="layout-content activityDetail-content">
            <ActivityDetail activity = {activity} />
         </Content>
      </Content>
      </div>
      <Footer className="layout-footer activityDetail-footer">
            <AppFooter />
      </Footer>
      </>
   );
}

export default Activity;
