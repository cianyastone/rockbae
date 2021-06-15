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
      <Layout >
         <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header post-detail">
         <AppHeader title="Rock Bae"/>
         </Header>
         <Header className="layout-header post-detail">
            <AppHeader />
         </Header>
         <Content className="post-detail">
            <PostDetail />
         </Content>
         <Footer className="layout-footer post-detail">
            <AppFooter />
         </Footer>
      </Layout>
      </>
   );
}

export default Post;
