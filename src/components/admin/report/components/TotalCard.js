import { Card, Col, Row, Typography } from 'antd';
import { round } from 'lodash';
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
          borderRadius: 5,
          minHeight: 150,
          marginLeft: 20,
          marginRight: 20,
          boxSizing: 'border-box',
          border: '1px solid rgb(227, 235, 246)',
          boxShadow: 'rgb(18 38 63 / 3%) 0px 3px 3px 0px !important',
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
                <Typography>
                  {isNaN(props.stat?.percent)
                    ? 0
                    : round(props.stat?.percent * 100, 0)}
                  %
                </Typography>
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
