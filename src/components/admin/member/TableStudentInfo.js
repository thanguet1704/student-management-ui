import { FileExcelFilled, SearchOutlined } from '@ant-design/icons';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import { Button, Input, Popover, Space, Table, Tag, Upload } from 'antd';
import 'date-fns';
import { default as React } from 'react';
import { FilterButton } from '../../../common/components/FilterButton';
import { CreateUser } from './components/CreateUser';

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
    title: 'Lớp',
    dataIndex: 'classHCMA',
    key: 'classHCMA',
  },
  {
    title: 'Viện',
    dataIndex: 'institua',
    key: 'institua',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color;
      let display;
      switch (status) {
        case 'active': {
          color = 'green';
          display = 'Hoạt động';
          break;
        }

        case 'inactive': {
          color = 'red';
          display = 'Đã khóa';
          break;
        }
        default:
          break;
      }

      return (
        <Tag color={color} key={status}>
          {display}
        </Tag>
      );
    },
  },
];

const data = [
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'inactive',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'inactive',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'inactive',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'inactive',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
  },
  {
    stt: '1',
    id: '17021037',
    name: 'Trịnh Hữu Thắng',
    classHCMA: 'K70 01',
    institua: 'THÔNG TIN KHOA HỌC',
    status: 'active',
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

export const TableStudentInfo = () => {
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
        </Space>

        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CreateUser title="Thêm học viên" />
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
      <Table
        columns={columns}
        dataSource={data}
        onChange={(value) => console.log(value)}
      />
      ;
    </div>
  );
};
