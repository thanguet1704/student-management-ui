import { DatePicker, Space, Typography } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY-DD-MM';

export const DateSelect = (props) => {
  return (
    <Space>
      <Typography style={{ width: '4vw' }}>{props.title}:</Typography>
      <DatePicker
        size="large"
        defaultValue={moment(new Date(), dateFormat)}
        format={dateFormat}
        onChange={(date, dateString) => {
          props.setDate(new Date(dateString).toISOString());
        }}
        style={{ width: '7vw' }}
      />
    </Space>
  );
};
