import { Avatar, List, Typography } from 'antd';
import 'date-fns';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import randomColor from 'randomcolor';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const data = [
  {
    stt: '1',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '2',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '3',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '4',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '1',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '2',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '3',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '4',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '1',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '2',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '3',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '4',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '1',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '2',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '3',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '4',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '1',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '2',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '3',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '4',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '1',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '2',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '3',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
  {
    stt: '4',
    classHCMA: 'K70 A01',
    totalStudent: '20',
    late: '2',
    absent: 0,
  },
];

export const TableReport = (props) => {
  const [state, setState] = React.useState(data.slice(0, 5));

  const fetchMoreData = () => {
    setTimeout(() => {
      setState({
        items: state.concat(data.slice(0, 5)),
      });
    }, 1500);
  };
  return (
    <div>
      <Typography style={{ fontWeight: 'bold' }}>Danh sách lớp học</Typography>
      <div id="scrollableDiv" style={{ height: 400, overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={state.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Spin indicator={antIcon} />}
          scrollableTarget="scrollableDiv"
          height={300}
        >
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar style={{ background: `${randomColor()}` }}>K70</Avatar>
              }
              title={<a href="/">Lớp: {}</a>}
              description="Cố vấn học tập: Trần Xuân Diệu"
              style={{ color: '#000' }}
            />
          </List.Item>
        </InfiniteScroll>
      </div>
    </div>
  );
};
