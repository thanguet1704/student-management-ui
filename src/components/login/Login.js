import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Row,
  Typography,
  message,
} from 'antd';
import 'antd/dist/antd.css';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosClient } from '../../api/config';
import backgroundImage from '../../assets/background.svg';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/AuthProvider';
import './login.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const Login = (props) => {
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleLogin = () => {
    axiosClient
      .post('login', { username, password })
      .then((res) => {
        localStorage.setItem('hcmaid', res.data.access_token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('name', res.data.name);

        setAuth({ name: res.data.name, role: res.data.role });
        // message.success('Đăng nhập thành công');
        switch (res.data.role) {
          case 'student':
            history.push('/attendence');
            break;

          default:
            history.push('/admin/studentManagement');
            break;
        }
      })
      .catch((error) => setError(true));
  };

  return (
    <div>
      <Row>
        <Col style={{ padding: 100, boxSizing: 'border-box' }} className="left">
          <img src={backgroundImage} alt="background" />
        </Col>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={logo} alt="logo" style={{ width: '15rem' }} />
          <Typography
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: '3rem',
              padding: '20',
            }}
          >
            Đăng nhập hệ thống
          </Typography>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item>
              {error ? (
                <Alert
                  message="Tên đăng nhập hoặc mật khẩu không chính xác"
                  type="error"
                  showIcon
                />
              ) : (
                <></>
              )}
            </Form.Item>

            <Form.Item
              {...layout}
              label="Tên đăng nhập"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập tên đăng nhập!',
                },
              ]}
            >
              <Input
                size="large"
                onChange={(e) => setUsername(e.target.value)}
                style={{ height: '200%' }}
              />
            </Form.Item>

            <Form.Item
              {...layout}
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mật khẩu!',
                },
              ]}
            >
              <Input.Password
                size="large"
                style={{ height: '200%' }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item {...layout} label="" name="">
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleLogin}
                size="large"
                style={{
                  borderRadius: 5,
                  backgroundColor: 'rgb(76, 124, 253)',
                }}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
