import { makeStyles } from '@material-ui/core';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    name: 'Thang 1',
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Thang 2',
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Thang 3',
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Thang 4',
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Thang 5',
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Thang 6',
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Thang 7',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Thang 8',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Thang 9',
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Thang 10',
    pv: 2342,
    amt: 2100,
  },
  {
    name: 'Thang 11',
    pv: 2932,
    amt: 2100,
  },
  {
    name: 'Thang 12',
    pv: 9213,
    amt: 2100,
  },
];

const useStyles = makeStyles({
  chart: {
    paddingTop: 20,
  },
});

export const Chart = () => {
  const classes = useStyles();
  return (
    <ResponsiveContainer width="50%" height="50%" className={classes.chart}>
      <BarChart
        width={300}
        height={200}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
