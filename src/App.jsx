import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Main from './Main.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header />
      <Main />
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
