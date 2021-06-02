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
  Typography,
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
  const [teachers, setTeachers] = useState({});
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
      .get(
        `/users/teachers?search=${searchName}&limit=${pageSize}&offset=${
          (currentPage - 1) * pageSize
        }`
      )
      .then((res) => {
        const data = res.data.data.map((teacher, index) => ({
          stt: index + 1,
          ...teacher,
        }));
        setTeachers({ totalPage: res.data.totalPage, data });
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
    setBirthday(moment(date, 'YYYY-MM-DD').format());
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
      title: (
        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
          STT
        </Typography>
      ),
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      width: '4%',
    },
    {
      title: (
        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Họ và tên
        </Typography>
      ),
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: (
        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Giới tính
        </Typography>
      ),
      dataIndex: 'gender',
      key: 'gender',
      render: (value) => (value === 'male' ? 'Nam' : 'Nữ'),
      align: 'center',
      width: '6%',
    },
    {
      title: (
        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Viện
        </Typography>
      ),
      dataIndex: 'institua',
      key: 'institua',
      render: (institua) => institua.name,
      align: 'center',
    },
    {
      title: (
        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Số điện thoại
        </Typography>
      ),
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      width: '10%',
    },
    {
      title: (
        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Email
        </Typography>
      ),
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: (
        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Địa chỉ
        </Typography>
      ),
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: (
        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Hành động
        </Typography>
      ),
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
      align: 'center',
      width: '5%',
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
        dataSource={teachers.data}
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
                defaultValue={moment(birthday, dateFormat)}
                onChange={(date, dateString) => handleOnChangeDate(dateString)}
                format="YYYY-MM-DD"
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
