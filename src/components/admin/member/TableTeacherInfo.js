import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, Space, Table, Tag } from 'antd';
import 'date-fns';
import React from 'react';
import { CreateUser } from './components/CreateUser';

const { Option } = Select;

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
];

const data = [
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['late'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['late'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['late'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    institua: 'THÔNG TIN KHOA HỌC',
    phone: '0353005557',
    email: 'thangth@gmail.com',
    status: ['absent'],
  },
];

export const TableTeacherInfo = () => {
  return (
    <div>
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
          />
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CreateUser title="Thêm giảng viên" />
        </Space>
      </div>
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};
