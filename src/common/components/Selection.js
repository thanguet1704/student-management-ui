import { Select, Space, Typography } from 'antd';

const { Option } = Select;

export const Selection = (props) => {
  return (
    <Space>
      <Typography>Khóa: </Typography>
      <Select
        defaultValue={props.schoolYear.id}
        style={{
          width: 120,
        }}
        size="large"
        onChange={(value) => {
          props.setSchoolYear({ id: value });
        }}
      >
        {props.schoolYears.map((item) => {
          return <Option value={item.id}>{item.name}</Option>;
        })}
      </Select>
    </Space>
  );
};
