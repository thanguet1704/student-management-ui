import { Button, Form, Input, message, Modal } from 'antd';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosClient } from '../../api/config';
import { AuthContext } from '../../contexts/AuthProvider';
import Cookies from 'js-cookie';

export const UserOption = (props) => {
  const authCt = useContext(AuthContext);
  const history = useHistory();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogout = () => {
    Cookies.remove('hcmaid', { path: '/' });
    Cookies.remove('name', { path: '/' });
    Cookies.remove('role', { path: '/' });
    authCt.setAuth({ name: '', role: '' });
    history.push('/');
  };

  const handleOk = () => {
    axiosClient
      .patch('/users', {
        username,
        oldPassword: password,
        newPassword,
      })
      .then((res) => {
        Cookies.remove('hcmaid', { path: '/' });
        Cookies.remove('name', { path: '/' });
        Cookies.remove('role', { path: '/' });
        props.setIsModalVisible(false);
        window.location.reload();
      })
      .catch((err) => {
        if (
          err.response.status === 404 ||
          err.response.status === 401 ||
          err.response.status === 500
        ) {
          message.error(err.response.data.message);
        }

        if (err.response.status === 400) {
          window.location.reload();
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
        title="Đổi mật khẩu"
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
            label="Mã Học viên"
            name="mhv"
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
      </Modal>
      <Button style={{ border: 'none' }} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
};
