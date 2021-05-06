import {
  BarChartOutlined,
  ScheduleOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const ListMenuAdmin = [
  {
    key: 1,
    path: '/admin/studentManagement',
    display: 'Quản lý điểm danh',
    icon: <ScheduleOutlined />,
    public: true,
  },
  {
    key: 2,
    path: '/admin/report',
    display: 'Báo cáo điểm danh',
    icon: <BarChartOutlined />,
    public: true,
  },
  {
    key: 3,
    display: 'Quản lý thành viên',
    icon: <UserOutlined />,
    subMenu: [
      {
        key: 4,
        display: 'Học viên',
        path: '/admin/studentInfo',
      },
      {
        key: 5,
        display: 'Giảng viên',
        path: '/admin/teacherInfo',
      },
    ],
    public: false,
  },
  {
    key: 6,
    path: '/admin/schedule',
    display: 'Thời khóa biểu',
    icon: <ScheduleOutlined />,
    public: false,
  },
];
