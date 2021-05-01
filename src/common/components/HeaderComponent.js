import { Avatar, Popover, Space, Typography } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { UserOption } from './UserOption';

export const HeaderComponent = (props) => {
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

  const lastName = `${props.auth.name}`.split(' ').slice(-1).join(' ');

  useEffect(() => {
    console.log(props.auth);
  });

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
          handleOk,
          handleCancel,
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
              {props.auth.name}
            </Typography>
            {props.auth.isAuth ? (
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
