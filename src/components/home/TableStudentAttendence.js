import { Table, Tag } from 'antd';
import React from 'react';

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

export const TableStudentAttendence = () => {
  return <Table columns={columns} dataSource={data} />;
};
