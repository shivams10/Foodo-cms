import { Link } from 'react-router-dom';
import { Button } from 'antd';

import './index.css';

const BackButton = () => {
  return (
    <Link to="/">
      <Button className="back-button">Go Back</Button>
    </Link>
  );
};

export default BackButton;
