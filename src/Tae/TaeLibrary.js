import React from 'react';
import TaeCartridge from './TaeCartridge';
import './TaeLibrary.css';

class TaeLibrary extends React.Component {
    constructor(props) {
        super(props);

        const searchValue = '';
        this.state = {searchValue};
        this.searchInput = this.searchInput.bind(this);
    }

    searchInput(event) {
        this.setState({searchValue: event.target.value});
    }

    render() {
        const displayList = this.props.gameList.filter(game => game.title.toLowerCase().includes(this.state.searchValue.toLowerCase())).map((game, index) => <div key={index} className='tae-library-game'><TaeCartridge gameInfo={game} currentGame={this.props.currentGame} handleClick={this.props.handleClick}/></div>)
        return (<div>
            <div className='tae-library'>
                <input className='tae-library-search' type='text' placeholder='Search Games' onInput={this.searchInput}/>
                <div className='tae-library-shelf'>
                    {displayList}
                </div>
            </div>
        </div>)
    }
}

export default TaeLibrary;