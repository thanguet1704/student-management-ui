import { Alert, Button, Form, Input, Modal } from 'antd';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosClient } from '../../api';
import { AuthContext } from '../../contexts/AuthProvider';

export const UserOption = (props) => {
  const authCt = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('hcmaid');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    authCt.setAuth({ name: '', role: '' });
    history.push('/');
  };

  const handleOk = () => {
    axiosClient
      .patch({
        username: props.username,
        oldPassword: props.password,
        newPassword: props.newPassword,
      })
      .then((res) => {
        localStorage.removeItem('hcmaid');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        props.setIsModalVisible(false);
        history.push('/');
      })
      .catch((err) => props.setError(true));
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
        style={{ textAlign: 'center' }}
        title="Đổi mật khẩu"
        visible={props.isModalVisible}
        onOk={() => handleOk}
        onCancel={props.handleCancel}
      >
        <Form name="basic" initialValues={{ remember: true }}>
          {props.error ? (
            <Form.Item>
              <Alert message="Lỗi" type="error" showIcon />
            </Form.Item>
          ) : (
            <></>
          )}

          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Hãy nhập tên đăng nhập!' }]}
          >
            <Input onChange={(value) => props.setUserName(value)} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu cũ"
            name="password"
            rules={[{ required: true, message: 'Nhập mật khẩu cũ!' }]}
          >
            <Input.Password onChange={(value) => props.setPassword(value)} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[{ required: true, message: 'Nhập mật khẩu mới!' }]}
          >
            <Input.Password onChange={(value) => props.setNewPassword(value)} />
          </Form.Item>
        </Form>
      </Modal>
      <Button style={{ border: 'none' }} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
};
