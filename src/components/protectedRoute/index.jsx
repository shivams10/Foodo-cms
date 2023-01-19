import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import { AUTH_TOKEN } from '../../constants';

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { Component } = props;

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (!token) {
      navigate('/sign-in');
    }
  }, []);
  return (user && <Component />);
};

export default ProtectedRoute;
