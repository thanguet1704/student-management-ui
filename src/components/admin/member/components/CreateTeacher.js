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

  const handleCreateTeacher = () => {
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
    setFileList();
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

  const [fileList, setFileList] = useState([]);
  const [currentTab, setCurrentTab] = useState(1);

  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append('file', fileList);

    axiosClient
      .post(`/users/teachers`, formData, {
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

  const handleCreate = () => {
    if (currentTab === 1) {
      handleCreateTeacher();
    } else {
      handleUpload();
    }
    props.handleGetTeachers();
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
          destroyOnClose={true}
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
          <Tabs
            defaultActiveKey="1"
            type="card"
            onChange={(value) => setCurrentTab(value)}
          >
            <TabPane tab="Thêm Giảng viên" key="1">
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
                  rules={[
                    { required: true, message: 'Hãy nhập số điện thoại!' },
                  ]}
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
                        return (
                          <Option value={institua.id}>{institua.name}</Option>
                        );
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
                    <DatePicker
                      defaultValue={moment('2015-06-06', dateFormat)}
                    />
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
            </TabPane>
            <TabPane tab="Chọn File" key="2">
              <Upload
                {...upload}
                maxCount={1}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleOnChange}
                progress={{
                  strokeColor: {
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  },
                  strokeWidth: 3,
                  format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
                }}
                action={handleUpload}
              >
                <Button icon={<UploadOutlined />} style={{ borderRadius: 5 }}>
                  Chọn file
                </Button>
              </Upload>
            </TabPane>
          </Tabs>
        </Modal>
      </Row>
    </>
  );
};
