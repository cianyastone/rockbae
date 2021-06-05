import { useContext } from "react";
import { Form, Select, Input, Button } from 'antd';
import { createComment } from "../../actions"
import { StoreContext } from "../../store"


export default function CreateComment({}){
    const { state:{ createComment: { loading }, postDetail: { post } }, dispatch } = useContext(StoreContext);
    const onFinish = async (commentData) => {
        createComment(dispatch, post.id, commentData);
        console.log('Received values of form: ', commentData);
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
        <Form.Item >
            {loading ? (
                <Button
                    type="primary"
                    htmlType="submit"
                    loading
                >
                    發布
                </Button>
            ) : (
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    發布
                </Button>
            )}
        </Form.Item>
        </Form>
        </>
    );
}