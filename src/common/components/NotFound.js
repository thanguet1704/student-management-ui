import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

export const NotFound = () => {
  const history = useHistory();
  const handleOnclick = () => {
    history.push('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleOnclick}>
          Back Home
        </Button>
      }
    />
  );
};
