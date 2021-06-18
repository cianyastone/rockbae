import { Layout } from 'antd';
import AppHeader from '../components/normal/Header';
import AppFooter from '../components/normal/Footer';
import CreatePost from '../components/Post/CreatePost';

const { Header, Content, Footer } = Layout;

function CreatePostPage() {
    return (
        <>
        <Header style={{ position: 'fixed', zIndex: 99, width:'100%'}} className="layout-header create-post">
            <AppHeader title="Rock Bae"/>
        </Header>
        <Layout className="new-container">
            <Layout>
                <Header className="layout-header create-post">
                    <AppHeader />
                </Header>
                <Content className="create-post">
                    <CreatePost />
                </Content>
                <Footer className="layout-footer create-post">
                    <AppFooter />
                </Footer>
            </Layout>
        </Layout>
        </>
    );
}

export default CreatePostPage;