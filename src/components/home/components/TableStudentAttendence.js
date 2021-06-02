import { Table, Tag, Space, Input, Typography, Select } from 'antd';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../api/config';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';

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
    width: '5%',
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
        Chuyên đề
      </Typography>
    ),
    dataIndex: 'category',
    key: 'category',
    align: 'center',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Thời gian vào
      </Typography>
    ),
    dataIndex: 'timeIn',
    key: 'timeIn',
    render: (time) => {
      return moment(time).format('HH:MM:SS');
    },
    align: 'center',
    width: '7%',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Thời gian ra
      </Typography>
    ),
    dataIndex: 'timeOut',
    key: 'timeOut',
    render: (time) => {
      return moment(time).format('HH:MM:SS');
    },
    align: 'center',
    width: '7%',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Ngày
      </Typography>
    ),
    dataIndex: 'date',
    key: 'date',
    render: (time) => {
      return moment(time).format('DD-MM-YYYY');
    },
    align: 'center',
    width: '7%',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Trạng Thái
      </Typography>
    ),
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
    align: 'center',
    width: '7%',
  },
];
const { Option } = Select;

export const TableStudentAttendence = (props) => {
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const [data, setData] = useState({ totalPage: 0, data: [] });
  const [semesters, setSemesters] = useState([]);
  const [semester, setSemester] = useState(0);

  const handleOnChange = (value) => {
    setCurrent(value.current);
  };

  const handleGetData = () => {
    axiosClient
      .get(
        `/attendence?semesterId=${semester?.id}&searchName=${encodeURIComponent(
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
      .catch((err) => {});
  };

  const handleGetSemesters = () => {
    axiosClient.get('/semesters').then((res) => setSemesters(res.data));
  };

  const handleChangeSemester = (value) => {
    const s = semesters?.find((item) => item.id === value);
    setSemester(s);
  };

  useEffect(() => {
    handleGetSemesters();
    handleGetData();
  }, [current, props.searchName, semester]);

  return (
    <div>
      <Space size="large" style={{ marginTop: 20, marginBottom: 20 }}>
        <Space>
          <Input
            size="large"
            placeholder="Tìm kiếm theo chuyên đề"
            prefix={<SearchOutlined />}
            style={{ borderRadius: 5, width: '100%' }}
            onChange={(e) => props.setSearchName(e.target.value)}
          />
        </Space>
        <Space>
          <Typography>Học kỳ:</Typography>
          <Select
            defaultValue={props.semester?.id}
            value={props.semester?.id}
            size="large"
            onChange={handleChangeSemester}
            style={{ minWidth: '15vw' }}
          >
            {semesters &&
              semesters.map((data) => (
                <Option value={data.id}>{data.name}</Option>
              ))}
          </Select>
        </Space>
      </Space>
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
