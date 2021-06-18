import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { loginToFirebase, rememberLoginUser } from '../../actions'
import { StoreContext } from "../../store"
import Register from "./Register";

const Login = ({ redirect, isModalVisible, toggleModal }) => {
  const { state:{ userSignin: { userInfo, loading, error, remember } }, dispatch } = useContext(StoreContext);
  const [form] = Form.useForm();
  const history = useHistory();
  const handleCancel = () => toggleModal(!isModalVisible);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const toggleRegisterModal = () => setIsRegisterVisible(!isRegisterVisible);
 
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await loginToFirebase(dispatch, values);
  };

  const onChange = e => {
    rememberLoginUser(dispatch, e.target.checked);
  }

  useEffect(() => {
    if(userInfo) history.push(redirect);
  }, [ userInfo ]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      title="登入"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
        <Form
        name="normal_login"
        className="login-form"
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="E-Mail"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item
            name="remember"
            noStyle
          >
            <Checkbox onChange={onChange} checked={remember}>Remember me</Checkbox>
          </Form.Item>

          <Link className="login-form__forgot" to={"/"}>
            Forgot password
          </Link>
        </Form.Item>

        <Form.Item>
          {loading ? (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form__button"
              style={{ background: "#C59CD3", borderColor: "#C59CD3"}}
              loading
            >
              Log in
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form__button"
              style={{ background: "#B27CC5", borderColor: "#B27CC5"}}
            >
              Log in
            </Button>
          )}
          Or <Link onClick={toggleRegisterModal}>register now!<Register isModalVisible={isRegisterVisible} toggleModal={toggleRegisterModal}/></Link>
          {error === "" ? (
            <></>
          ) : (
            <div className="login-form__error-wrap">
              <h3 className="login-form__error-title">
                <WarningOutlined className="site-form-item-icon" />
                {"  "}There was a problem
              </h3>
              <p className="login-form__error-message">{error}</p>
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Login;
