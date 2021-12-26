//import logo from './logo.svg';
import React from 'react';
import './App.css';
import Home from './Home';
import Board from './Board';
import KafatzBoard from './KafatzBoard';

class App extends React.Component {
  constructor(props) {
    super(props);
    document.body.style = 'background: #E7DFDD;';
    const page = 'home';
    this.state = {
      page
    }

    this.setPage = this.setPage.bind(this);
  }

  setPage(page) {
    this.setState({page});
  }

  render() {
    let content;
    switch (this.state.page) {
      case 'fallingTiles':
        content = <Board/>;
        break;
        case 'kafatz':
          content = <KafatzBoard/>;
          break;
        default:
        content = <Home
          setPage = {this.setPage}
        />;
        break;
    }
    return (
      <div className="App">
        <span>Donate to my <a href="https://ko-fi.com/maonekochat" target="_blank" rel="noreferrer">Ko-fi page!</a></span>
        <header>
          <button className="logo" onClick={() => this.setPage('home')}>Home</button>
          <h1>Maonekochat Games</h1>
        </header>
        {content}
      </div>
    );
  }
}

/*
function App() {
  return (
    <div className="App">
      <span>Donate to my <a href="https://ko-fi.com/maonekochat" target="_blank" rel="noreferrer">Ko-fi page!</a></span>
      <Board 
      />
    </div>
  );
}
*/

export default App;
