import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message, Space, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './index.css';
import { useAuthContext } from '../../context/AuthContext';
import { setToken } from '../../helpers';
import { LOCAL_API_URL } from '../../constants';
import Logo from '../../assets/login-banner.avif';

const { Title } = Typography;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password
      };
      const response = await fetch(`${LOCAL_API_URL}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        setToken(data.jwt);
        setUser(data.user);
        message.success(`Welcome back ${data.user.username}!`);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className="login-form">
    {error ? (
      <Alert
        className="alert_error"
        message={error}
        type="error"
        closable
        afterClose={() => setError('')}
      />
    ) : null}
    <div className="login-wrapper">
      <Form
        name="normal_login"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="login-container">
          <Space>
            <Title level={2}>Welcome Back!</Title>
          </Space>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your Email!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!'
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
          {isLoading && <Title level={5}>Loading</Title> }
        </div>
      </Form>
      <div className="login-page-image">
        <img src={Logo} />
      </div>
    </div>
  </div>
  );
};

export default Login;
