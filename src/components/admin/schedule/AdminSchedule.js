import { Button, DatePicker, Row, Select, Space, Typography, Col } from 'antd';
import moment from 'moment';

const { Option } = Select;

const dateFormat = 'DD-MM-YYYY';

export const AdminSchedule = (props) => {
  return (
    <Row
      style={{
        height: '100%',
        width: '100%',
        padding: 20,
        background: '#fff',
        borderRadius: 10,
      }}
    >
      <Col span={12} style={{ padding: 20 }}>
        <Typography style={{ fontSize: '1.5rem' }}>
          Thêm Thời Khóa Biểu
        </Typography>
        <Space
          direction="vertical"
          style={{
            border: '1px solid #f0f0f0',
            padding: 30,
            boxSizing: 'border-box',
            borderRadius: 5,
            width: '100%',
            height: 400,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Space style={{ marginBottom: 20 }}>
            <Typography style={{ width: 80 }}>Môn học:</Typography>
            <Select
              defaultValue="lucy"
              style={{
                width: 450,
                borderRadius: 10,
              }}
              size="large"
              // onChange={handleChange}
            >
              <Option value="jack">XÃ HỘI HỌC TRONG QUẢN LÝ</Option>
              <Option value="lucy">XÃ HỘI HỌC TRONG QUẢN LÝ</Option>
            </Select>
          </Space>
          <Space style={{ marginBottom: 20 }} size="large">
            <Space>
              <Typography style={{ width: 80 }}>Bắt đầu:</Typography>
              <DatePicker
                size="large"
                defaultValue={moment(new Date(), dateFormat)}
                format={dateFormat}
                style={{ width: 179 }}
              />
            </Space>
            <Space>
              <Typography style={{ width: 60 }}>Kết thúc:</Typography>
              <DatePicker
                size="large"
                defaultValue={moment(new Date(), dateFormat)}
                format={dateFormat}
                style={{ width: 179 }}
              />
            </Space>
          </Space>
          <Space style={{ marginBottom: 20 }}>
            <Typography style={{ width: 80 }}>Chuyên đề:</Typography>
            <Select
              defaultValue="lucy"
              style={{ width: 450 }}
              size="large"
              // onChange={handleChange}
            >
              <Option value="jack">
                Khái quát xã hội học trong lãnh đạo quản lý
              </Option>
              <Option value="lucy">
                Khái quát xã hội học trong lãnh đạo quản lý
              </Option>
            </Select>
          </Space>
          <Space style={{ marginBottom: 20 }} size="large">
            <Space>
              <Typography style={{ width: 80 }}>Ngày học:</Typography>
              <DatePicker
                size="large"
                defaultValue={moment(new Date(), dateFormat)}
                format={dateFormat}
                style={{ width: 179 }}
              />
            </Space>
            <Space>
              <Typography>Buổi:</Typography>
              <Select
                defaultValue="morning"
                style={{ width: '5vw' }}
                size="large"
                // onChange={handleChange}
              >
                <Option value="morning">Sáng</Option>
                <Option value="afternoon">Chiều</Option>
              </Select>
            </Space>
          </Space>
          <Space size="large" style={{ marginBottom: 20 }}>
            <Space>
              <Typography style={{ width: 80 }}>Lớp:</Typography>
              <Select
                defaultValue="lucy"
                style={{ width: 140 }}
                size="large"
                // onChange={handleChange}
              >
                <Option value="jack">K70-01</Option>
                <Option value="lucy">K70-02</Option>
              </Select>
            </Space>

            <Space>
              <Typography>Giảng viên:</Typography>
              <Select
                defaultValue="lucy"
                style={{ width: 206 }}
                size="large"
                // onChange={handleChange}
              >
                <Option value="jack">Trần Quang Diệu</Option>
                <Option value="lucy">Trần Quang Diệu</Option>
              </Select>
            </Space>
          </Space>
        </Space>
        <Button
          type="primary"
          style={{
            float: 'right',
            width: 176,
            borderRadius: 10,
            marginTop: 10,
          }}
          size="large"
        >
          Thêm
        </Button>
      </Col>
      <Col span={12} style={{ padding: 20 }}>
        <Typography style={{ fontSize: '1.5rem' }}>Xem Trước</Typography>
        <Space
          style={{
            border: '1px solid #f0f0f0',
            width: '100%',
            padding: 30,
            height: 400,
          }}
          direction="vertical"
        >
          <Typography style={{ fontWeight: 'bold', textAlign: 'center' }}>
            LỊCH GIẢNG DẠY - HỌC TẬP
          </Typography>
          <Typography style={{ textAlign: 'center' }}>
            (Thời gian từ 17/02/2020 đến 20/02/2020)
          </Typography>
          <Typography style={{ fontWeight: 'bold' }}>
            Môn học: XÃ HỘI HỌC TRONG QUẢN LÝ LÃNH ĐẠO
          </Typography>
          <Space size="large" style={{ fontWeight: 'bold' }}>
            <Typography>Lớp: K70.A07</Typography>
            <Typography>Địa điểm: Phòng 310A-A14</Typography>
          </Space>
          <Space size="large">
            <table style={{ borderCollapse: 'collapse' }}>
              <tr>
                <th style={{ border: '1px solid black', textAlign: 'center' }}>
                  Thứ.Ngày
                </th>
                <th style={{ border: '1px solid black', textAlign: 'center' }}>
                  Buổi
                </th>
                <th style={{ border: '1px solid black', textAlign: 'center' }}>
                  <Space direction="vertical">
                    <Typography>Nội dung giảng dạy - học tập</Typography>
                    <Typography>(Tên bài giảng/ chuyên đề)</Typography>
                  </Space>
                </th>
                <th style={{ border: '1px solid black', textAlign: 'center' }}>
                  Số tiết
                </th>
                <th style={{ border: '1px solid black', textAlign: 'center' }}>
                  <Space direction="vertical">
                    <Typography>Giảng viên</Typography>
                    <Typography>(điện thoại)</Typography>
                  </Space>
                </th>
              </tr>
              <tr>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>
                  Thứ Hai 17/02/2020
                </td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>
                  Sáng
                </td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>
                  Khái quát xã hội học trong lãnh đạo quản lý
                </td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>
                  5
                </td>
                <td style={{ border: '1px solid black', textAlign: 'center' }}>
                  TS.Nguyễn Văn Đáng (0352.375.471)
                </td>
              </tr>
            </table>
          </Space>
        </Space>
      </Col>
    </Row>
  );
};
