import { Breadcrumb, DatePicker, Typography, Layout } from 'antd';
import moment from 'moment';
import { Chart } from './Chart';
import { TotalCard } from './TotalCard';

const { RangePicker } = DatePicker;
const { Content } = Layout;

const dateFormat = 'DD-MM-YYYY';

export const ReportContent = (props) => {
  return (
    <div>
      <Breadcrumb
        style={{
          margin: '16px 0',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}
      >
        <Breadcrumb.Item style={{ color: '#5BC3B2', fontWeight: 'bold' }}>
          {/* <Space direction="vertical" size={12}> */}
          <RangePicker
            defaultValue={[
              moment(moment().subtract(7, 'd'), dateFormat),
              moment(new Date(), dateFormat),
            ]}
            style={{ width: '65%' }}
          />
          {/* </Space> */}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: '#fff',
          border: '10px solid #5BC3B2',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <TotalCard totals={props.totals} />
        </div>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 30,
          }}
        >
          <Typography style={{ fontSize: '2rem' }}>
            Biểu đồ thống kê số lượt vắng học trong năm 2021
          </Typography>
          <Chart id="chart" />
        </div>
      </Content>
    </div>
  );
};
