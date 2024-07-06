import React from 'react';
import TaePanel from './TaePanel';
import TaeModal from './TaeModal';
import TaeLibrary from './TaeLibrary';
import Game_List from './TaeGames/Tae_Game_Index';
import './TaeBase.css';

class TaeBase extends React.Component {
    constructor(props) {
        super(props);
        const gameList = Game_List;

        this.state = {
            gameList,
        }

        this.selectGame = this.selectGame.bind(this);
        this.goTo = this.goTo.bind(this);
        this.inspect = this.inspect.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.takeModal = this.takeModal.bind(this);
        this.useItem = this.useItem.bind(this);
    }

    selectGame(gameId) {
        const game = this.state.gameList.find(game => game.cartridge.id === gameId);
        const startRoom = game.rooms.find(room => room.id === game.config.startingRoom);
        const gameState = {
            room: startRoom,
            inspect: startRoom?.inspectables?.find(inspectable => inspectable.id === game.config.startingInspect),
            inventory: game.config.startingInventory ?? [],
        }
        game.config.startingVariables?.forEach(element => {
            gameState[element[0]] = element[1];
        });
        this.setState(
            {
                game,
                gameState,
            }
        )
    }

    minnedGameState() {
        if (this.state.gameState) {
            const gameState = this.state.gameState;
            const result = {};
            Object.entries(gameState).forEach(([key, value]) => {
                result[key] = value;
            })
            result.room = gameState.room?.id
            result.inspect = gameState.inspect?.id;
            result.inventory = gameState.inventory?.map(item => item.id);
            result.inventoryStillHave = gameState.inventory?.filter(item => item.uses === undefined || item.uses > 0).map(item => item.id);
            result.inventoryUsedUp = gameState.inventory?.filter(item => item.uses === 0).map(item => item.id);
            return result;
        } else {
            return null;
        }
    }

    goTo(path) {
        const gameState = this.state.gameState;
        gameState.room = this.state.game.rooms.find(room => room.id === path.roomId);
        gameState.inspect = null;
        path.effect?.forEach(element => {
            gameState[element[0]] = element[1];
        });
    this.setState(gameState);
    }

    inspect(inspectable) {
        const gameState = this.state.gameState;
        gameState.inspect = inspectable;
        inspectable.effect?.forEach(element => {
            gameState[element[0]] = element[1];
        });
        this.setState(gameState);
    }

    closeModal() {
        const gameState = this.state.gameState;
        gameState.inspect = null;
        this.setState(gameState);
    }

    takeModal(items) {
        const gameState = this.state.gameState;
        const newInventory = [...gameState.inventory];
        newInventory.push(...items);
        gameState.inventory = newInventory;
        gameState.inspect = null;
        this.setState(gameState);
    }

    useItem(item) {
        const gameState = this.state.gameState;
        const minnedGameState = this.minnedGameState();
        if (item.toUse === undefined || item.toUse.reduce((soFar, useRule) => soFar && (Array.isArray(minnedGameState[useRule[0]])?minnedGameState[useRule[0]].includes(useRule[1]):minnedGameState[useRule[0]] === useRule[1]),true)) {
            item.effect?.forEach(element => {
                gameState[element[0]] = element[1];
            });
            if (item.uses > 0) {
                this.state.gameState.inventory.find(stateItem => stateItem.id === item.id).uses--;
            }
            gameState.inspect = {
                desc: item.useConfirmation??this.state.game.config.inventory.useConfirmation,
                closeLabel: item.closeLabel,
                takeLabel: item.takeLabel,
                color: item.color,
                windowColor: item.windowColor,
                textColor: item.textColor,
                buttonColor: item.buttonColor,
                buttonTextColor: item.buttonTextColor,
            }
        } else {
            gameState.inspect = {
                desc: item.useFail??this.state.game.config.inventory.useFail,
                closeLabel: item.closeLabel,
                takeLabel: item.takeLabel,
                color: item.color,
                windowColor: item.windowColor,
                textColor: item.textColor,
                buttonColor: item.buttonColor,
                buttonTextColor: item.buttonTextColor,
            }
        }
        this.setState(gameState);
    }

    render() {
        const minnedGameState = this.minnedGameState();
        const currentRoom = this.state.gameState?.room??{desc: 'Welcome to the Text Adventure System! Select a game to begin.'};
        const currentPaths = currentRoom?.paths;
        const currentInspectables = currentRoom?.inspectables;
        const currentInspect = this.state.gameState?.inspect;
        const currentInventory = this.state.gameState?.inventory.filter(item => item.uses === undefined || item.uses > 0);
        
        const config = this.state.game?.config;
        const modal = this.state.gameState?.inspect ? <TaeModal gameState={minnedGameState} config={config.modal} info={currentInspect} closeButton={this.closeModal} takeButton={this.takeModal}></TaeModal> : null;
        const pathInput = config?.path ? <TaePanel gameState={minnedGameState} config={config.path} items={currentPaths} handleClick={this.goTo}></TaePanel> : null;
        const inspectInput = config?.inspect ? <TaePanel gameState={minnedGameState} config={config.inspect} items={currentInspectables} handleClick={this.inspect}></TaePanel> : null;
        const inventoryInput = config?.inventory ? <TaePanel gameState={minnedGameState} config={config.inventory} items={currentInventory} handleClick={this.useItem}></TaePanel> : null;

        return (<div>
            <div className="tae-system">
                <div className="tae-screen">
                    {currentRoom.desc}
                    {modal}
                </div>
                <div className="tae-inputBar">
                    {pathInput}
                    {inspectInput}
                    {inventoryInput}
                </div>
            </div>
            <TaeLibrary currentGame={this.state.game?.cartridge} gameList={this.state.gameList.map(game => game.cartridge)} game={this.state.game} handleClick={this.selectGame}/>
        </div>
        )
    }
}

export default TaeBase;