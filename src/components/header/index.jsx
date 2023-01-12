import { Link } from 'react-router-dom';

import { Button, Col, Row } from 'antd';

const Header = () => {
  return (
    <Row>
      <Col span={8}>
        <h1 style={{ padding: '20px', fontSize: '32px', color: '#572bc4' }}>Food List</h1>
      </Col>
      <Col span={8} offset={8}>
        <Link to="/add-food">
          <Button style={{ backgroundColor: '#753ffd', color: 'white', margin: '20px' }}>
            Create new Entry
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default Header;
