import { makeStyles } from '@material-ui/core/styles';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import backgroundImage from '../../assets/background.svg';
import logo from '../../assets/logo.png';

const useStyles = makeStyles({
  left: {
    height: '100vh',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imgLeft: {
    width: '100%',
    height: '100%',
    paddingLeft: 100,
  },
  topRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  form: { margin: '0 auto' },
});

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const Login = () => {
  const classes = useStyles();

  const history = useHistory();

  const [form] = Form.useForm();
  const handleSubmit = () => {
    history.push('/attendence');
  };

  return (
    <div>
      <Row>
        <Col span={12} style={{ height: '100vh' }}>
          <img
            src={backgroundImage}
            className={classes.imgLeft}
            alt="background"
          />
        </Col>
        <Col span={12} style={{ height: '100vh' }} className={classes.topRight}>
          <Row>
            <Col className={classes.topHeader}>
              <img
                src={logo}
                alt="logo"
                style={{ width: '10rem', margin: '0 auto' }}
              />
              <Typography
                style={{
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '3rem',
                  padding: '20',
                }}
              >
                Hệ thống quản lý học viên
              </Typography>
            </Col>
            <Form
              form={form}
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              // onFinish={handleOnFinish}
              // onFinishFailed={onFinishFailed}
              className={classes.form}
            >
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập tên đăng nhập!',
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập mật khẩu!',
                  },
                ]}
              >
                <Input.Password size="large" style={{ height: '120%' }} />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <a className="login-form-forgot" href="/">
                  Quên mật khẩu
                </a>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  size="middle"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
