import {
  Avatar,
  List,
  Typography,
  Skeleton,
  Button,
  Modal,
  Input,
  Form,
  message,
} from 'antd';
import 'date-fns';
import _ from 'lodash';
import { useState } from 'react';
import TextEditor from '../../../../common/components/TextEditor';
import { axiosClient } from '../../../../api';
import { SendOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2580724_poq8awqndj.js',
});

export const TableReport = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageState, setMessage] = useState('');
  const [to, setTo] = useState();
  const [subject, setSubject] = useState();

  const showModal = (e) => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const body = {
      to,
      subject,
      message: messageState,
    };

    try {
      await axiosClient.post('/sendEmail', body);
      message.success('Gửi email thành công');
      setIsModalVisible(false);
    } catch (error) {
      message.error('Mời nhập đầy đủ thông tin');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Typography style={{ fontWeight: 'bold' }}>
        Danh sách nghỉ học nhiều nhất
      </Typography>

      <List
        rowKey={(value) => value.id}
        itemLayout="horizontal"
        dataSource={props.students}
        renderItem={(item) => (
          <List.Item
            id={item.id}
            actions={[
              <Button
                shape="circle"
                icon={<IconFont type="icon-mail" />}
                onClick={(e, text) => showModal(e)}
              ></Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar
                    shape="square"
                    size={'1vw'}
                    style={{ color: '#4C7CFD', backgroundColor: '#E1F0FF' }}
                  >
                    {_.chain(item.name).words().last().value().slice(0, 1)}
                  </Avatar>
                }
                title={item.name}
                description={`Lớp: ${item.class}. vắng: ${item.absent}`}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      <Modal
        title="Tin nhắn mới"
        cancelText="Hủy"
        okText={<SendOutlined />}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={'70vw'}
        destroyOnClose={true}
      >
        <Form
          size="large"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Hãy nhập tên đăng nhập!',
              },
            ]}
          >
            <Input
              placeholder="Gửi tới"
              size="large"
              onChange={(e) => setTo(e.target.value)}
              style={{ borderRadius: 5 }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Hãy nhập mật khẩu!',
              },
            ]}
          >
            <Input
              style={{ borderRadius: 5 }}
              placeholder="Tiêu đề"
              size="large"
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Item>
        </Form>

        <TextEditor setMessage={setMessage} to={to} subject={subject} />
      </Modal>
    </div>
  );
};
