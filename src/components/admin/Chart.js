import React from 'react';
import { Line } from '@ant-design/charts';

export const Chart = () => {
  const data = [
    { classHCMA: 'K70 02', absent: 3 },
    { classHCMA: 'K70 03', absent: 4 },
    { classHCMA: 'K70 04', absent: 3.5 },
    { classHCMA: 'K70 05', absent: 5 },
    { classHCMA: 'K70 06', absent: 4.9 },
    { classHCMA: 'K70 07', absent: 6 },
    { classHCMA: 'K70 08', absent: 7 },
    { classHCMA: 'K70 09', absent: 9 },
  ];

  const config = {
    data,
    xField: 'classHCMA',
    yField: 'absent',
    point: {
      size: 10,
      shape: 'diamond',
    },
  };
  return <Line {...config} />;
};
