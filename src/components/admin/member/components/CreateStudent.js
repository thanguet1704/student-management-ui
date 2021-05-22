import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';

const { Option } = Select;

export const CreateStudent = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUserName] = useState('');
  const [classObject, setClassObject] = useState();
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    axiosClient
      .post(`/users/student`, {
        username,
        name,
        address,
        phone,
        classId: classObject.id,
      })
      .then((res) => {
        message.success('Thêm thành công');
        setIsModalVisible(false);
      })
      .catch((error) => message.error(error.response.data.error));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGetClass = async () => {
    const res = await axiosClient.get('/class');
    setClasses(res.data);
    setClassObject(res.data[0]);
  };

  const handleChangeClass = async (value) => {
    const cla = classes.find((classs) => classs.id === value);
    setClassObject(cla);
  };

  useEffect(() => {
    handleGetClass();
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
        {props.title}
      </Button>
      <Row>
        <Modal
          title="Thêm Học Viên"
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
              label="Mã Học viên"
              name="mhv"
              rules={[{ required: true, message: 'Nhập tên đăng nhập!' }]}
            >
              <Input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: 'Hãy nhập họ và tên!' }]}
            >
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Lớp"
              name="class"
              rules={[{ required: true, message: 'Hãy chọn lớp!' }]}
            >
              <Select
                defaultValue={classObject?.id}
                value={classObject?.id}
                size="large"
                onChange={(value) => handleChangeClass(value)}
              >
                {classes.length > 0 &&
                  classes.map((classs) => {
                    return <Option value={classs.id}>{classs.name}</Option>;
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
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Hãy chọn viện!' }]}
            >
              <Input onChange={(e) => setPhone(e.target.value)} />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
};
