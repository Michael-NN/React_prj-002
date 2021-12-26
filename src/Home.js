import React from 'react';
import './Home.css';

class Home extends React.Component {

    render() {
        return (
            <div>
                <h2>Games</h2>
                <div>
                    <button className="menuButton" onClick={() => this.props.setPage('fallingTiles')}>Falling Tiles</button>
                </div>
                <div>
                    <button className="menuButton" onClick={() => this.props.setPage('kafatz')}>Kafatz</button>
                </div>
                <div>
                    <button className="menuButton" onClick={() => this.props.setPage('')}>More</button>
                </div>
                <div>
                    <button className="menuButton" onClick={() => this.props.setPage('')}>Coming</button>
                </div>
                <div>
                    <button className="menuButton" onClick={() => this.props.setPage('')}>Soon</button>
                </div>
                <div>
                    <button className="menuButton" onClick={() => this.props.setPage('')}>I promise</button>
                </div>
            </div>
        )
    }
}

export default Home;