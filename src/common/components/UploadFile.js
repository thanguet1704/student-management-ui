import { Button, message, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { axiosClient } from '../../api';

const UploadFile = (props) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = (e) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', fileList);

    axiosClient
      .post('/attendence/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setFileList();
        setUploading(false);
        props.setIsModalVisible(false);
        props.handleGetAttendences();

        message.success('Tải file lên thành công');
      })
      .catch((error) => {
        setUploading(false);
        message.error(error.response.data.message);
      });
  };

  const handleOnChange = (e) => {
    setFileList(e.file);
  };

  const upload = {
    onRemove: (file) => {
      setUploading(false);
      setFileList();
    },
    beforeUpload: (file) => {
      setFileList(...fileList, file);
    },
  };

  const handleOk = () => {
    props.setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.setIsModalVisible(false);
    setUploading(false);
  };

  return (
    <>
      <Modal
        title="Điểm danh"
        visible={props.isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={handleCancel} style={{ borderRadius: 5 }}>
            Hủy
          </Button>,
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={!fileList}
            loading={uploading}
            style={{
              marginTop: 16,
              backgroundColor: 'rgb(76, 124, 253)',
              color: '#fff',
              borderRadius: 5,
            }}
          >
            {uploading ? 'Đang tải file' : 'Tải lên'}
          </Button>,
        ]}
      >
        <Upload
          {...upload}
          maxCount={1}
          accept=".xlsx, .xls, .csv"
          onChange={handleOnChange}
          progress={{
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
          }}
        >
          <Button icon={<UploadOutlined />} style={{ borderRadius: 5 }}>
            Chọn file
          </Button>
        </Upload>
      </Modal>
    </>
  );
};

export default UploadFile;
