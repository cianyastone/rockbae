import { Layout } from 'antd';
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import PostList from '../components/Post/Postlist';

const { Header, Content, Footer } = Layout;

function Post() {
    return (
        <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header new-header">
            <AppHeader title="Rock Bae"/>
        </Header>
        <Layout className="container main-layout">
            <Layout className="bg-gray">
                <Header className="layout-header">
                    <AppHeader />
                </Header>
                <Content className="layout-content content-activity">
                    <PostList />
                </Content>
                <Footer className="layout-footer">
                    <AppFooter />
                </Footer>
            </Layout>
        </Layout>
        </>
    );
}

export default Post;