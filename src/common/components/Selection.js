import { Select, Space, Typography } from 'antd';

const { Option } = Select;

export const Selection = (props) => {
  const handleChangeSchoolYear = (value) => {
    const schoolYear = props.schoolYears.find((item) => item.id === value);
    props.setSchoolYear(schoolYear);
  };

  return (
    <Space>
      <Typography>Khóa: </Typography>
      <Select
        defaultValue={props.schoolYear?.id}
        value={props.schoolYear?.id}
        style={{
          width: 120,
        }}
        size="large"
        onChange={(value) => {
          handleChangeSchoolYear(value);
        }}
      >
        {props.schoolYears.map((item) => {
          return <Option value={item.id}>{item.name}</Option>;
        })}
      </Select>
    </Space>
  );
};
