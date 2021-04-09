import { Button, Form, Input, Modal } from 'antd';
import { deleteAllCookies } from 'cookies-utils';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export const UserOption = (props) => {
  const history = useHistory();
  const handleOnclickLogout = () => {
    console.log('aa');
    deleteAllCookies();
    history.push('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link>
        <Button onClick={props.showModal} style={{ border: 'none' }}>
          Đổi mật khẩu
        </Button>
        <Modal
          style={{ textAlign: 'center' }}
          title="Đổi mật khẩu"
          visible={props.isModalVisible}
          onOk={props.handleOk}
          onCancel={props.handleCancel}
        >
          <Form name="basic" initialValues={{ remember: true }}>
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[{ required: true, message: 'Hãy nhập tên đăng nhập!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu cũ"
              name="password"
              rules={[{ required: true, message: 'Nhập mật khẩu cũ!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="password"
              rules={[{ required: true, message: 'Nhập mật khẩu mới!' }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </Link>
      <Button style={{ border: 'none' }} onClick={handleOnclickLogout}>
        Đăng xuất
      </Button>
    </div>
  );
};
