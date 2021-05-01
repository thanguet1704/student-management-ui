import { Button, Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';

export const UserOption = (props) => {
  const handleLogout = () => {
    localStorage.removeItem('hcmaid');
  };

  // useEffect(() => {
  //   handleLogout();
  // }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
      <Button style={{ border: 'none' }} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
};
