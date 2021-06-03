import { Table, Typography, Space, Select } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { axiosClient } from '../../../api';
import { DateFilter } from '../../../common/components/DateFilter';

const disableColor = '#d6d6d4';
const { Option } = Select;
const mappingDay = [
  { value: 'Monday', display: 'Thứ 2' },
  { value: 'Tuesday', display: 'Thứ 3' },
  { value: 'Wednesday', display: 'Thứ 4' },
  { value: 'Thursday', display: 'Thứ 5' },
  { value: 'Friday', display: 'Thứ 6' },
  { value: 'Saturday', display: 'Thứ 7' },
  { value: 'Sunday', display: 'Chủ nhật' },
];
const columns = [
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Thứ.Ngày
      </Typography>
    ),
    dataIndex: 'learnDate',
    key: 'learnDate',
    render: (date, row) => {
      const condition =
        moment(row.learnDate) < moment(new Date().toISOString());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      const day = mappingDay.find(
        (d) => d.value === moment(new Date()).locale('vi').format('dddd')
      );

      return (
        <div>
          <Typography style={style}>{day.display}</Typography>
          <Typography style={style}>
            {moment(new Date(date)).format('DD-MM-YYYY')}
          </Typography>
        </div>
      );
    },
    align: 'center',
    width: '7vw',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Môn học
      </Typography>
    ),
    dataIndex: 'subject',
    key: 'subject',
    render: (value, row) => {
      const condition =
        moment(row.learnDate) < moment(new Date().toISOString());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
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
    render: (value, row) => {
      const condition =
        moment(row.learnDate) < moment(new Date().toISOString());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Buổi
      </Typography>
    ),
    dataIndex: 'session',
    key: 'session',
    render: (value, row) => {
      const condition =
        moment(row.learnDate) < moment(new Date().toISOString());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
    width: '5vw',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Số tiết
      </Typography>
    ),
    dataIndex: 'lession',
    key: 'lession',
    render: (value, row) => {
      const condition =
        moment(row.learnDate) < moment(new Date().toISOString());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
    width: '5vw',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Giảng viên (điện thoại)
      </Typography>
    ),
    dataIndex: 'teacher',
    key: 'teacher',
    render: (value, row) => {
      const condition =
        moment(row.learnDate) < moment(new Date().toISOString());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
  },
  {
    title: (
      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Địa điểm
      </Typography>
    ),
    dataIndex: 'classroom',
    key: 'classroom',
    render: (value, row) => {
      const condition =
        moment(row.learnDate) < moment(new Date().toISOString());

      let style = {};
      if (condition) {
        style = {
          color: disableColor,
        };
      }

      return <Typography style={style}>{value}</Typography>;
    },
    align: 'center',
    width: '7vw',
  },
];
const dateOptions = [
  { key: 0, value: 'Tất cả' },
  { key: 7, value: '7 Ngày sau' },
  { key: 14, value: '14 Ngày sau' },
  { key: 30, value: '30 Ngày sau' },
  { key: 1, value: 'Tùy chọn' },
];

export const TableStudentSchedule = (props) => {
  const [semester, setSemester] = useState();
  const [semesters, setSemesters] = useState([]);
  const [schedules, setSchedules] = useState();

  const [dateOption, setDateOption] = useState(dateOptions[0]);
  const [startDateFilter, setStartDateFilter] = useState(
    moment(moment(new Date()).format('YYYY-MM-DD')).toISOString()
  );
  const [endDateFilter, setEndDateFilter] = useState(
    moment(moment(new Date()).format('YYYY-MM-DD')).toISOString()
  );

  const handleGetSemesters = () => {
    axiosClient.get('/semesters').then((res) => {
      setSemesters(res.data);
      setSemester(res.data[0]);
    });
  };

  const handleGetSchedule = () => {
    let startDate;
    let endDate;
    if (dateOption.key === 1) {
      startDate = moment(
        moment(new Date(startDateFilter))
          .subtract(1, 'day')
          .format('YYYY-MM-DD')
      ).toISOString();
      endDate = moment(
        moment(new Date(endDateFilter)).add(1, 'day').format('YYYY-MM-DD')
      ).toISOString();
    } else if (dateOption.key !== 0) {
      startDate = moment(moment(new Date()).format('YYYY-MM-DD'))
        .subtract(1, 'day')
        .toISOString();
      endDate = moment(moment(new Date()).format('YYYY-MM-DD'))
        .add(dateOption.key + 1, 'day')
        .toISOString();
    }

    axiosClient
      .get(
        `/schedule?semesterId=${semester?.id}&startDate=${encodeURIComponent(
          startDate
        )}&endDate=${encodeURIComponent(endDate)}`
      )
      .then((res) => {
        const data = res.data.map((item) => ({
          id: item.id,
          learnDate: item.date,
          category: item.category,
          session: item.session.title,
          lession: item.lession,
          teacher: `${item.teacher.name} (${item.teacher.phone})`,
          subject: item.subject,
          classroom: item.classroom,
        }));

        setSchedules(data);
      });
  };

  const handleChangeSemester = (value) => {
    const s = semesters?.find((item) => item.id === value);
    setSemester(s);
  };

  const handleChangeDate = (value) => {
    const date = dateOptions.find((option) => option.key === value);
    setDateOption(date);
  };

  useEffect(() => {
    handleGetSemesters();
  }, []);

  useEffect(() => {
    handleGetSchedule();
  }, [semester, dateOption, startDateFilter, endDateFilter]);

  return (
    <div>
      <Space style={{ marginBottom: 20 }}>
        <Typography>Chọn Học kỳ:</Typography>
        <Select
          defaultValue={semester?.id}
          value={semester?.id}
          style={{ width: '20vw' }}
          size="large"
          onChange={handleChangeSemester}
        >
          {semesters &&
            semesters.map((data) => (
              <Option value={data.id}>{data.name}</Option>
            ))}
        </Select>
        <Space>
          <Typography>Ngày:</Typography>
          <Select
            defaultValue={dateOption.key}
            value={dateOption.key}
            size="large"
            style={{ width: '7vw' }}
            onChange={(value) => handleChangeDate(value)}
          >
            {dateOptions.map((option) => {
              return <Option value={option.key}>{option.value}</Option>;
            })}
          </Select>
        </Space>
        {dateOption.key === 1 ? (
          <Space>
            <DateFilter
              title={'Bắt đầu'}
              setDate={setStartDateFilter}
              dateOption={dateOption}
              setDateOption={setDateOption}
              dateOptions={dateOptions}
            />
            <DateFilter
              title={'Kết thúc'}
              setDate={setEndDateFilter}
              dateOption={dateOption}
              setDateOption={setDateOption}
              dateOptions={dateOptions}
            />
          </Space>
        ) : (
          <></>
        )}
      </Space>
      <Table
        columns={columns}
        dataSource={schedules}
        bordered={true}
        pagination={false}
        size="large"
        scroll={{ y: '75vh' }}
      />
    </div>
  );
};
