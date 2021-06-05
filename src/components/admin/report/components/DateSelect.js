import { DatePicker, Space, Typography } from 'antd';
import moment from 'moment';
import { DateFormat } from '../../../../common/interface';

export const DateSelect = (props) => {
  return (
    <Space>
      <Typography style={{ width: '4vw' }}>{props.title}:</Typography>
      <DatePicker
        size="large"
        // disabledDate={(current) => current && current > moment().endOf('day')}
        defaultValue={moment(new Date(), 'YYYY-MM-DD')}
        format={DateFormat}
        onChange={(date, dateString) => {
          props.setDate(new Date(dateString).toISOString());
        }}
        clearIcon={false}
      />
    </Space>
  );
};
