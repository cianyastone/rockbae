import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button,Radio } from "antd";
import { saveShippingAddress, savePaymentMethod } from "../../actions"
import { StoreContext } from "../../store";

export default function ShippingAddressCard() {
  const { state: { cart: { shippingAddress,paymentMethod } }, dispatch } = useContext(StoreContext);
  const history = useHistory()
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    saveShippingAddress(dispatch, values)
    history.push('/placeorder');
  };

  return (
    <Form
      onFinish={handleSubmit}
      name="normal_login"
      className="shipping-form"
      initialValues={shippingAddress}
      form={form}
    >
    <p className="shipping-title">填寫寄送資料</p>
      <Form.Item
        label="全名: "
        name="fullName"
        className="shipping-form-item"
        rules={[
          {
            type: "string",
          },
          {
            required: true,
            message: "請輸入全名！",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="請輸入全名" />
      </Form.Item>
      <Form.Item
        label="地址: "
        name="address"
        rules={[
          {
            type: "string",
          },
          {
            required: true,
            message: "請輸入地址！",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="請輸入地址" />
      </Form.Item>
      <Form.Item
        label="城市: "
        name="city"
        rules={[
          {
            required: true,
            message: "請輸入郵遞區號！",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="請輸入城市" />
      </Form.Item>

      <Form.Item
        label="郵遞區號: "
        name="postalCode"
        rules={[
          {
            required: true,
            message: "請輸入郵遞區號！",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="請輸入郵遞區號" />
      </Form.Item>

      <Form.Item
        label="國家: "
        name="country"
        rules={[
          {
            required: true,
            message: "請輸入國家！",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="請輸入國家" />
      </Form.Item>
      <Form.Item 
          name="paymentMethod" 
          label="付款方式: "
          rules={[
          {
            required: true,
          },
        ]}>
            <Radio.Group>
               <Radio value="Google">Google</Radio>
               <Radio value="PayPal">PayPal</Radio>
               <Radio value="Line">Line</Radio>
            </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form__button"
        >
          Continue
        </Button>
      </Form.Item>

    </Form>
  );
}