import { Button, Form, Input, message, Modal, Spin } from 'antd';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosClient } from '../../api/config';
import { AuthContext } from '../../contexts/AuthProvider';
import { removeCookies } from '../../utils/Cookies';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const UserOption = (props) => {
  const authCt = useContext(AuthContext);
  const history = useHistory();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoadingUpdatePassword, setLoadingUpdatePassword] = useState(false);

  const handleLogout = () => {
    removeCookies();
    authCt.setAuth({ name: '', role: '' });
    message.success('Đăng xuất thành công');
    setTimeout(() => {
      history.push('/');
    }, 1000);
  };

  const handleOk = () => {
    setLoadingUpdatePassword(true);
    axiosClient
      .patch('/users', {
        username,
        oldPassword: password,
        newPassword,
      })
      .then((res) => {
        setLoadingUpdatePassword(false);
        props.setIsModalVisible(false);
        message.success('Đổi mạt khẩu thành công mời đăng nhập lại');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        setLoadingUpdatePassword(false);
        if (err.response.status === 400) {
          window.location.reload();
        } else {
          message.error(err.response.data.message);
        }
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Button onClick={props.showModal} style={{ border: 'none' }}>
        Đổi mật khẩu
      </Button>
      <Modal
        visible={props.isModalVisible}
        onCancel={() => props.setIsModalVisible(false)}
        title="Đổi mật khẩu"
        destroyOnClose={true}
        footer={[
          <Button
            key="back"
            onClick={props.handleCancel}
            style={{ borderRadius: 5 }}
          >
            Hủy
          </Button>,
          <Button
            type="primary"
            onClick={handleOk}
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
        <Form layout="vertical" name="form_in_modal">
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Nhập tên đăng nhập!' }]}
          >
            <Input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            name="pass"
            label="Mật khẩu hiện tại"
            rules={[
              {
                required: true,
                message: 'Mật khẩu không được bỏ trống!',
              },
            ]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              allowClear={true}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: 'Mật khẩu không được bỏ trống!',
              },
            ]}
          >
            <Input.Password
              onChange={(e) => setNewPassword(e.target.value)}
              allowClear={true}
            />
          </Form.Item>
        </Form>

        {isLoadingUpdatePassword ? (
          <Spin indicator={antIcon} style={{ width: '100%' }} />
        ) : (
          <></>
        )}
      </Modal>
      <Button style={{ border: 'none' }} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
};
