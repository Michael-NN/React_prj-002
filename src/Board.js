import React from 'react';
import Square from './Square';
import Settings from './Settings';

class Board extends React.Component {
    constructor(props) {
        super(props);
        const defaults = {
            showLegal: true,
            rowCount: 5,
            colCount: 5,
            cpu1: 0,
            cpu2: 0,
        }
        const gameOngoing = true;
        const playerOneTurn = true;
        const hasLegalMove = true;
        const showLegal = defaults.showLegal;
        const winner = null;
        const rowCount = defaults.rowCount;
        const colCount = defaults.colCount;
        const startRow = Math.floor(rowCount/2);
        const startCol = Math.floor(colCount/2);
        const curRow = startRow;
        const curCol = startCol;
        const retRow = startRow;
        const retCol = startCol;
        const cpu1 = defaults.cpu1;
        const cpu2 = defaults.cpu2;
        const squares = Array(rowCount).fill(null).map(() => new Array(colCount).fill(null));
        squares[curRow][curCol] = '1';
        this.state = {
            defaults,
            gameOngoing,
            playerOneTurn,
            hasLegalMove,
            showLegal,
            winner,
            rowCount,
            colCount,
            startRow,
            startCol,
            curRow,
            curCol,
            retRow,
            retCol,
            cpu1,
            cpu2,
            squares,
        }
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleSettings = this.handleSettings.bind(this);
    }

    renderSquare(rowNumber, colNumber) {
        const squid = rowNumber + ',' + colNumber;
        const retFlag = rowNumber===this.state.retRow && colNumber===this.state.retCol;
        const adjFlag = this.state.showLegal && (Math.abs(rowNumber - this.state.curRow) <= 1) && (Math.abs(colNumber - this.state.curCol) <= 1) && !(rowNumber===this.state.curRow && colNumber===this.state.curCol)
        let goalFlag = null;
        if ((rowNumber===0 && colNumber===0) || (rowNumber===this.state.rowCount-1 && colNumber===this.state.colCount-1)) {
            goalFlag = 'G1';
        }
        if ((rowNumber===0 && colNumber===this.state.colCount-1) || (rowNumber===this.state.rowCount-1 && colNumber===0)) {
            goalFlag = 'G2';
        }
		return (
			<Square
                squid = {squid}
                row = {rowNumber}
                col = {colNumber}
                ret = {retFlag}
                adj = {adjFlag}
                goal = {goalFlag}
                value = {this.state.squares[rowNumber][colNumber]}
                onClick = {() => this.handleClick(rowNumber, colNumber)}
                onFocus = {() => this.handleFocus(rowNumber, colNumber)}
			/>
		);
    }

    renderRow(rowNumber, length) {
        return <div className='row'>{Array(length).fill(null).map((element, index) => this.renderSquare(rowNumber, index))}</div>;
    }

    renderBoard(rows, cols) {
        return <div className='board'>{Array(rows).fill(null).map((element, index) => this.renderRow(index, cols))}</div>;
    }

    handleKeyUp(event) {
        if (event.code==='KeyG') {
            console.log(this.state);
        }
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        let retRow = this.state.retRow;
        let retCol = this.state.retCol;
        switch(event.code) {
            case 'ArrowUp':
                retRow += -1;
                break;
            case 'ArrowDown':
                retRow += 1;
                break;
            case 'ArrowLeft':
                retCol += -1;
                break;
            case 'ArrowRight':
                retCol += 1;
                break;
            case 'Space':
                if (this.state.gameOngoing) {
                    const valid = this.validateMove(retRow, retCol);
                    if (valid) {
                        this.setCurrent(retRow, retCol);
                    }
                } else {
                    this.resetGame(null, null, null, null);
                }
                break;
            default:
        }
        retRow = clamp(retRow, Math.max(0, this.state.curRow-1), Math.min(this.state.rowCount-1, this.state.curRow+1));
        retCol = clamp(retCol, Math.max(0, this.state.curCol-1), Math.min(this.state.colCount-1, this.state.curCol+1));
        this.setState({retRow, retCol});
        document.getElementById(retRow + ',' + retCol).focus();
    }

    handleFocus(rowNumber, colNumber) {
        const retRow = rowNumber;
        const retCol = colNumber;
		this.setState({retRow, retCol});
    }

    handleClick(rowNumber, colNumber) {
        const valid = this.validateMove(rowNumber, colNumber);
        if (valid) {
            this.setCurrent(rowNumber, colNumber);
        }
    }

    validateMove(rowNumber, colNumber) {
        if (!this.state.gameOngoing) {
            return false;
        }
        if ((this.state.playerOneTurn && this.state.cpu1!==0) || (!this.state.playerOneTurn && this.state.cpu2!==0)) {
            return false;
        }
        if (rowNumber === this.state.curRow && colNumber === this.state.curCol) {
            return false;
        }
        if (rowNumber < 0 || rowNumber >= this.state.rowCount) {
            return false;
        }
        if (colNumber < 0 || colNumber >= this.state.colCount) {
            return false;
        }
        if (this.state.squares[rowNumber][colNumber] === 'X') {
            return false;
        }
        if (!(Math.abs(rowNumber - this.state.curRow) <= 1) || !(Math.abs(colNumber - this.state.curCol) <= 1)) {
            return false;
        }
        return true;
    }

    setCurrent(rowNumber, colNumber) {
        const curRow = rowNumber;
        const curCol = colNumber;
        const retRow = rowNumber;
        const retCol = colNumber;
		const squares = this.state.squares.slice();
        let hasLegalMove = false;
        for (let i = 0; i<squares.length; i++) {
            for (let j = 0; j<squares[i].length; j++) {
                if (squares[i][j] === '1' || squares[i][j] === '2') {
                   squares[i][j] = 'X';
                }
                if ((Math.abs(i - rowNumber) <= 1) && (Math.abs(j - colNumber) <= 1) && !(i===rowNumber && j===colNumber) && (squares[i][j] !== 'X')) {
                    hasLegalMove = true;
                }
            }
        }
        const playerOneTurn = !this.state.playerOneTurn;
        squares[rowNumber][colNumber] = (playerOneTurn)?'1':'2';
		this.setState({playerOneTurn, hasLegalMove, curRow, curCol, retRow, retCol, squares},this.detectEndState);
    }

    cpuMove(steps, best) {
        const result = this.minMaxBestMove(this.state.squares, this.state.curRow, this.state.curCol, steps, best);
        switch (result.move) {
            case 0:
                this.setCurrent(this.state.curRow-1, this.state.curCol);
                break;
            case 1:
                this.setCurrent(this.state.curRow-1, this.state.curCol+1);
                break;
            case 2:
                this.setCurrent(this.state.curRow, this.state.curCol+1);
                break;
            case 3:
                this.setCurrent(this.state.curRow+1, this.state.curCol+1);
                break;
            case 4:
                this.setCurrent(this.state.curRow+1, this.state.curCol);
                break;
            case 5:
                this.setCurrent(this.state.curRow+1, this.state.curCol-1);
                break;
            case 6:
                this.setCurrent(this.state.curRow, this.state.curCol-1);
                break;
            case 7:
                this.setCurrent(this.state.curRow-1, this.state.curCol-1);
                break;
            default:
        }
    }

    minMaxBestMove(squares, row, col, steps, best) {
        if (steps===0) {
            return {value: this.heuristic(row, col)};
        } else if ((row === 0 && col === 0) || (row === this.state.rowCount-1 && col === this.state.colCount-1)) {
            return {value: 1};
        } else if ((row === this.state.rowCount-1 && col === 0) || (row === 0 && col === this.state.colCount-1)) {
            return {value: -1};
        } else {
            let moves = new Array(8).fill(null);
            for (let i = 0; i < 8; i++) {
                let {mutRow, mutCol} = this.mutateIndices(row, col, i);
                let valid = mutRow >= 0 && mutRow < this.state.rowCount && mutCol >= 0 && mutCol < this.state.colCount && squares[mutRow][mutCol] !== 'X';
                if(valid) {
                    let mutSquares = this.mutateSquares(squares, mutRow, mutCol, best);
                    moves[i] = this.minMaxBestMove(mutSquares, mutRow, mutCol, steps-1, best==='max'?'min':'max')
                }
            }
            let valueList = moves.map(element => element?element.value:null).filter(element => element!==null);
            let bestValue = best==='max'?Math.max(...valueList):Math.min(...valueList);
            let bestMove = moves.findIndex(element => element!==null && element.value===bestValue);
            return {move: bestMove, value: bestValue};
        }
    }

    heuristic(row, col) {
        const cenRow = this.state.startRow;
        const cenCol = this.state.startCol;
        const rowFromCenter = Math.abs(cenRow - row);
        const colFromCenter = Math.abs(cenCol - col);
        const radius = Math.min(rowFromCenter, colFromCenter);
        const stepSize = 1/Math.floor(this.state.rowCount/2);
        const sign = ((row <= cenRow && col <= cenCol) || (row > cenRow && col > cenCol))?1:-1;
        return sign*radius*stepSize;
    }

    mutateIndices(row, col, direction) {
        let mutRow = row;
        let mutCol = col;
        switch(direction) {
            case 0:
                mutRow -= 1;
                break;
            case 1:
                mutRow -= 1;
                mutCol += 1;
                break;
            case 2:
                mutCol += 1;
                break;
            case 3:
                mutRow += 1;
                mutCol += 1;
                break;
            case 4:
                mutRow += 1;
                break;
            case 5:
                mutRow += 1;
                mutCol -= 1;
                break;
            case 6:
                mutCol -= 1;
                break;
            case 7:
                mutRow -= 1;
                mutCol -= 1;
                break;
            default:
        }
        return {mutRow, mutCol};
    }

    mutateSquares(squares, mutRow, mutCol, best) {
        const mutSquares = this.cloneArray(squares);
        for (let i = 0; i<mutSquares.length; i++) {
            for (let j = 0; j<mutSquares[i].length; j++) {
                if (mutSquares[i][j] === '1' || mutSquares[i][j] === '2') {
                   mutSquares[i][j] = 'X';
                }
            }
        }
        mutSquares[mutRow][mutCol] = best==='max'?'2':'1';
        return mutSquares;
    }

    cloneArray(squares) {
        const result = Array(this.state.rowCount).fill(null).map(() => new Array(this.state.colCount).fill(null));
        for (let i = 0; i<squares.length; i++) {
            for (let j = 0; j<squares[i].length; j++) {
                result[i][j] = squares[i][j];
            }
        }
        return result;
    }

    detectEndState() {
        const curRow = this.state.curRow;
        const curCol = this.state.curCol;
        const hasLegalMove = this.state.hasLegalMove;
        if (curRow === 0 && curCol === 0) {
            this.declareWinner(1);
        } else if (curRow === this.state.rowCount-1 && curCol === this.state.colCount-1) {
            this.declareWinner(1);
            
        } else if (curRow === this.state.rowCount-1 && curCol === 0) {
            this.declareWinner(2);
            
        } else if (curRow === 0 && curCol === this.state.colCount-1) {
            this.declareWinner(2);
        } else if (!hasLegalMove) {
            this.declareWinner(0);
        } else {
            this.detectCpuTurn();
        }
    }

    declareWinner(winner) {
        if (this.state.gameOngoing) {
            const gameOngoing = false;
            this.setState({gameOngoing, winner});
        }
    }

    detectCpuTurn() {
        if (this.state.gameOngoing) {
            const playerOneTurn = this.state.playerOneTurn;
            if (playerOneTurn===true && this.state.cpu1!==0) {
//                this.cpuMove(this.state.cpu1, 'max');
                setTimeout(() => {this.cpuMove(this.state.cpu1, 'max');}, 1000);
            }
            if (playerOneTurn===false && this.state.cpu2!==0) {
//                this.cpuMove(this.state.cpu2, 'min');
                setTimeout(() => {this.cpuMove(this.state.cpu2, 'min');}, 1000);
            }
        }
    }

    resetGame(newRowCount, newColCount, newCpu1, newCpu2) {
        const gameOngoing = true;
        const playerOneTurn = true;
        const winner = null;
        const rowCount = newRowCount?newRowCount:this.state.defaults.rowCount;
        const colCount = newColCount?newColCount:this.state.defaults.colCount;
        const startRow = Math.floor(rowCount/2);
        const startCol = Math.floor(colCount/2);
        const curRow = startRow;
        const curCol = startCol;
        const retRow = startRow;
        const retCol = startCol;
        const cpu1 = newCpu1!==null?newCpu1:this.state.defaults.cpu1;
        const cpu2 = newCpu2!==null?newCpu2:this.state.defaults.cpu2;
        const squares = Array(rowCount).fill(null).map(() => new Array(colCount).fill(null));
        squares[curRow][curCol] = '1';
        squares[0][0] = 'G1';
        squares[rowCount-1][colCount-1] = 'G1';
        squares[0][colCount-1] = 'G2';
        squares[rowCount-1][0] = 'G2';
        const defaults = {
            rowCount,
            colCount,
            cpu1,
            cpu2
        }
        this.setState({defaults, gameOngoing, playerOneTurn, winner, rowCount, colCount, startRow, startCol, curRow, curCol, retRow, retCol, cpu1, cpu2, squares},this.detectCpuTurn);
        document.getElementById(retRow + ',' + retCol).focus();
    }

    handleSettings(settings) {
        this.resetGame(settings.rowCount, settings.colCount, settings.cpu1, settings.cpu2);
    }

    render() {
        let headerText;
        if (this.state.gameOngoing) {
            if (this.state.playerOneTurn) {
                headerText = 'Red\'s Turn pointless update test';
            } else {
                headerText = 'Yellow\'s Turn';
            }
        } else {
            if (this.state.winner === 1) {
                headerText = 'Red Wins!';
            }
            if (this.state.winner === 2) {
                headerText = 'Yellow Wins!';
            }
            if (this.state.winner === 0) {
                headerText = 'It\'s a draw!';
            }
        }
        return (
            <div>
                <h1>{headerText}</h1>
                {this.renderBoard(this.state.rowCount,this.state.colCount)}
                <button onClick={() => this.resetGame(null, null, null, null)}>Restart</button>
                <Settings
                    rowCount={this.state.rowCount}
                    colCount={this.state.colCount}
                    cpu1={this.state.cpu1}
                    cpu2={this.state.cpu2}
                    handleSubmit={this.handleSettings}
                />
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener('keyup', this.handleKeyUp);
        this.detectCpuTurn();
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyUp);
    }
}

export default Board;