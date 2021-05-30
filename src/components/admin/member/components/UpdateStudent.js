import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tabs,
  Upload,
  DatePicker,
  Radio,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { TabPane } = Tabs;
const plainOptions = ['Nam', 'Nữ'];

const dateFormat = 'YYYY-MM-DD';

export const UpdateStudent = (props) => {
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

  const handleUpdateStudent = () => {
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

  const handleCreate = () => {
    if (currentTab === 1) {
      handleUpdateStudent();
    } else {
      handleUpload();
    }
    // props.handleGetStudents();
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

  const [fileList, setFileList] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);

  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append('file', fileList);

    axiosClient
      .post(`/users/students`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setFileList();
        message.success('Tải file lên thành công');
      })
      .catch((error) => {
        message.error(error.response.data.error);
      });
  };

  const handleOnChange = (e) => {
    setFileList(e.file);
  };

  const upload = {
    onRemove: (file) => {
      setFileList();
    },
    beforeUpload: (file) => {
      setFileList(...fileList, file);
    },
  };

  useEffect(() => {
    handleGetClass();
  }, []);

  return (
    <Form name="register" layout="vertical">
      <Form.Item label="Mã Học viên" name="mhv">
        <Input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          disabled
          value={'17021039'}
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
