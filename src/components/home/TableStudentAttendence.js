import { Table, Tag, Space, Input } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../api/config';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';

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
    title: 'Chuyên đề',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Thời gian vào',
    dataIndex: 'timeIn',
    key: 'timeIn',
    render: (time) => {
      return moment(time).format('HH:MM');
    },
  },
  {
    title: 'Thời gian ra',
    dataIndex: 'timeOut',
    key: 'timeOut',
    render: (time) => {
      return moment(time).format('HH:MM');
    },
  },
  {
    title: 'Ngày',
    dataIndex: 'date',
    key: 'date',
    render: (time) => {
      return moment(time).format('DD-MM-YYYY');
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color;
      let display;
      switch (status) {
        case 'attend': {
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
        <Tag color={color} key={status}>
          {display.toUpperCase()}
        </Tag>
      );
    },
  },
];

export const TableStudentAttendence = (props) => {
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const [data, setData] = useState({ totalPage: 0, data: [] });
  const history = useHistory();

  const handleOnChange = (value) => {
    setCurrent(value.current);
  };

  const handleGetData = () => {
    axiosClient
      .get(
        `/attendence?searchName=${encodeURIComponent(
          props.searchName
        )}&limit=${pageSize}&offset=${(current - 1) * pageSize}`
      )
      .then((res) => {
        const results = res.data.data.map((attendence, index) => ({
          stt: index + 1 + (current - 1) * pageSize,
          ...attendence,
        }));
        setData({ totalPage: results.totalPage, data: results });
      })
      .catch((err) => {
        // history.push('/');
      });
  };

  useEffect(() => {
    handleGetData();
  }, [current, props.searchName]);

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
            placeholder="Tìm kiếm học viên hoặc chuyên đề"
            prefix={<SearchOutlined />}
            style={{ borderRadius: 5, width: '120%', marginTop: 20 }}
            onChange={(e) => {
              props.setSearchName(e.target.value);
            }}
          />
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={data.data}
        onChange={(value) => handleOnChange(value)}
        bordered={true}
        pagination={{
          simple: true,
          defaultPageSize: pageSize,
          total: data.totalPage * pageSize,
        }}
      />
    </div>
  );
};
