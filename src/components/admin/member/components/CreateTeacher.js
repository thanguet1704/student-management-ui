import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';

const { Option } = Select;

export const CreateTeacher = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [institua, setInstitua] = useState();
  const [instituas, setInstituas] = useState([]);
  const [name, setName] = useState();
  const [address, setAddress] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    axiosClient
      .post(`/users/teacher`, {
        name,
        address,
        instituaId: institua.id,
        email: username,
        phone: password,
      })
      .then((res) => {
        message.success('Thêm thành công');
        setIsModalVisible(false);
        props.handleGetTeachers();
      })
      .catch((error) => {
        message.error(error.response.data.error);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGetInsituas = async () => {
    const res = await axiosClient.get('/instituas');
    setInstituas(res.data);
    setInstitua(res.data[0]);
  };

  const handleChangeInstitua = (value) => {
    const institua = instituas.find((ins) => ins.id === value);
    setInstitua(institua);
  };

  useEffect(() => {
    handleGetInsituas();
  }, []);

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
        Thêm Giảng viên
      </Button>
      <Row>
        <Modal
          title="Thêm Giảng viên"
          visible={isModalVisible}
          footer={[
            <Button
              key="back"
              onClick={handleCancel}
              style={{ borderRadius: 5 }}
            >
              Hủy
            </Button>,
            <Button
              type="primary"
              onClick={handleCreate}
              style={{
                backgroundColor: 'rgb(76, 124, 253)',
                color: '#fff',
                borderRadius: 5,
              }}
            >
              Tạo
            </Button>,
          ]}
        >
          <Form name="register" layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Nhập Email!' }]}
            >
              <Input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                type="email"
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="password"
              rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}
            >
              <Input onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: 'Hãy nhập họ và tên!' }]}
            >
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Viện"
              name="institua"
              rules={[{ required: true, message: 'Hãy chọn viện!' }]}
            >
              <Select
                defaultValue={institua?.id}
                value={institua?.id}
                size="large"
                onChange={(value) => handleChangeInstitua(value)}
              >
                {instituas.length > 0 &&
                  instituas.map((institua) => {
                    return <Option value={institua.id}>{institua.name}</Option>;
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Hãy chọn viện!' }]}
            >
              <Input onChange={(e) => setAddress(e.target.value)} />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
};
