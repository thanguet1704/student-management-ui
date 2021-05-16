import { Avatar, List, Typography } from 'antd';
import 'date-fns';
import _ from 'lodash';

export const TableReport = (props) => {
  return (
    <div>
      <Typography style={{ fontWeight: 'bold' }}>
        Danh sách nghỉ học nhiều nhất
      </Typography>
      <List
        itemLayout="horizontal"
        dataSource={props.students}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  size={'1vw'}
                  style={{ color: '#4C7CFD', backgroundColor: '#E1F0FF' }}
                >
                  {_.chain(item.name).words().last().value().slice(0, 1)}
                </Avatar>
              }
              title={item.name}
              description={`Lớp: ${item.class}. Số lượt vắng: ${item.absent}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
