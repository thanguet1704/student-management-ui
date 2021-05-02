import {
  FileExcelFilled,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Input, message, Space, Table, Tag, Upload } from 'antd';
import 'date-fns';
import React, { useState } from 'react';
import { DateSelect } from '../schedule/components/DateSelect';

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
    title: 'Chuyên đề',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Thời gian vào',
    dataIndex: 'in',
    key: 'in',
  },
  {
    title: 'Thời gian ra',
    dataIndex: 'out',
    key: 'out',
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
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['abvent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['abvent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['abvent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['abvent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['late'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['late'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['late'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    category: 'Khái quát xã hội học trong lãnh đạo quản lý',
    status: ['absent'],
  },
];

export const TableReportAttendence = () => {
  const [searchName, setSearchName] = useState();

  const props = {
    name: 'file',
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          paddingBottom: 20,
        }}
      >
        <Space size="large">
          <Space>
            <Input
              size="large"
              placeholder="Tìm kiếm theo chuyên đề"
              prefix={<SearchOutlined />}
              style={{ borderRadius: 5, width: '100%' }}
            />
          </Space>
          <Space>
            <DateSelect title={`Lọc ngày`} />
          </Space>
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />} size="large">
              Điểm danh
            </Button>
          </Upload>
          <Upload>
            <Button
              icon={<FileExcelFilled style={{ color: '#366F38' }} />}
              size="large"
              style={{ borderRadius: 5 }}
            >
              Xuất danh sách
            </Button>
          </Upload>
        </Space>
      </div>
      <Table columns={columns} dataSource={data} size="middle" />;
    </div>
  );
};
