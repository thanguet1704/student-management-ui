import { SearchOutlined } from '@ant-design/icons';
import {
  Input,
  Space,
  Table,
  Modal,
  Button,
  Form,
  Radio,
  Select,
  DatePicker,
  message,
} from 'antd';
import 'date-fns';
import { CreateTeacher } from '../components/CreateTeacher';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';
import { createFromIconfontCN } from '@ant-design/icons';
import moment from 'moment';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2580724_poq8awqndj.js',
});
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

export const TableTeacherInfo = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [id, setId] = useState();
  const [instituaId, setInstituaId] = useState([]);
  const [instituas, setInstituas] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(
    moment(new Date().toISOString(), dateFormat)
  );

  const showModal = (value) => {
    setIsModalVisible(true);

    console.log(value);

    setId(value.id);
    setInstituaId(value.institua.id);
    setName(value.name);
    setAddress(value.address);
    setPhone(value.phone);
    setGender(value.gender);
    setEmail(value.email);
    setBirthday(moment(value.birthday, dateFormat));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGetTeachers = () => {
    axiosClient
      .get(`/users/teachers?search=${searchName}`)
      .then((res) => {
        const data = res.data.data.map((teacher, index) => ({
          stt: index + 1,
          ...teacher,
        }));
        setTeachers(data);
      })
      .catch((error) => {});
  };

  const handleOnChange = (value) => {
    setCurrentPage(value?.current);
  };

  const handleGetInstituas = async () => {
    const res = await axiosClient.get('/instituas');
    setInstituas(res.data);
    setInstituaId(res.data[0]);
  };

  const handleChangeInstitua = async (value) => {
    const ins = instituas.find((institua) => institua.id === value);
    setInstituaId(ins.id);
  };

  const onChangeGender = async (e) => {
    setGender(e.target.value);
  };

  const handleOnChangeDate = (date) => {
    setBirthday(moment(date, dateFormat).format());
  };

  const handleUpdateStudent = () => {
    axiosClient
      .patch(`/users/info`, {
        id,
        name,
        address,
        instituaId,
        birthday,
        phone,
        gender,
      })
      .then((res) => {
        message.success('Thêm thành công');

        setIsModalVisible(false);
        handleGetTeachers();
      })
      .catch((error) => message.error(error.response.data.error));
  };

  useEffect(() => {
    handleGetInstituas();
  }, []);

  useEffect(() => {
    handleGetTeachers();
  }, [searchName, currentPage]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: () => 'Nam',
    },
    {
      title: 'Viện',
      dataIndex: 'institua',
      key: 'institua',
      render: (institua) => institua.name,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (text, row) => {
        return (
          <IconFont
            type="icon-sharpicons_edit-user-profile"
            onClick={() => showModal(row)}
          />
        );
      },
    },
  ];

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          paddingBottom: 20,
        }}
      >
        <Space>
          <Input
            size="large"
            placeholder="Tìm kiếm tên Giảng viên"
            prefix={<SearchOutlined />}
            style={{
              borderRadius: 5,
              width: '100%',
            }}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CreateTeacher handleGetTeachers={handleGetTeachers} />
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={teachers}
        bordered={true}
        onChange={(value) => handleOnChange(value)}
        pagination={{
          simple: true,
          defaultPageSize: pageSize,
          total: teachers.totalPage * pageSize,
        }}
      />
      <Modal
        title="Cập nhật thông tin"
        visible={isModalVisible}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={handleCancel} style={{ borderRadius: 5 }}>
            Hủy
          </Button>,
          <Button
            type="primary"
            onClick={handleUpdateStudent}
            style={{
              backgroundColor: 'rgb(76, 124, 253)',
              color: '#fff',
              borderRadius: 5,
            }}
          >
            Cập nhật
          </Button>,
        ]}
      >
        <Form name="register" layout="vertical">
          <Form.Item label="Email" name="email">
            <Input type="email" defaultValue={email} disabled />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: 'Hãy nhập họ và tên!' }]}
          >
            <Input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}
          >
            <Input
              onChange={(e) => setPhone(e.target.value)}
              defaultValue={phone}
            />
          </Form.Item>
          <Form.Item
            label="Viện"
            name="institua"
            rules={[{ required: true, message: 'Hãy chọn viện!' }]}
          >
            <Select
              defaultValue={instituaId}
              value={instituaId}
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
            <Input
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={address}
            />
          </Form.Item>
          <Space size="large">
            <Form.Item label="Ngày sinh" name="birthday">
              <DatePicker
                defaultValue={moment(new Date().toISOString(), dateFormat)}
                onChange={(date, dateString) => handleOnChangeDate(dateString)}
                format="DD-MM-YYYY"
              />
            </Form.Item>
            <Form.Item label="Giới tính" name="gender">
              <Radio.Group
                name="radiogroup"
                defaultValue={gender}
                onChange={(e) => onChangeGender(e)}
              >
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};
