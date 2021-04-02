import { SearchOutlined } from '@ant-design/icons';
import { Input, Select, Space, Table, Tag, Typography } from 'antd';
import 'date-fns';
import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Upload, Button } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;

const dateFormat = 'DD-MM-YYYY';
const { RangePicker } = DatePicker;

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

export const TableReportAttendence = () => {
  const [state, setState] = React.useState(null);

  const handleChangeFile = (info) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setState({ fileList });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Space>
          <Input
            size="large"
            placeholder="Tìm kiếm theo chuyên đề"
            prefix={<SearchOutlined />}
            style={{ borderRadius: 5, width: '100%' }}
          />
          <Space>
            <Typography>Lớp: </Typography>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              // onChange={handleChange}
            >
              <Option value="jack">K62CH</Option>
              <Option value="lucy">K6CA</Option>
              <Option value="Yiminghe">K62CB</Option>
            </Select>
          </Space>
          <Space direction="vertical" size={12}>
            <RangePicker
              defaultValue={[
                moment(moment().subtract(7, 'd'), dateFormat),
                moment(new Date(), dateFormat),
              ]}
              style={{ width: '65%' }}
            />
          </Space>
        </Space>
        <Space
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end',
          }}
        >
          <Upload>
            <Button icon={<DownloadOutlined />}>Import</Button>
          </Upload>
          <Upload>
            <Button icon={<UploadOutlined />}>Export</Button>
          </Upload>
        </Space>
      </div>
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};
