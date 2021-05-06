import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Table } from 'antd';
import 'date-fns';
import { CreateUser } from '../components/CreateUser';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';

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
    title: 'Viện',
    dataIndex: 'institua',
    key: 'institua',
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
];

export const TableTeacherInfo = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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
    if (value) setCurrentPage(value.current);
  };

  useEffect(() => {
    handleOnChange();
    handleGetTeachers();
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
            style={{
              borderRadius: 5,
              width: '100%',
            }}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CreateUser title="Thêm giảng viên" />
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
    </div>
  );
};
