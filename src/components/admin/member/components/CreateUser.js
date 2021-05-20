import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Row } from 'antd';
import React, { useState } from 'react';

export const CreateUser = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        icon={<PlusOutlined />}
        size="large"
        style={{
          backgroundColor: 'rgb(76, 124, 253)',
          borderRadius: 5,
        }}
      >
        {props.title}
      </Button>
      <Row>
        <Modal
          title="Thêm học viên"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form name="register" layout="vertical">
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[{ required: true, message: 'Nhập tên đăng nhập!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
};
