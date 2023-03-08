import React from 'react';
import TaePanel from './TaePanel';
import './TaeBase.css';

class TaeBase extends React.Component {
    constructor(props) {
        super(props);
        const game = {
            config: {
                path: {
                    display: true,
                    label: 'Go to',
                    color: 'pink',
                },
                inspect: {
                    display: false,
                    label: 'Inspect',
                    color: 'lightblue',
                },
                inventory: {
                    display: false,
                    label: 'Inventory',
                    color: 'lightgreen',
                },
            },
            rooms: [
                {
                    id: 'brdg',
                    desc: 'You are on the bridge of the ship.',
                    paths: [
                        {id:'engn', label: 'Engine Room', roomId: 'engn'},
                        {id:'ktch', label: 'Kitchen', roomId: 'ktch'},
                    ],
                },
                {
                    id: 'engn',
                    desc: 'This is the engine room.',
                    paths: [
                        {id:'brdg', label: 'Bridge', roomId: 'brdg'},
                        {id:'ktch', label: 'Kitchen', roomId: 'ktch'},
                    ],
                },
                {
                    id: 'ktch',
                    desc: 'The kitchen smells good.',
                    paths: [
                        {id:'engn', label: 'Engine Room', roomId: 'engn'},
                    ],
                },
            ],
        };
        const gameState = {
            room: 'brdg',
        }
        this.state = {
            game,
            gameState,
        }

        this.goTo = this.goTo.bind(this);
    }

    currentRoom() {
        return this.state.game.rooms.find(room => room.id === this.state.gameState.room);
    }

    goTo(roomId) {
        const gameState = this.state.gameState;
        gameState.room = roomId;
        this.setState(gameState);
    }

    render() {
        const config = this.state.game.config;
        const currentRoom = this.currentRoom();
        let pathInput = <TaePanel config={config.path} items={currentRoom.paths} handleClick={this.goTo}></TaePanel>;
        let inspectInput = <TaePanel config={config.inspect}></TaePanel>;
        let inventoryInput = <TaePanel config={config.inventory}></TaePanel>;
        /*
        if (config.path.display) {
            pathInput = <div className="tae-input tae-path">
                                    {this.currentRoom().paths.map(path => <button className="tae-optionButton" onClick={() => this.goTo(path.roomId)}>{path.label}</button>)}
                                    {config.path.label}
                              </div>;
        }
        */
        return (
            <div className="tae-system">
                <div className="tae-screen">
                    {this.currentRoom().desc}
                </div>
                <div className="tae-inputBar">
                    {pathInput}
                    {inspectInput}
                    {inventoryInput}
                </div>
            </div>
        )
    }
}

export default TaeBase;