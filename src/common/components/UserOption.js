import { Alert, Button, Form, Input, Modal } from 'antd';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosClient } from '../../api/config';
import { AuthContext } from '../../contexts/AuthProvider';
import Cookies from 'js-cookie';

export const UserOption = (props) => {
  const authCt = useContext(AuthContext);
  const [form] = Form.useForm();
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove('hcmaid', { path: '/' });
    Cookies.remove('name', { path: '/' });
    Cookies.remove('role', { path: '/' });
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
        Cookies.remove('hcmaid', { path: '/' });
        Cookies.remove('name', { path: '/' });
        Cookies.remove('role', { path: '/' });
        props.setIsModalVisible(false);
        window.location.reload();
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
        visible={props.isModalVisible}
        title="Đổi mật khẩu"
        okText="Cập nhật"
        cancelText="Hủy"
        onCancel={props.handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              // onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu cũ">
            <Input.Password type="textarea" />
          </Form.Item>
          <Form.Item name="confirm" label="Mật khẩu mới">
            <Input.Password type="textarea" />
          </Form.Item>
          <Form.Item name="confirmNewPassword" label="Xác nhận mật khẩu mới">
            <Input.Password type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
      <Button style={{ border: 'none' }} onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
};
