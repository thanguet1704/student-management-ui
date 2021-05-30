import { Form, Input, message, Select, DatePicker, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';
import moment from 'moment';
const { Option } = Select;

const plainOptions = ['Nam', 'Nữ'];

const dateFormat = 'YYYY-MM-DD';

export const UpdateTeacher = (props) => {
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

  const handleUpdateTeacher = () => {
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
    <Form name="register" layout="vertical">
      <Form.Item label="Email" name="email">
        <Input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          type="email"
          disabled
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
      <Space size="large">
        <Form.Item label="Ngày sinh" name="birthday">
          <DatePicker defaultValue={moment('2015-06-06', dateFormat)} />
        </Form.Item>
        <Form.Item label="Giới tính" name="gender">
          <Radio.Group
            options={plainOptions}
            // onChange={this.onChange1}
            // value={value1}
          />
        </Form.Item>
      </Space>
    </Form>
  );
};
