import { DatePicker, Space, Typography } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

export const DateSelect = (props) => {
  return (
    <Space>
      <Typography>{props.title}:</Typography>
      <DatePicker
        size="large"
        defaultValue={moment(new Date(), dateFormat)}
        format={dateFormat}
        style={{ width: 179 }}
        onChange={(date, dateString) => {
          props.setDate(new Date(dateString).toISOString());
        }}
      />
    </Space>
  );
};
