import { useContext } from "react";
import { Form, Select, Input, Button } from 'antd';
import { createComment, setPostDetail } from "../../actions"
import { StoreContext } from "../../store"


export default function CreateComment({}){
    const { state:{ createComment: { loading }, postDetail: { post } }, dispatch } = useContext(StoreContext);
    const onFinish = async (commentData) => {
        createComment(dispatch, post.id, commentData);
        setPostDetail(dispatch, post.id);
    };

    const { Option } = Select;
    const { TextArea } = Input;

    return (
        <>
        <Form name="create-article" onFinish={onFinish} >
        <Form.Item 
            name={['comment']} 
            rules={[{ required: true }]}
        >
            <TextArea autoSize={{ minRows: 1, maxRows: 1 }}/>
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