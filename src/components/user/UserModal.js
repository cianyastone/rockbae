import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { loginToFirebase, rememberLoginUser, registerToFirebase } from '../../actions'
import { StoreContext } from "../../store"

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const UserModal = ({ redirect, isModalVisible, toggleModal }) => {
  const { state:{ userSignin: { userInfo, loading, error, remember } }, dispatch } = useContext(StoreContext);
  const [form] = Form.useForm();
  const history = useHistory();
  const handleCancel = () => toggleModal(!isModalVisible);
  const [isLogin, setIsLogin] = useState(true);
  const handleLogin = () => setIsLogin(!isLogin);
 
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await loginToFirebase(dispatch, values);
  };

  const onChange = e => {
    rememberLoginUser(dispatch, e.target.checked);
  }

  const onFinish2 = async (values) => {
    console.log('Received values of form: ', values);
    await registerToFirebase(dispatch, values);
  };

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [userInfo]);

  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
    {isLogin 
      ?<Form
      name="normal_login"
      className="user-modal-form"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <p className="shipping-title">登入</p>
      <hr className="hr-user"></hr>
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
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="E-Mail"
          className="user-form-imput"
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
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          className="user-form-imput"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item
          name="remember"
          noStyle
        >
          <Checkbox onChange={onChange} checked={remember}>記住我</Checkbox>
        </Form.Item>
        <Link className="login-form__forgot" to={"/"}>
          忘記密碼
        </Link>
      </Form.Item>
      <Form.Item>
        {loading ? (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
            loading
            style={{ background: "#C59CD3", borderColor: "#C59CD3"}}
          >
            登入
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
            style={{ background: "#B27CC5", borderColor: "#B27CC5"}}
          >
            登入
          </Button>
        )}
        或 <Link onClick={handleLogin}>點此註冊</Link>
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
      : <Form
      form={form}
      name="register"
      onFinish={onFinish2}
      className="user-modal-form"
      scrollToFirstError
    >
      <p className="shipping-title">註冊</p>
      <hr className="hr-user"></hr>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
            whitespace: true,
          },
        ]}
      >
        <Input prefix={<UserOutlined />} className="user-form-imput" placeholder="暱稱"/>
      </Form.Item>
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
      >
        <Input prefix={<MailOutlined />} className="user-form-imput" placeholder="E-mail"/>
      </Form.Item>
      <Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input.Password prefix={<LockOutlined />} className="user-form-imput" placeholder="密碼"/>
        </Form.Item>
        <Form.Item
          name="rePassword"
          dependencies={["password"]}
          hasFeedback
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          rules={[
            {
              required: true,
              message: "Please re-enter your password!",
            },
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
          <Input.Password prefix={<LockOutlined />} className="user-form-imput" placeholder="確認"/>
        </Form.Item>
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          我已閱讀 <Link to={"/"}>條款</Link>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {loading ? (
          <Button
            type="primary"
            className="login-form__button"
            htmlType="submit"
            loading
            style={{ background: "#C59CD3", borderColor: "#C59CD3"}}
          >
            註冊
          </Button>
        ) : (
          <Button
            type="primary"
            className="login-form__button"
            htmlType="submit"
            style={{ background: "#B27CC5", borderColor: "#B27CC5"}}
          >
            註冊
          </Button>
        )}
         已經有帳號了嗎？{" "}
        <Link onClick={handleLogin}>點此登入</Link>
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
    }
    </Modal>
  );
};
export default UserModal;
