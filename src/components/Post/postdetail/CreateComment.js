import { useContext } from "react";
import { Form, Input, Button, Avatar } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { createComment, setPostDetail } from "../../../actions"
import { StoreContext } from "../../../store"


export default function CreateComment(){
    const { state:{ createComment: { loading }, postDetail: { post }, userSignin: { userInfo } }, dispatch } = useContext(StoreContext);
    const onFinish = async (commentData) => {
        createComment(dispatch, post.id, commentData);
        setPostDetail(dispatch, post.id);
    };
    const { TextArea } = Input;

    return (
        <>
        <Form 
        onFinish={onFinish} 
        layout="inline"
        className="comment-form"
        >
        <Avatar className="comment-avatar">
            {userInfo.displayName}
        </Avatar>
        <Form.Item 
            name={['comment']} 
            rules={[{ required: true }]}
            className="comment-input"
        >
            <TextArea className="user-form-imput" placeholder="留言......" autoSize={{ maxRows: 3 }}/>
        </Form.Item>
        <Form.Item >
            {loading ? (
                <Button
                    type="primary"
                    htmlType="submit"
                    loading
                    className="login-form__button"
                >
                    發布
                </Button>
            ) : (
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form__button"
                >
                    發布
                </Button>
            )}
        </Form.Item>
        </Form>
        </>
    );
}