import { UserOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2580724_yq2m3dj17b.js',
});

export const ListMenuAdmin = [
  {
    key: 1,
    path: '/admin/studentManagement',
    display: 'Quản lý điểm danh',
    icon: <IconFont type="icon-Management" />,
    public: true,
  },
  {
    key: 2,
    path: '/admin/report',
    display: 'Báo cáo điểm danh',
    icon: <IconFont type="icon-datareport" />,
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
    icon: <IconFont type="icon-schedule" />,
    public: true,
  },
];
