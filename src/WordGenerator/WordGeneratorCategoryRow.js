import React from 'react';
import './WordGeneratorCategoryRow.css';

class WordGeneratorCategoryRow extends React.Component {
    render() {
        const options = this.props.options.map((opt, ind) => <option key= {ind+1} value={opt}>{opt}</option>)
        options.unshift(<option key={0} value={''}>-None-</option>)
        const displayCells = this.props.row.displayCells.map((cell, ind) => <button key={ind} className={"wordGen-displayCell" + (cell.locked?" wordGen-lockedCell":"")} onClick={() => this.props.lockCell(this.props.index, ind)}>{cell.word}</button>);
        return (<div className='wordGen-categoryRow'>
                    <div className="wordGen-rowBody">
                        <select className='wordGen-categorySelect' value={this.props.row.catName} onChange={event => this.props.changeCateogry(this.props.index, event.target.value)}>
                            {options}
                        </select>
                        <div className="wordGen-sillySpacer"/>
                        <button className="wordGen-rowButton wordGen-randRow" onClick={() => this.props.randomizeRow(this.props.index)} disabled={this.props.row.catName==='' || this.props.row.displayCells.length===0}>Randomize!</button>

                        <button className="wordGen-rowButton wordGen-indeRow wordGen-decreaseRow" onClick={() => this.props.decreaseRow(this.props.index)} disabled={this.props.row.displayCells.length===1}>-</button>

                        <div className="wordGen-displayCellsContainer">
                            {displayCells}
                        </div>
                        <button className="wordGen-rowButton wordGen-indeRow wordGen-increaseRow" onClick={() => this.props.increaseRow(this.props.index)}>+</button>

                    </div>
                    <button className='wordGen-rowButton wordGen-categoryDelete' onClick={() => this.props.deleteCategory(this.props.index)}>X</button>
        </div>)
    }
}

export default WordGeneratorCategoryRow;