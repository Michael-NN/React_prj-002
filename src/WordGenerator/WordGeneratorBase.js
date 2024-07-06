import React from 'react';
import CategoryRow from './WordGeneratorCategoryRow';
import './WordGeneratorBase.css';

class WordGeneratorBase extends React.Component {
    constructor(props) {
        super(props);
        /*
        Ideas
        groups: pack, squad, swarm, legion, pair, crew, ...
        containers: box, sack, bottle, crate, ...
        */
        const wordBank = [
            {catName: 'Materials', words:['Wood','Stone','Iron','Gold','Silver','Blood','Bone','Flesh','Water','Salt','Sand','Ash','Smoke','Jewels','Crystal','Ice','Snow','Marble', 'Glass', 'Flowers', 'Vines', 'Mist', 'Silk', 'Fur', 'Fire', 'Dirt', 'Mud', 'Grass', 'Wine', 'Obsidian', 'Lava']},
            {catName: 'Animals', words:['Dragon','Dog','Cat','Wolf','Fox','Giraffe','Zebra','Buffalo','Lion','Tiger','Monkey','Ape','Bear','Stag','Snake','Alligator','Crocodile','Lizard','Turtle','Frog','Shark','Fish','Bird','Sparrow','Hawk','Eagle','Falcon','Owl','Bull','Boar','Chicken','Duck','Mouse','Rat','Bat','Vulture','Songbird','Parrot','Swan','Octopus','Squid','Whale','Dolphin','Swordfish','Crab','Lobster','Butterfly','Bee','Cricket','Mantis','Spider','Moth','Beetle','Ant','Fly','Locust','Starfish','Slug','Horse', 'Stingray','Penguin']},
            {catName: 'Colors', words:['Violet','Orange','Purple','Pink','Amber','Amethyst','Brass','Bronze','White','Fushsia','Ruby','Aqua','Aquamarine','Lime','Green','Yellow','Red','Blue','Beige','Brown','Black','Sapphire','Lilac','Cerulean','Citrine','Gray','Copper','Cyan','Magenta','Turquoise','Saffron','Emerald','Lavender','Vermillion','Mauve','Viridian','Gold','Indigo','Maroon','Periwinkle','Platinum','Scarlet','Silver','Tan','Teal','Taupe',]},
        ]
        const displayRows = [];

        this.state = {
            wordBank,
            displayRows,
        }

        this.addRow = this.addRow.bind(this);
        this.changeRowCategory = this.changeRowCategory.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.increaseRow = this.increaseRow.bind(this);
        this.decreaseRow = this.decreaseRow.bind(this);
        this.randomizeRow = this.randomizeRow.bind(this);
        this.lockCell = this.lockCell.bind(this);
        this.randomizeAll = this.randomizeAll.bind(this);
    }

    addRow(direction) {
        const displayRows = this.state.displayRows;
        const newRow = {catName: '', displayCells:[{word: '', locked: false}]};
        if (direction === "top") {
            displayRows.unshift(newRow);
        } else {
            displayRows.push(newRow);
        }
        this.setState({displayRows});
    }

    changeRowCategory(index, newCat) {
        const displayRows = this.state.displayRows;
        const selectedRow = displayRows[index];
        selectedRow.catName = newCat;
        selectedRow.displayCells = selectedRow.displayCells.map(cell => ({word: '', locked: false}));
        this.setState({displayRows});
    }

    deleteRow(index) {
        const displayRows = this.state.displayRows;
        displayRows.splice(index, 1);
        this.setState({displayRows});
    }

    increaseRow(index) {
        const displayRows = this.state.displayRows;
        displayRows[index].displayCells.push({word: '', locked: false});
        this.setState({displayRows});
    }

    decreaseRow(index) {
        const displayRows = this.state.displayRows;
        displayRows[index].displayCells.pop();
        this.setState({displayRows});
    }

    randomizeRow(index) {
        const displayRows = this.state.displayRows;
        const randRow = displayRows[index];
        const options = this.state.wordBank.find(cat => cat.catName===randRow.catName)?.words;
        randRow.displayCells = randRow.displayCells.map(cell => cell.locked?cell:{word: options?options[Math.floor(Math.random() * options.length)]:'', locked: false});
        this.setState({displayRows});
    }

    lockCell(rowInd, cellInd) {
        const displayRows = this.state.displayRows;
        const row = displayRows[rowInd];
        const cell = row.displayCells[cellInd];
        cell.locked = !cell.locked;
        this.setState({displayRows});
    }

    randomizeAll() {
        for (let i = 0; i<this.state.displayRows.length; i++) {
            this.randomizeRow(i);
        }
    }

    render() {
        const options = this.state.wordBank.map(cat => cat.catName);
        const displayRows = this.state.displayRows.map((row, ind) => <CategoryRow key={ind} index={ind} row={row} options={options} changeCateogry={this.changeRowCategory} deleteCategory={this.deleteRow} increaseRow={this.increaseRow} decreaseRow={this.decreaseRow} randomizeRow={this.randomizeRow} lockCell={this.lockCell}/>)
        return (
            <div className="wordGen-base">
                <button className="wordGen-button wordGen-add" onClick={() => this.addRow("top")}>+</button>
                <button className="wordGen-button wordGen-randomizeAll" onClick={this.randomizeAll} disabled={this.state.displayRows.length === 0 || this.state.displayRows.map(row => row.catName).includes('')}>Randomize All!</button>
                <div className="wordGen-rowContainer">
                {displayRows}
                </div>
                <button className="wordGen-button wordGen-add" onClick={() => this.addRow("bot")}>+</button>
                <button className="wordGen-button wordGen-randomizeAll" onClick={this.randomizeAll} disabled={this.state.displayRows.length === 0 || this.state.displayRows.map(row => row.catName).includes('')}>Randomize All!</button>
            </div>
        )
    }
}

export default WordGeneratorBase;