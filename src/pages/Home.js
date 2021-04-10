import { useContext } from "react"; 
import { Layout } from 'antd';
import Activity from "../components/Activity";
import { StoreContext } from "../store"

const { Content } = Layout;

function Home() {
  const { state: { page: {activitys} } } = useContext(StoreContext);
  return (
    <Layout className="container main-layout">
      <Content className="layout-content">
        <Activity activitys={activitys}/>
      </Content>    
    </Layout>
  );
}

export default Home;