import { SearchOutlined } from '@ant-design/icons';
import {
  Input,
  Space,
  Table,
  Tag,
  Typography,
  Select,
  Modal,
  Button,
  Form,
  DatePicker,
  Radio,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';
import { CreateStudent } from '../components/CreateStudent';
import ExportStudent from './ExportStudent';
import { createFromIconfontCN } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2580724_poq8awqndj.js',
});

export const TableStudentInfo = () => {
  const [students, setStudents] = useState({});
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [id, setId] = useState();
  const [classId, setClassId] = useState('');
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mhv, setMhv] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(
    moment(new Date().toISOString(), dateFormat)
  );

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
          Mã học viên
        </Typography>
      ),
      dataIndex: 'msv',
      key: 'msv',
      align: 'center',
      width: '7%',
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
          Ngày sinh
        </Typography>
      ),
      dataIndex: 'birthday',
      key: 'birthday',
      render: (date) => moment(date).format('DD-MM-YYYY'),
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
      render: (gender) => (gender === 'male' ? 'Nam' : 'Nữ'),
      align: 'center',
      width: '7%',
    },
    {
      title: (
        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Viện
        </Typography>
      ),
      dataIndex: 'institua',
      key: 'institua',
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
          Trạng thái
        </Typography>
      ),
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      width: '7%',
      render: (status) => {
        let color;
        let display;
        switch (status) {
          case true: {
            color = 'green';
            display = 'Hoạt động';
            break;
          }

          case false: {
            color = 'red';
            display = 'Đã khóa';
            break;
          }
          default:
            break;
        }

        return (
          <Tag color={color} key={status}>
            {display}
          </Tag>
        );
      },
    },
    {
      title: (
        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Hành động
        </Typography>
      ),
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: '5%',
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

  const showModal = (text) => {
    setIsModalVisible(true);

    setId(text.id);
    setClassId(text.class.id);
    setName(text.name);
    setAddress(text.address);
    setEmail(text.email);
    setMhv(text.msv);
    setGender(text.gender);
    setBirthday(moment(text.birthday, dateFormat).format());
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGetStudents = () => {
    axiosClient
      .get(
        `/users/students?classId=${
          classObject?.id
        }&search=${searchName}&limit=${pageSize}&offset=${
          (currentPage - 1) * pageSize
        }`
      )
      .then((res) => {
        const data = res.data.data.map((student, index) => ({
          stt: index + 1,
          ...student,
        }));
        setStudents({ totalPage: res.data.totalPage, data });
      })
      .catch((error) => {});
  };

  const handleOnChange = (value) => {
    setCurrentPage(value?.current);
  };

  const [classObject, setClassObject] = useState();

  const handleGetClass = async () => {
    const res = await axiosClient.get('/class');
    setClasses(res.data);
    setClassObject(res.data[0]);
  };

  const handleChangeClass = async (value) => {
    const cla = classes.find((classs) => classs.id === value);
    setClassObject(cla);
    setClassId(cla.id);
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
        email,
        classId,
        birthday,
        gender,
      })
      .then((res) => {
        message.success('Thêm thành công');

        setIsModalVisible(false);
        handleGetStudents();
      })
      .catch((error) => message.error(error.response.data.error));
  };

  useEffect(() => {
    handleGetClass();
  }, []);

  useEffect(() => {
    handleGetStudents();
  }, [searchName, currentPage, classObject]);

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
            placeholder="Tìm kiếm theo tên học viên"
            prefix={<SearchOutlined />}
            style={{ borderRadius: 5, width: '100%' }}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
          <Space>
            <Typography>Chọn Lớp:</Typography>
            <Select
              defaultValue={classObject?.id}
              value={classObject?.id}
              size="large"
              style={{ width: '7vw' }}
              onChange={(value) => handleChangeClass(value)}
            >
              {classes.length > 0 &&
                classes.map((classs) => {
                  return <Option value={classs.id}>{classs.name}</Option>;
                })}
            </Select>
          </Space>
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CreateStudent title="Thêm học viên" role="student" />
          <ExportStudent classObject={classObject} />
        </Space>
      </div>
      <Table
        rowKey={1}
        columns={columns}
        dataSource={students.data}
        bordered={true}
        onChange={(value) => handleOnChange(value)}
        pagination={{
          simple: true,
          defaultPageSize: pageSize,
          total: students.totalPage * pageSize,
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
          <Form.Item label="Mã Học viên" name="mhv">
            <Input
              onChange={(e) => {
                setMhv(e.target.value);
              }}
              disabled
              defaultValue={mhv}
            />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[
              { required: true, message: 'Học và tên không được bỏ trống' },
            ]}
          >
            <Input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
            />
          </Form.Item>
          <Form.Item label="Lớp" name="class">
            <Select
              defaultValue={classId}
              value={classId}
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
            rules={[{ required: true, message: 'Địa chỉ không được bỏ trống' }]}
          >
            <Input
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={address}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email không được bỏ trống' }]}
          >
            <Input
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
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
