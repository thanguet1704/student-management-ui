import { DatePicker, Space, Typography } from 'antd';
import moment from 'moment';
import { useState } from 'react';

const dateFormat = 'MM-DD-YYYY';

export const DateSelect = (props) => {
  const [date, setDate] = useState(`${moment(new Date()).format(dateFormat)}`);

  return (
    <Space>
      <Typography style={{ width: 80 }}>{props.title}:</Typography>
      <DatePicker
        size="large"
        defaultValue={moment(new Date(), dateFormat)}
        format={dateFormat}
        style={{ width: 179 }}
        onChange={(date, dateString) => {
          setDate(`${moment(new Date(dateString)).format(dateFormat)}`);
        }}
      />
    </Space>
  );
};
