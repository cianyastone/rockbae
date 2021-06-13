import { Layout } from 'antd';
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import PostList from '../components/Post/Postlist';
import { useContext, useEffect } from "react"; 
import { StoreContext } from "../store"
import { setPostPage } from "../actions";

const { Header, Content, Footer } = Layout;

function Post() {
    const { dispatch } = useContext(StoreContext);
    useEffect(() => {
        const url = window.location.pathname;
        setPostPage(dispatch, url)
    }, []);

    return (
        <>
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header postList-header">
                <AppHeader title="Rock Bae"/>
            </Header>
            <Header className="layout-header postList-header">
                <AppHeader title="Rock Bae"/>
            </Header>
            <Content className="layout-content">
                <PostList />
            </Content>
            <Footer className="layout-footer postList-footer">
                <AppFooter />
            </Footer>
        </Layout>
        </>
    );
}

export default Post;