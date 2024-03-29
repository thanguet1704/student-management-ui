import { Alert, Button, Col, Form, Input, Row, Typography, Spin } from 'antd';
import 'antd/dist/antd.css';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosClient } from '../../api/config';
import backgroundImage from '../../assets/background.svg';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/AuthProvider';
import './login.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setCookies } from '../../utils/Cookies';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const handleLogin = () => {
    setLoading(true);
    axiosClient
      .post('login', { username, password })
      .then((res) => {
        setLoading(false);
        setAuth({
          name: res.data.name,
          role: res.data.role,
        });

        setCookies(res.data.access_token, res.data.name, res.data.role);

        switch (res.data.role) {
          case 'student':
            history.push('/attendence');
            window.location.reload();
            break;

          default:
            history.push('/admin/studentManagement');
            window.location.reload();
            break;
        }
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <div>
      <Row>
        <Col
          xs={24}
          xl={12}
          style={{
            boxSizing: 'border-box',
            padding: 50,
          }}
          className="left"
        >
          <img src={backgroundImage} alt="background" />
        </Col>
        <Col
          xs={24}
          xl={12}
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
            size="large"
            name="normal_login"
            className="login-form"
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
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập tên đăng nhập!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tên đăng nhập"
                size="large"
                onChange={(e) => setUsername(e.target.value)}
                style={{ borderRadius: 10 }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập mật khẩu!',
                },
              ]}
            >
              <Input.Password
                style={{ borderRadius: 10 }}
                placeholder="Mật khẩu"
                prefix={<LockOutlined className="site-form-item-icon" />}
                size="large"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handleLogin}
                size="large"
                style={{
                  borderRadius: 5,
                  backgroundColor: 'rgb(76, 124, 253)',
                  minWidth: '5vw',
                }}
              >
                {isLoading ? (
                  <Spin indicator={antIcon} style={{ color: '#fff' }}>
                    Đăng nhập
                  </Spin>
                ) : (
                  'Đăng nhập'
                )}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
