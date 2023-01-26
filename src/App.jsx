import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css';

import TopicMenu from './components/topicMenu';
import NavBar from './components/navbar';
import SideBar from './components/sidebar';
import { HomePage } from './pages/home';
import Recipe from './pages/recipe';
import AddFood from './pages/addFood';
import AddRecipe from './pages/addRecipe';
import EditRecipe from './pages/editRecipe';
import EditFood from './pages/editFood';
import Login from './pages/login';
import PageNotFound from './pages/pageNotFound';
import ProtectedRoute from './components/protectedRoute';
import { AUTH_TOKEN } from './constants';

function App() {
  const [IsloggedIn, setIsLoogedIn] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('0');

  const token = localStorage.getItem(AUTH_TOKEN);

  const topics = [
    { title: 'Foodo Table', link: '/' },
    { title: 'Recipe Table', link: '/recipe' }
  ];
  const logIn = [{ title: 'Log In', link: 'sign-in' }];

  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
  };

  const LogIn = (IsloggedIn) => {
    setIsLoogedIn(IsloggedIn);
  };

  const Menu = (
    <TopicMenu
      topics={IsloggedIn ? topics : logIn}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  useEffect(() => {
    if (token && location.pathname === '/sign-in') {
      setRedirect(true);
      navigate('/');
    }
    if (!token) {
      setRedirect(false);
    }
  }, [redirect, token]);


  return (
    <>
      <NavBar menu={Menu} LogIn={LogIn} />
      <Layout>
        <SideBar menu={Menu} />
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={HomePage} />} />
          <Route path="/add-food" element={<ProtectedRoute Component={AddFood} />} />
          <Route path="recipe" element={<ProtectedRoute Component={Recipe} />} />
          <Route path="/add-recipe" element={<ProtectedRoute Component={AddRecipe} />} />
          <Route path="/recipe/edit/:id" element={<ProtectedRoute Component={EditRecipe} />} />
          <Route path="/foods/edit/:id" element={<ProtectedRoute Component={EditFood} />} />
          <Route path="*" element={<ProtectedRoute Component={PageNotFound} />} />
          {!redirect && <Route path="/sign-in" element={<Login />} />}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
