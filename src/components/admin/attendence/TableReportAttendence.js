import {
  FileExcelFilled,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import {
  Button,
  DatePicker,
  Input,
  message,
  Popover,
  Space,
  Table,
  Tag,
  Typography,
  Upload,
} from 'antd';
import 'date-fns';
import moment from 'moment';
import React from 'react';
import { FilterButton } from '../../../common/components/FilterButton';

const dateFormat = 'DD-MM-YYYY';

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

const filterData = [
  {
    title: 'Lớp',
    key: 'k70',
    children: [
      {
        title: 'K70 01',
        key: 'k7001',
      },
      {
        title: 'K70 02',
        key: 'k7002',
      },
    ],
  },
];

export const TableReportAttendence = () => {
  const handleOnChangeDatePicker = (date, dateString) => {
    console.log(date, dateString);
  };

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
        <Space>
          <Input
            size="large"
            placeholder="Tìm kiếm theo chuyên đề"
            prefix={<SearchOutlined />}
            style={{ borderRadius: 5, width: '100%' }}
          />
          <div
            style={{
              clear: 'both',
              whiteSpace: 'nowrap',
            }}
          >
            <Popover
              placement="bottom"
              content={<FilterButton filterData={filterData} />}
              trigger="click"
            >
              <Button style={{ border: 'none', width: '20%' }}>
                <TuneOutlinedIcon />
              </Button>
            </Popover>
          </div>
          <Space>
            <Typography>Lọc theo ngày:</Typography>
          </Space>
          <Space direction="vertical">
            <DatePicker
              onChange={handleOnChangeDatePicker}
              defaultValue={moment(new Date(), dateFormat)}
              format={dateFormat}
              size="large"
              style={{ borderRadius: 5 }}
            />
          </Space>
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          <Upload>
            <Button
              icon={<FileExcelFilled style={{ color: '#366F38' }} />}
              size="large"
              style={{ borderRadius: 5 }}
            >
              Export
            </Button>
          </Upload>
        </Space>
      </div>
      <Table columns={columns} dataSource={data} size="middle" />;
    </div>
  );
};
