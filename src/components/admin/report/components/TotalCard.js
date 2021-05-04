import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

export const TotalCard = (props) => {
  return (
    <Col
      span={6}
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 10,
      }}
    >
      <Card
        style={{
          width: '100%',
          background: '#F7EB7F',
          borderRadius: 5,
          minHeight: 150,
          marginLeft: 20,
          marginRight: 20,
          boxSizing: 'border-box',
          border: '1px solid #F7EB7F',
          boxShadow: '1px 1px 1px 1px #ebf0ec',
        }}
      >
        <Row style={{ height: '100%' }}>
          <Col span={12}>
            <Typography
              style={{
                fontWeight: 'bold',
              }}
            >
              <Typography>{props.title}</Typography>
              <Typography style={{ fontSize: '2em' }}>
                {props.stat?.value}
              </Typography>
              {props.title !== 'Tổng lượt điểm danh' && (
                <Typography>{props.stat?.percent && 0}%</Typography>
              )}
            </Typography>
          </Col>
          <Col
            span={12}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {props.icon}
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
