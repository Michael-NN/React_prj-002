//import logo from './logo.svg';
import React from 'react';
import './App.css';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <span>Donate to my <a href="https://ko-fi.com/maonekochat" target="_blank" rel="noreferrer">Ko-fi page!</a></span>
      <Board 
      />
    </div>
  );
}
export default App;
