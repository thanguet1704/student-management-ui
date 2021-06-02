import { ConsoleSqlOutlined, PlusOutlined } from '@ant-design/icons';
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
const dateFormat = 'YYYY-MM-DD';

export const CreateStudent = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUserName] = useState('');
  const [classObject, setClassObject] = useState();
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState('male');
  const [birthday, setBirthday] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCreateStudent = () => {
    axiosClient
      .post(`/users/student`, {
        msv: username,
        name,
        address,
        phone,
        classId: classObject.id,
        birthday,
        gender,
      })
      .then((res) => {
        message.success('Thêm thành công');
        setIsModalVisible(false);
      })
      .catch((error) => message.error(error.response.data.error));
  };

  const handleCreate = () => {
    if (currentTab === 1) {
      handleCreateStudent();
    } else {
      handleUpload();
    }
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

  const onChangeGender = (e) => {
    setGender(e.target.value);
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
            <TabPane tab="Thêm Học viên" key="1">
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
                <Space size="large">
                  <Form.Item label="Ngày sinh" name="birthday">
                    <DatePicker
                      defaultValue={moment('2015-06-06', dateFormat)}
                      size="large"
                      onChange={(date, dateString) => {
                        setBirthday(new Date(dateString).toISOString());
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Giới tính" name="gender">
                    <Radio.Group
                      onChange={onChangeGender}
                      defaultValue={gender}
                    >
                      <Radio value={'male'}>Nam</Radio>
                      <Radio value={'female'}>Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Space>
              </Form>
            </TabPane>
            <TabPane tab="Chọn file" key="2">
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
