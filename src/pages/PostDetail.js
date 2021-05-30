import { useContext, useEffect } from "react";
import { Layout } from 'antd';
import AppHeader from "../components/normal/Header"
import AppFooter from "../components/normal/Footer"
import PostDetail from "../components/Post/PostDetail";
import { setPostDetail } from "../actions";
import { StoreContext } from "../store"

const { Header, Content, Footer } = Layout;

function Post({ match }) {
    const { dispatch } = useContext(StoreContext);
    useEffect(() => setPostDetail(dispatch, match.params.postId), [])
    return (
      <>
      <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header new-header">
        <AppHeader title="Rock Bae"/>
      </Header>
      <Layout className="container main-layout">
         <Header className="layout-header">
            <AppHeader />
         </Header>
         <Content className="layout-content">
            <PostDetail />
         </Content>
         <Footer className="layout-footer">
            <AppFooter />
         </Footer>
      </Layout>
      </>
   );
}

export default Post;
