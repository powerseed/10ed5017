import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Inbox from './Inbox.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <Inbox />
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
