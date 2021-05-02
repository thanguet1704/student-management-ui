import { Avatar, Popover, Space, Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import React, { useContext, useState } from 'react';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/AuthProvider';
import { UserOption } from './UserOption';

export const HeaderComponent = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(false);

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
        background: '#ffffff',
      }}
    >
      <Popover
        placement="bottom"
        content={UserOption({
          isModalVisible,
          showModal,
          handleCancel,
          setUserName,
          setPassword,
          setNewPassword,
          error,
          setIsModalVisible,
          setError,
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
          <Space>
            <Typography
              style={{
                color: '#ef8354',
                fontFamily: 'sans-serif',
              }}
            >
              {auth.name}
            </Typography>
            {auth.name !== '' ? (
              <Avatar
                style={{
                  float: 'right',
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                }}
              >
                {`${lastName}`.slice(0, 1).toUpperCase()}
              </Avatar>
            ) : (
              <></>
            )}
          </Space>
        </div>
      </Popover>

      <Title level={3} style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="logo" style={{ height: '2em' }} />
        <Typography style={{ color: '#ef8354', fontFamily: 'sans-serif' }}>
          HỆ THỐNG QUẢN LÝ HỌC VIÊN
        </Typography>
      </Title>
    </Header>
  );
};
