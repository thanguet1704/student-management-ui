import React from 'react';
import { PieChart, Pie } from 'recharts';

const data = [
  { value: 3, display: 'Vang' },
  { value: 30, display: 'Co mat' },
];
export const Chart = () => {
  return (
    <PieChart>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#f5a742"
      />
    </PieChart>
  );
};
