import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css';

import TopicMenu from './components/topicMenu';
import NavBar from './components/navbar';
import SideBar from './components/sidebar';
import { HomePage } from './pages/home';
import AddFood from './pages/addFood';
import Login from "./pages/login"

function App() {
  const topics = [{ title: 'Foodo Table', link: '/' }];
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
          <Route path="/" element={<HomePage />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
