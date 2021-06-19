import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { WarningOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { checkLogin, loginToFirebase, rememberLoginUser } from '../../actions'
import { StoreContext } from "../../store"
import BreadcrumbItem from "../normal/BreadcrumbItem";

const LoginCard = ({ redirect }) => {
  const { state:{ userSignin: { userInfo, loading, error, remember } }, dispatch } = useContext(StoreContext);
  const [form] = Form.useForm();
  const history = useHistory();
 
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await loginToFirebase(dispatch, values);
  };

  const onChange = e => {
    rememberLoginUser(dispatch, e.target.checked);
  }

  useEffect(() => {    
    if( userInfo && checkLogin(dispatch) ) history.push(redirect);
  }, [ userInfo ]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="post-container">
      <BreadcrumbItem link={'login'} name={'登入'} />
      <Form
      name="normal_login"
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      className="user-form"
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
      >
        <Input
          prefix={<MailOutlined />}
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
          prefix={<LockOutlined />}
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
        或 <Link to={"/register?redirect=shipping"}>點此註冊</Link>
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
export default LoginCard;
