import DevGame from './Tae_Development_Game';
import CYOAdventureQuest from './Tae_CYO_Adventure_Quest';
import DemoScifi from './Tae_Demo_Scifi';

const GameList = [
    DevGame,
    CYOAdventureQuest,
    DemoScifi,
];
GameList.forEach((game, index) => game.cartridge.id = ('id' + index));
export default GameList;