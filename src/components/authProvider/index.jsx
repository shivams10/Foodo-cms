import React, { useState, useEffect } from 'react';
import { message } from 'antd';

import { AuthContext } from '../../context/AuthContext';
import { LOCAL_API_URL, BEARER } from '../../constants';
import { getToken } from '../../helpers';

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const authToken = getToken();

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${LOCAL_API_URL}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` }
      });
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error(error);
      message.error('Error While Getting Logged In User Details');
    } finally {
      setIsLoading(false);
    }
  };
  const handleUser = (user) => {
    setUserData(user);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: userData, setUser: handleUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
