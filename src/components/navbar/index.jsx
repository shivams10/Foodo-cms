import React, { useEffect, useState } from 'react';
import { Drawer, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

import './index.css';
import { useAuthContext } from '../../context/AuthContext';
import { removeToken } from '../../helpers';
import { AUTH_TOKEN } from '../../constants';

const NavBar = ({ menu, LogIn }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [IsloggedIn, SetIsLoggedIn] = useState(false);

  const { user } = useAuthContext();

  const handleLogout = () => {
    removeToken();
    SetIsLoggedIn(false);
    LogIn(false);
    navigate('/sign-in');
  };

  useEffect(() => {
    SetIsLoggedIn(localStorage.getItem(AUTH_TOKEN) ? true : false);
    if (IsloggedIn) {
      LogIn(IsloggedIn);
    }
  }, [user, IsloggedIn]);

  return (
    <nav className="navbar">
      <div>
        {IsloggedIn && (
          <Button
            className="menu"
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
          />
        )}
        <Drawer
          title="Topics"
          placement="left"
          onClick={() => setVisible(false)}
          onClose={() => setVisible(false)}
          open={visible}
        >
          {menu}
        </Drawer>
        <a href="/">
          <span className="logo-title">Foodo</span>
        </a>
      </div>
      {IsloggedIn && (
        <Space>
          <div className="user">Hello! {user?.username}</div>
          <Button className="button-logout" onClick={handleLogout}>
            Logout
          </Button>
        </Space>
      )}
    </nav>
  );
};

export default NavBar;
