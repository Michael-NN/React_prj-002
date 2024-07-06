import React from 'react';
import './App.css';
import fullLogo from './branding/Mechalopod - Full logo.png'
import logoIcon from './branding/Mechalopod - Icon.png'
import Board from './FallingTiles/Board';
import KafatzBoard from './Kafatz/KafatzBoard';
import Tae from './Tae/TaeBase';
import WordGenerator from './WordGenerator/WordGeneratorBase';

class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getUrlParams();
    let page = params.get('page') ?? 'home';
    /*
      {sectionLabel: 'Video Games', items: [
        {label: 'Text Adventure System', name: 'tae', component: <Tae/>},
      ]},
    */
    const directory = [
      {sectionLabel: 'Board Games', items: [
        {label: 'Falling Tiles', name: 'fallingTiles', component: <Board/>},
        {label: 'Kafatz', name: 'kafatz', component: <KafatzBoard/>},
      ]},
      {sectionLabel: 'Creativity Toys', items: [
        {label: 'Word Generator', name: 'wordGen', component: <WordGenerator/>},
      ]},
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
    window.scrollTo({top:0});
  }

  renderHeaderHome() {
    return (
        <img className="fullLogo" src={fullLogo} alt="Mechalopod Game Studios"/>
      );
  }

  renderHeaderNotHome() {
    return (
      <button className='logoButton' onClick={() => this.setPage('home')}>
        <img className='logoButton-image' src={logoIcon}/>
      </button>
    );
  }

  renderHomeMenu() {
    const menu = this.state.directory.map((element, index) => (
      <div key={index} className= "menuSection">
        <h2 className="menuSection-header">{element.sectionLabel}</h2>
        {this.renderSection(element.items)}
      </div>
    ));
    return (
      <div className='home-menu'>
        {menu}
      </div>
    );
  }

  renderSection (items) {
    const menu = items.map((element, index) => (
      <div key={index}>
        <button className="menuButton" onClick={() => this.setPage(element.name)}>{element.label}</button>
      </div>
    ));
    return (
      <div className='menuSection-body'>
        {menu}
      </div>
    )
  }

  render() {
    const flatDirectory = this.state.directory.map(element => element.items).flat();
    const findComp = flatDirectory.find(element => element.name === this.state.page);
    const header = findComp?.component ? this.renderHeaderNotHome() : this.renderHeaderHome()
    const content = findComp?.component ?? this.renderHomeMenu();
    //<span>Contact: <a href='mail to: mechalopod@gmail.com'>mechalopod@gmail.com</a></span>
    return (
      <div className="App">
        <header className='siteHeader'>
          {header}
        </header>
        <div className='siteBody'>
          {content}
        </div>
        <footer className='siteFooter'>
          <span>Logo by: <a href='https://www.eoschu.com/'>Eos Chu</a></span>
        </footer>
      </div>
    );
  }
}

export default App;