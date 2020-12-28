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
    //   initialValues={{
    //     remember: true,
    //   }}
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
        name="forgot_password"
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/* Or <a href="">register now!</a> */}
        <Link to={{ pathname: '/'}}> Login! </Link>
      </Form.Item>
    </Form>
  );
};
export default Forget;