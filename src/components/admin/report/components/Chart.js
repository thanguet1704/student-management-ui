import React from 'react';
import { Line } from 'react-chartjs-2';

export const Chart = () => {
  const data = {
    labels: ['Jan', 'Reb', 'Hed', 'Jos', 'sd', 'sdf'],
    datasets: [
      {
        label: 'Vắng',
        data: [1, 5, 2.3, 4, 4.2, 6.2],
        borderColor: ['rgba(255, 206, 86, 0.2)'],
        backgroundColor: ['rgba(255, 206, 86, 0.2)'],
      },
    ],
  };
  return <Line data={data} height={110} />;
};
