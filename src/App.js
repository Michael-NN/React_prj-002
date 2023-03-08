//import logo from './logo.svg';
import React from 'react';
import './App.css';
import Board from './FallingTiles/Board';
import KafatzBoard from './Kafatz/KafatzBoard';
import TaeBase from './Tae/TaeBase';

class App extends React.Component {
  constructor(props) {
    super(props);
    document.body.style = 'background: #dedad1;';
    const params = this.getUrlParams();
    let page = 'home';
    if (params.get('page')) {page = params.get('page');}
    const directory = [
      {label: 'Falling Tiles', name: 'fallingTiles', component: <Board/>},
      {label: 'Kafatz', name: 'kafatz', component: <KafatzBoard/>},
//      {label: 'Text Adventure System', name: 'tae', component: <TaeBase/>},
    ];
    this.state = {
      page,
      directory
    }

    this.setPage = this.setPage.bind(this);
  }

  getUrlParams() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    return url.searchParams;
  }

  setPage(page) {
    this.setState({page});
  }

  renderHome() {
    const menu = this.state.directory.map(element => (
      <div>
        <button className="menuButton" onClick={() => this.setPage(element.name)}>{element.label}</button>
      </div>
    ));
    return (
      <div>
        {menu}
      </div>
    );
  }

  render() {
    const findComp = this.state.directory.find(element => element.name === this.state.page);
    const content = findComp ? findComp.component : this.renderHome();
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

export default App;
