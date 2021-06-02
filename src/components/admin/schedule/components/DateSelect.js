import { DatePicker, Space, Typography } from 'antd';
import moment from 'moment';
import { DateFormat } from '../../../../common/interface';

export const DateSelect = (props) => {
  return (
    <Space>
      <Typography style={{ width: '4vw' }}>{props.title}:</Typography>
      <DatePicker
        disabledDate={(current) => current && current < moment().endOf('day')}
        size="large"
        defaultValue={moment(new Date(), DateFormat)}
        format={DateFormat}
        onChange={(date, dateString) => {
          props.setDate(new Date(date).toISOString());
        }}
        style={{ width: '7vw' }}
      />
    </Space>
  );
};
