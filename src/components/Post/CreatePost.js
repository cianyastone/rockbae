import { useContext } from "react";
import { Form, Select, Input, Button, Rate } from 'antd';
import { createPost } from "../../actions"
import { StoreContext } from "../../store"


export default function CreatePost({}){
    const { state:{ createPost: { loading }, page: { activities } }, dispatch } = useContext(StoreContext);
    const onFinish = async (postData) => {
        createPost(dispatch, postData);
        console.log('Received values of form: ', postData);
    };

    const { Option } = Select;
    const { TextArea } = Input;

    return (
        <>
        <Form name="create-article" onFinish={onFinish} >
        <Form.Item 
            name={['article']} 
            label="文章標題" 
            rules={[{ required: true }]}
        >
            <TextArea showCount maxLength={15} autoSize={{ minRows: 1, maxRows: 1 }}/>
        </Form.Item>
        <Form.Item
            name={['activity']} 
            label="活動分類"
            rules={[{ required: true }]}
        >
            <Select>
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
            name={['content']} 
            label="內容" 
            rules={[{ required: true }]}
        >
            <TextArea showCount maxLength={500} autoSize={{ minRows: 5, maxRows: 10 }}/>
        </Form.Item>
        <Form.Item
            name={['recommend']} 
            label="推薦程度" 
            rules={[{ required: true }]}
        >
            <Rate allowHalf character="推" />
        </Form.Item>
        <Form.Item >
            {loading ? (
                <Button
                    type="primary"
                    htmlType="submit"
                    loading
                >
                    發布文章
                </Button>
            ) : (
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    發布文章
                </Button>
            )}
        </Form.Item>
        </Form>
        </>
    );
}