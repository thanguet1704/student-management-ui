import { Avatar, Popover, Space, Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import { useContext, useState } from 'react';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/AuthProvider';
import { UserOption } from './UserOption';
import { DownOutlined } from '@ant-design/icons';

export const HeaderComponent = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { auth } = useContext(AuthContext);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const lastName = `${auth.name}`.split(' ').slice(-1).join(' ');

  return (
    <Header
      style={{
        padding: 10,
        background: '#fffff9',
        border: '2px solid #e6e6e6',
      }}
    >
      <Popover
        placement="bottom"
        content={UserOption({
          isModalVisible,
          showModal,
          handleCancel,
          setIsModalVisible,
        })}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.2rem',
            position: 'absolute',
            top: 0,
            right: 0,
            marginRight: 20,
          }}
        >
          <Space style={{ fontSize: '1vw' }}>
            {auth.name ? (
              <div>
                <Avatar
                  shape="square"
                  size={'1vw'}
                  style={{ color: '#4C7CFD', backgroundColor: '#E1F0FF' }}
                >
                  {`${lastName}`.slice(0, 1).toUpperCase()}
                </Avatar>
              </div>
            ) : (
              <></>
            )}
            <Typography
              style={{
                color: 'black',
                fontFamily: 'sans-serif',
              }}
            >
              {auth.name}
            </Typography>
            <DownOutlined style={{ fontSize: '12px', color: '#aaaaaa' }} />
          </Space>
        </div>
      </Popover>

      <Title level={3} style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="logo" style={{ height: '2vw' }} />
        <Typography style={{ color: 'black', fontSize: '1.2vw' }}>
          HỆ THỐNG QUẢN LÝ HỌC VIÊN
        </Typography>
      </Title>
    </Header>
  );
};
