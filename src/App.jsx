"use client";

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Inbox from './Inbox.jsx';
import Archived from './Archived.jsx';

const App = () => {
  let [currentTab, setCurrentTab] = useState('inbox');

  function switchTab(tabName) {
    setCurrentTab(tabName)
  }

  return (
    <div className='container'>
      <Header switchTab={switchTab} currentTab={currentTab} />

      {
        currentTab === 'inbox' ? <Inbox /> : <Archived />
      }

    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
