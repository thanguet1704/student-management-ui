import { Avatar, List, Typography } from 'antd';
import 'date-fns';
import randomColor from 'randomcolor';

export const TableReport = (props) => {
  return (
    <div>
      <Typography style={{ fontWeight: 'bold' }}>
        Danh sách nghỉ học nhiều nhất
      </Typography>
      {props.students.map((student) => {
        return (
          <List.Item>
            <Avatar style={{ background: `${randomColor()}` }} />
            <Typography style={{ fontWeight: 'bold' }}>
              {student.account_name}
            </Typography>
          </List.Item>
        );
      })}
    </div>
  );
};
