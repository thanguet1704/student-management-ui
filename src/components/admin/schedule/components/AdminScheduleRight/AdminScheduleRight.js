import { Space, Typography, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

const columns = [
  {
    title: 'Thứ.Ngày',
    dataIndex: 'learnDate',
    key: 'learnDate',
    render: (date) => {
      return `${moment(new Date()).locale('vi').format('dddd')}.${date}`;
    },
  },
  {
    title: 'Môn học',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Chuyên đề',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Buổi',
    dataIndex: 'session',
    key: 'session',
  },
  {
    title: 'Số tiết',
    dataIndex: 'lession',
    key: 'lession',
  },
  {
    title: 'Giảng viên (Điện thoại)',
    dataIndex: 'teacher',
    key: 'teacher',
  },
  {
    title: 'Địa điểm',
    dataIndex: 'classroom',
    key: 'classroom',
  },
];

const AdminScheduleRight = (props) => {
  useEffect(() => {}, [props.category]);

  return (
    <Space
      style={{
        border: '1px solid #f0f0f0',
        width: '100%',
        padding: 30,
      }}
      direction="vertical"
    >
      <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>
        LỊCH GIẢNG DẠY - HỌC TẬP (Lớp: {props.classObject?.name})
      </Typography>
      <Space size="large">
        <Table
          columns={columns}
          dataSource={[
            {
              learnDate: props.learnDate,
              category: props.category.title,
              session: props.session.title,
              lession: props.category.lession,
              teacher: `${props.teacher.name} (${props.teacher.phone})`,
              subject: props.subject.name,
              classroom: props.classroom?.title,
            },
          ]}
          bordered={true}
          pagination={false}
          size="large"
        />
      </Space>
    </Space>
  );
};

export default AdminScheduleRight;
