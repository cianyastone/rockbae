import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Form, Input, Button } from "antd";
import { logoutFromFirebase, updateUserInfo } from "../../actions";
import { StoreContext } from "../../store";

const ProfileCard = ({ isModalVisible, toggleModal }) => {
  const { state: { userSignin: { userInfo } },dispatch } = useContext(StoreContext);
  const { displayName, email } = userInfo;
  const history = useHistory();
  const [form] = Form.useForm();
  const handleCancel = () => toggleModal(!isModalVisible);

  const handleUpdate = (values) => {
    console.log(values)
    updateUserInfo(dispatch, values);
  };

  const handleLogout = () => {
    logoutFromFirebase(dispatch);
    history.push("/");
  };
  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        onFinish={handleUpdate}
        name="normal_login"
        className="user-modal-form"
        form={form}
      >
        <p className="shipping-title">修改個人檔案</p>
        <hr className="hr-user"></hr>
        <Form.Item
          label="暱稱: "
          name="name"
          rules={[
            { type: "string",message: "The input is not valid name!", },
            { message: "Please input your name!", },
          ]}
          hasFeedback
        >
          <Input className="user-form-imput" defaultValue={displayName} placeholder={displayName} />
        </Form.Item>
        <Form.Item
          label="email: "
          name="email"
          rules={[
            { type: "email",message: "The input is not valid E-mail!", },
            { message: "Please input your E-mail!", },
          ]}
        >
          <Input className="user-form-imput" defaultValue={email} placeholder={email} />
        </Form.Item>
        <Form.Item
          name="password"
          label="密碼"
          rules={[
            { message: "Please input your password!", },
          ]}
          hasFeedback
        >
          <Input.Password className="user-form-imput" />
        </Form.Item>
        <Form.Item
          name="rePassword"
          label="再次輸入密碼"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { message: "Please re-enter your password!", },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password className="user-form-imput"/>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
            style={{ background: "#B27CC5", borderColor: "#B27CC5"}}
          >
            提交
          </Button>
          <Button
            type="danger"
            style={{ marginTop: "0.8rem" }}
            className="login-form__button"
            onClick={handleLogout}
          >
            登出
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ProfileCard;
