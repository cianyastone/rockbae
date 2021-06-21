import { useContext } from "react";
import { Form, Select, Input, Button, Rate, Row, Col, } from 'antd';
import { useHistory } from 'react-router-dom';
import { createPost } from "../../actions"
import { StoreContext } from "../../store"
import BreadcrumbItem from "../normal/BreadcrumbItem";


export default function CreatePost(){
    const { state:{ createPost: { loading }, page: { activities } }, dispatch } = useContext(StoreContext);
    const history = useHistory();
    const onFinish = async (postData) => {
        createPost(dispatch, postData);
        console.log('Received values of form: ', postData);
        history.push("/post");
    };

    const { Option } = Select;
    const { TextArea } = Input;

    return (
        <div className="post-container">
        <BreadcrumbItem link={'createpost'} name={'發布文章'} />
        <Form name="create-article" onFinish={onFinish}>
            <Row gutter={[24, 8]}>
                <Col xs={{ span: 24 }} 
                sm={{ span: 8 }} 
                lg={{ span: 6 }}
                xl={{ span: 6 }}
                xxl={{ span: 6 }}>
                    <Form.Item
                        name={['activity']} 
                        rules={[{ required: true }]}
                        style={{width:"100%"}}
                    >
                        <Select placeholder="請選擇活動分類">
                        {[...Array(activities.length).keys()].map((x) => (
                        <Option value={activities[x].name}>
                            <p className="activity-name">
                                {activities[x].name}
                            </p>
                        </Option>
                        ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} 
                sm={{ span: 16 }} 
                lg={{ span: 18 }}
                xl={{ span: 18 }}
                xxl={{ span: 18 }}>
                    <Form.Item 
                        name={['article']} 
                        rules={[{ required: true }]}
                    >
                        <TextArea showCount maxLength={20} autoSize={{ minRows: 1, maxRows: 1 }} placeholder="請輸入文章標題..."/>
                    </Form.Item>
                </Col>
            </Row>
        <Form.Item 
            name={['content']} 
            rules={[{ required: true }]}
        >
            <TextArea placeholder="請輸入文章內容..." showCount maxLength={1000} autoSize={{ minRows: 15 }}/>
        </Form.Item>
        <Form.Item 
            label={<label style={{ color: "#fff" }}>推薦指數：</label>}
            name={['recommend']} 
            rules={[{ required: true }]}
            className="create-post-group"
        >
            <Rate allowHalf character="推"/>
        </Form.Item>
        <Form.Item >
            {loading ? (
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: "#C59CD3", borderColor: "#C59CD3"}}
                    loading
                    className="favorite-button"
                >
                    發布文章
                </Button>
            ) : (
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: "#B27CC5", borderColor: "#B27CC5"}}
                    className="favorite-button"
                >
                    發布文章
                </Button>
            )}
        </Form.Item>
        </Form>
        </div>
    );
}