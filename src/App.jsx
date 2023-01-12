import { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/reset.css';

import TopicMenu from './components/topicMenu';
import NavBar from './components/navbar';
import SideBar from './components/sidebar';

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
      </Layout>
    </>
  );
}

export default App;
