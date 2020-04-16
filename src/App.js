import React from 'react';
import Routes from './Routes';
import Header from './components/header/Header';

function App() {
  const path = window.location.pathname;
  return (
    <div>
      {path !== '/login' && <Header />}

      <Routes />
    </div>
  );
}

export default App;
