import { Button, Form, Input, Modal } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export const UserOption = (props) => {
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
          <Form
            name="basic"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
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
      <Link to="/login">
        <Button style={{ border: 'none' }}>Đăng xuất</Button>
      </Link>
    </div>
  );
};
