import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Table, Tag, Typography, Select } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';
import { CreateStudent } from '../components/CreateStudent';
import ExportStudent from './ExportStudent';

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'MSV',
    dataIndex: 'msv',
    key: 'msv',
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Lớp',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: 'Viện',
    dataIndex: 'institua',
    key: 'institua',
  },

  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'isActive',
    key: 'isActive',
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
];
const { Option } = Select;

export const TableStudentInfo = () => {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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
        setStudents(data);
      })
      .catch((error) => {});
  };

  const handleOnChange = (value) => {
    setCurrentPage(value?.current);
  };

  const [classes, setClasses] = useState([]);
  const [classObject, setClassObject] = useState();

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
          <ExportStudent />
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={students}
        bordered={true}
        onChange={(value) => handleOnChange(value)}
        pagination={{
          simple: true,
          defaultPageSize: pageSize,
          total: students.totalPage * pageSize,
        }}
      />
    </div>
  );
};
