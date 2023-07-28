import React from 'react';
import logo from './stechs-logo_white.svg';
import './App.css';
import { Modems } from './components/modems';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Modems />
      </header>
    </div>
  );
}

export default App;
