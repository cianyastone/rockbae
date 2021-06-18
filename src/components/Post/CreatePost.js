import { useContext } from "react";
import { Form, Select, Input, Button, Rate } from 'antd';
import { createPost } from "../../actions"
import { StoreContext } from "../../store"


export default function CreatePost(){
    const { state:{ createPost: { loading }, page: { activities } }, dispatch } = useContext(StoreContext);
    const onFinish = async (postData) => {
        createPost(dispatch, postData);
        console.log('Received values of form: ', postData);
    };

    const { Option } = Select;
    const { TextArea } = Input;

    return (
        <div className="create-post-container">
        <Form name="create-article" onFinish={onFinish}>
        <div className="create-post-group">
            <Form.Item
                name={['activity']} 
                rules={[{ required: true }]}
                style={{ width: '18%' }}
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
            <Form.Item 
                name={['article']} 
                rules={[{ required: true }]}
                style={{ width: '81%' }}
            >
                <TextArea showCount maxLength={20} autoSize={{ minRows: 1, maxRows: 1 }} placeholder="請輸入文章標題..."/>
            </Form.Item>
        </div >
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