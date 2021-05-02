import { Button, Form, Input, Modal } from 'antd';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

export const UserOption = (props) => {
  const authCt = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('hcmaid');
    localStorage.removeItem('role');
    authCt.setAuth({ name: '', role: '' });
    history.push('/');
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
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <Form name="basic" initialValues={{ remember: true }}>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Hãy nhập tên đăng nhập!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu cũ"
            name="password"
            rules={[{ required: true, message: 'Nhập mật khẩu cũ!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[{ required: true, message: 'Nhập mật khẩu mới!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
      <Button style={{ border: 'none' }} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
};
