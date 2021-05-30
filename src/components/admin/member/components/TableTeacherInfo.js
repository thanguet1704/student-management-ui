import { SearchOutlined } from '@ant-design/icons';
import { Input, Space, Table, Modal, Button } from 'antd';
import { EditTwoTone } from '@material-ui/icons';
import 'date-fns';
import { CreateTeacher } from '../components/CreateTeacher';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../../../api';
import Icon from '@ant-design/icons';
import { UpdateTeacher } from './UpdateTeacher';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2580724_poq8awqndj.js',
});

export const TableTeacherInfo = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGetTeachers = () => {
    axiosClient
      .get(`/users/teachers?search=${searchName}`)
      .then((res) => {
        const data = res.data.data.map((teacher, index) => ({
          stt: index + 1,
          ...teacher,
        }));
        setTeachers(data);
      })
      .catch((error) => {});
  };

  const handleOnChange = (value) => {
    setCurrentPage(value?.current);
  };

  useEffect(() => {
    handleGetTeachers();
  }, [searchName, currentPage]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: () => 'Nam',
    },
    {
      title: 'Viện',
      dataIndex: 'institua',
      key: 'institua',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: () => {
        return (
          <IconFont
            type="icon-sharpicons_edit-user-profile"
            onClick={showModal}
          />
        );
      },
    },
  ];

  return (
    <div style={{ marginTop: 20 }}>
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
            style={{
              borderRadius: 5,
              width: '100%',
            }}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CreateTeacher handleGetTeachers={handleGetTeachers} />
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={teachers}
        bordered={true}
        onChange={(value) => handleOnChange(value)}
        pagination={{
          simple: true,
          defaultPageSize: pageSize,
          total: teachers.totalPage * pageSize,
        }}
      />
      <Modal
        title="Cập nhật thông tin"
        visible={isModalVisible}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={handleCancel} style={{ borderRadius: 5 }}>
            Hủy
          </Button>,
          <Button
            type="primary"
            // onClick={handleCreate}
            style={{
              backgroundColor: 'rgb(76, 124, 253)',
              color: '#fff',
              borderRadius: 5,
            }}
          >
            Cập nhật
          </Button>,
        ]}
      >
        <UpdateTeacher />
      </Modal>
    </div>
  );
};
