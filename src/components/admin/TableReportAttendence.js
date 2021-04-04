import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import {
  Button,
  DatePicker,
  Input,
  Popover,
  Space,
  Table,
  Tag,
  Upload,
  Typography,
} from 'antd';
import 'date-fns';
import moment from 'moment';
import React from 'react';
import { FilterButton } from '../../common/components/FilterButton';

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
          <Space direction="vertical" size={12}>
            <RangePicker
              defaultValue={[
                moment(moment().subtract(7, 'd'), dateFormat),
                moment(new Date(), dateFormat),
              ]}
              style={{ width: '65%' }}
              size="large"
            />
          </Space>
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Upload>
            <Button
              icon={<FileExcelFilled style={{ color: '#366F38' }} />}
              size="large"
            >
              Import
            </Button>
          </Upload>
          <Upload>
            <Button
              icon={<FileExcelFilled style={{ color: '#366F38' }} />}
              size="large"
            >
              Export
            </Button>
          </Upload>
        </Space>
      </div>
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};