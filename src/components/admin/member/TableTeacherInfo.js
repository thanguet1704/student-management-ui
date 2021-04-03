import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  Upload,
} from 'antd';
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
    title: 'MSV',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Môn học',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <>
        {status.map((tag) => {
          let color;
          let display;
          switch (tag) {
            case 'abvent': {
              color = 'green';
              display = 'Có mặt';
              break;
            }

            case 'absent': {
              color = 'red';
              display = 'Vắng';
              break;
            }

            case 'late': {
              color = 'orange';
              display = 'Muộn';
              break;
            }
            default:
              break;
          }

          return (
            <Tag color={color} key={tag}>
              {display.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data = [
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['abvent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['abvent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['abvent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['abvent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['late'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['late'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['late'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trinh Huu Thang',
    subject: 'Mang khong day',
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
