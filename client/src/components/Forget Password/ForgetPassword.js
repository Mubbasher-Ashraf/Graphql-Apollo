// import React from 'react';
import { Link } from 'react-router-dom';
import './forget.css';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const Forget = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="forget_password"
      className="forget_password-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
        </Form.Item>

        <Form.Item
        name="forget_password"
        rules={[
          {
            required: true,
            message: 'Please enter confirm password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="confirm password"
        />
        </Form.Item>
          
      <Form.Item>
        <Button type="primary" htmlType="submit" className="forget-password-button">
          Reset Password
        </Button>
        <Link to={{ pathname: '/Login'}}> Login! </Link>
      </Form.Item>
    </Form>
  );
};
export default Forget;