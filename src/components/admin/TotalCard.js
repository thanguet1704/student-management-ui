import { Card } from 'antd';

import React from 'react';

export const TotalCard = (props) => {
  return props.totals.map((total) => {
    return (
      <Card style={{ width: 300, background: '#F7EB7F' }}>
        <p>{total.title}</p>
        <p>{total.total}</p>
        <p>{total.icon}</p>
      </Card>
    );
  });
};
