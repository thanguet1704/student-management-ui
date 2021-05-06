import {
  FileExcelFilled,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Upload } from 'antd';
import 'date-fns';
import { DateSelect } from '../../report/components/DateSelect';
import moment from 'moment';

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

export const TableReportAttendence = (props) => {
  const handleOnChange = (value) => {
    props.setOffsetAttendence((value.current - 1) * 15);
  };

  return (
    <div style={{ marginTop: 20 }}>
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
              onChange={(e) => props.setSearchNameAttendence(e.target.value)}
            />
          </Space>
          <Space>
            <DateSelect title={`Lọc ngày`} setDate={props.setDateAttendence} />
          </Space>
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Upload>
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
      <Table
        columns={columns}
        dataSource={props.attendenceData.data}
        size="middle"
        onChange={(value) => handleOnChange(value)}
        bordered={true}
        pagination={{
          simple: true,
          defaultPageSize: 15,
          total: props.attendenceData.totalPage * 15,
        }}
      />
    </div>
  );
};
