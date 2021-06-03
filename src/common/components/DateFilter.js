import { DatePicker, Space, Typography } from 'antd';
import moment from 'moment';
import { DateFormat } from '../../common/interface';

export const DateFilter = (props) => {
  return (
    <Space>
      <Typography>{props.title}:</Typography>
      <DatePicker
        size="large"
        defaultValue={moment(new Date(), DateFormat)}
        style={{ width: '80%' }}
        format={DateFormat}
        onChange={(date, dateString) => {
          props.setDate(new Date(date).toISOString());
          const da = props.dateOptions.find((option) => option.key === 1);
          props.setDateOption(da);
        }}
      />
    </Space>
  );
};
