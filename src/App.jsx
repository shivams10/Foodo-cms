import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css';

import TopicMenu from './components/topicMenu';
import NavBar from './components/navbar';
import SideBar from './components/sidebar';
import { HomePage } from './pages/home';
import Recipe from './pages/recipe';
import AddFood from './pages/addFood';
import AddRecipe from './pages/addRecipe';
import Login from './pages/login';
import ProtectedRoute from './components/protectedRoute';

function App() {
  const topics = [
    { title: 'Foodo Table', link: '/' },
    { title: 'Recipe Table', link: '/recipe' }
  ];
  const [selectedKey, setSelectedKey] = useState('0');
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
  };

  const Menu = (
    <TopicMenu topics={topics} selectedKey={selectedKey} changeSelectedKey={changeSelectedKey} />
  );

  return (
    <>
      <NavBar menu={Menu} />
      <Layout>
        <SideBar menu={Menu} />
        <Routes>
          <Route path="/" element={<ProtectedRoute Component={HomePage} />} />
          <Route path="/add-food" element={<ProtectedRoute Component={AddFood} />} />
          <Route path="recipe" element={<ProtectedRoute Component={Recipe} />} />
          <Route path="/add-recipe" element={<ProtectedRoute Component={AddRecipe} />} />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
