import { DatePicker, Space, Typography } from 'antd';
import moment from 'moment';
import { DateFormat } from '../../../../common/interface';

export const DateSelect = (props) => {
  return (
    <Space>
      <Typography>{props.title}:</Typography>
      <DatePicker
        size="large"
        defaultValue={moment(new Date(), DateFormat)}
        format={DateFormat}
        style={{ width: 179 }}
        onChange={(date, dateString) => {
          props.setDate(new Date(dateString).toISOString());
        }}
        clearIcon={false}
      />
    </Space>
  );
};
