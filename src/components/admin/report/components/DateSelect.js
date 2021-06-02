import { DatePicker, Space, Typography } from 'antd';
import moment from 'moment';
import { DateFormat } from '../../../../common/interface';

export const DateSelect = (props) => {
  return (
    <Space>
      <Typography>{props.title}:</Typography>
      <DatePicker
        size="large"
        defaultValue={moment(new Date(), 'YYYY-MM-DD')}
        format={DateFormat}
        style={{ width: 179 }}
        onChange={(date, dateString) => {
          props.setDate(new Date(date).toISOString());
        }}
        clearIcon={false}
      />
    </Space>
  );
};
