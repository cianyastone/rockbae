import { Link, useHistory } from "react-router-dom";
import React, { useContext, useEffect } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { registerToFirebase } from '../../actions'
import { StoreContext } from "../../store"
import BreadcrumbItem from "../normal/BreadcrumbItem";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
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

const Register = ({ redirect }) => {
  const { state: { userRegister: { userInfo, loading, error } }, dispatch } = useContext(StoreContext);
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await registerToFirebase(dispatch, values);
  };

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [userInfo]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="post-container">
      <BreadcrumbItem link={'register'} name={'註冊'} />
      <Form
      form={form}
      name="register"
      onFinish={onFinish}
      className="user-form"
      scrollToFirstError
    >
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
         <Link to={"/login?redirect=shipping"}>點此登入</Link>
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
    </div>
  );
};
export default Register;
