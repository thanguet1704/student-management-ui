import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Upload } from 'antd';
import 'date-fns';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';
import { CreateUser } from '../components/CreateUser';
import { useHistory } from 'react-router-dom';

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

export const TableStudentInfo = () => {
  const [students, setStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleGetStudents = () => {
    axiosClient
      .get(`/users/students?search=${searchName}`)
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
    if (value) setCurrentPage(value.current);
  };

  useEffect(() => {
    handleOnChange();
    handleGetStudents();
  }, [searchName, currentPage]);

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
        </Space>

        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CreateUser title="Thêm học viên" />
          <Upload>
            <Button
              icon={<FileExcelFilled style={{ color: '#366F38' }} />}
              size="large"
            >
              Export
            </Button>
          </Upload>
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
