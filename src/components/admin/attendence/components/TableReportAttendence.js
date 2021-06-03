import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Typography, Select } from 'antd';
import 'date-fns';
import { DateSelect } from '../../report/components/DateSelect';
import moment from 'moment';
import UploadFile from '../../../../common/components/UploadFile';
import { useEffect, useState } from 'react';
import ExportFile from './ExportFile';
import { axiosClient } from '../../../../api';

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
      return time;
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
const limit = 12;

export const TableReportAttendence = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [classes, setClasses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOnChange = (value) => {
    props.setOffsetAttendence((value.current - 1) * limit);
  };

  const handleGetClass = async () => {
    const res = await axiosClient.get('/class');
    setClasses(res.data);
    props.setClassObject(res.data[0]);
  };

  const handleChangeClass = async (value) => {
    const cla = classes.find((classs) => classs.id === value);
    props.setClassObject(cla);
  };

  const handleGetSemesters = () => {
    axiosClient.get('/semesters').then((res) => {
      setSemesters(res.data);
      props.setSemester(res.data[0]);
    });
  };

  const handleChangeSemester = (value) => {
    const s = semesters?.find((item) => item.id === value);
    props.setSemester(s);
  };

  useEffect(() => {
    handleGetSemesters();
    handleGetClass();
  }, []);

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
            <Typography>Học kỳ:</Typography>
            <Select
              defaultValue={props.semester.id}
              value={props.semester.id}
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
          <Space>
            <Typography>Lớp:</Typography>
            <Select
              defaultValue={props.classObject?.id}
              value={props.classObject?.id}
              size="large"
              style={{ width: '7vw' }}
              onChange={(value) => handleChangeClass(value)}
            >
              {classes.length > 0 &&
                classes.map((classs) => {
                  return <Option value={classs.id}>{classs.name}</Option>;
                })}
            </Select>
          </Space>
          <Space>
            <DateSelect
              title={`Lọc ngày`}
              setDate={props.setDateAttendence}
              date={props.dateAttendence}
              semester={props.semester}
            />
          </Space>
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={showModal}
            icon={<UploadOutlined />}
            style={{
              borderRadius: 5,
              backgroundColor: 'rgb(76, 124, 253)',
              color: '#fff',
            }}
            size="large"
          >
            Điểm danh
          </Button>
          <UploadFile
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            handleGetAttendences={props.handleGetAttendences}
          />
          {props.attendenceData.data.length > 0 ? (
            <ExportFile
              dateAttendence={props.dateAttendence}
              semester={props.semester}
              classObject={props.classObject}
            />
          ) : (
            <></>
          )}
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
          defaultPageSize: limit,
          total: props.attendenceData.totalPage * limit,
        }}
      />
    </div>
  );
};
