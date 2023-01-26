import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import './index.css';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      className="back-button"
      type="link"
      icon={<ArrowLeftOutlined />}
      onClick={() => navigate(-1)}
    >
      Go Back
    </Button>
  );
};

export default BackButton;
