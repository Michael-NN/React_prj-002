import React from 'react';
import Square from './Square';
import Settings from './Settings';
import './Board.css';

class Board extends React.Component {
    constructor(props) {
        super(props);
        const defaults = {
            showLegal: false,
            boardSize: 5,
            cpu1: 0,
            cpu2: 0,
        }
        const gameOngoing = true;
        const playerOneTurn = true;
        const hasLegalMove = true;
        const showLegal = defaults.showLegal;
        const winner = null;
        const boardSize = defaults.boardSize;
        const rowCount = boardSize;
        const colCount = boardSize;
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
        const timeoutId = null;
        this.state = {
            defaults,
            gameOngoing,
            playerOneTurn,
            hasLegalMove,
            showLegal,
            winner,
            boardSize,
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
            timeoutId,
        }
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.handleSettings = this.handleSettings.bind(this);
    }

    renderSquare(rowNumber, colNumber) {
        const squid = rowNumber + ',' + colNumber;
        const retFlag = rowNumber===this.state.retRow && colNumber===this.state.retCol;
        const adjFlag = (Math.abs(rowNumber - this.state.curRow) <= 1) && (Math.abs(colNumber - this.state.curCol) <= 1) && !(rowNumber===this.state.curRow && colNumber===this.state.curCol)
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
                rowCount = {this.state.rowCount}
                colCount = {this.state.colCount}
                row = {rowNumber}
                col = {colNumber}
                ret = {retFlag}
                adj = {adjFlag}
                goal = {goalFlag}
                value = {this.state.squares[rowNumber][colNumber]}
                onClick = {() => this.handleClick(rowNumber, colNumber)}
			/>
		);
    }

    renderRow(rowNumber, length) {
        let className = 'row'
        switch(this.state.rowCount) {
            case 5:
                className += ' rows-5'
                break;
            case 7:
                className += ' rows-7'
                break;
            case 9:
                className += ' rows-9'
                break;
                case 11:
                    className += ' rows-11'
                    break;
                default:
                className += ''
        }
            return <div className={className}>{Array(length).fill(null).map((element, index) => this.renderSquare(rowNumber, index))}</div>;
    }

    renderBoard(rows, cols) {
        return <div id="board" className='board' tabIndex="0">{Array(rows).fill(null).map((element, index) => this.renderRow(index, cols))}</div>;
    }

    handleKeyUp(event) {
        const gameControlKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];
        if (gameControlKeys.includes(event.code)) {
            event.preventDefault();
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
                        this.handleClick(retRow, retCol);
                    } else {
                        this.resetGame(null, null, null);
                    }
                    break;
                default:
            }
            retRow = clamp(retRow, Math.max(0, this.state.curRow-1), Math.min(this.state.rowCount-1, this.state.curRow+1));
            retCol = clamp(retCol, Math.max(0, this.state.curCol-1), Math.min(this.state.colCount-1, this.state.curCol+1));
            this.setState({retRow, retCol});
        }
    }

    handleKeyDown(event) {
        const boardIgnores = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']
        if (boardIgnores.includes(event.code)) {
            event.preventDefault();
        }
    }

    handleClick(rowNumber, colNumber) {
        if (this.state.gameOngoing && ((this.state.playerOneTurn && this.state.cpu1 === 0) || (!this.state.playerOneTurn && this.state.cpu2 === 0))) {
            if (this.getLegalMoves({squares: this.state.squares, row: this.state.curRow, col: this.state.curCol}, true).includes(rowNumber+','+colNumber)) {
                this.movePiece([rowNumber, colNumber]);
            }
        }
    }

    movePiece(toCoords) {
        const rowNumber = toCoords[0];
        const colNumber = toCoords[1];
        const curRow = rowNumber;
        const curCol = colNumber;
        const retRow = rowNumber;
        const retCol = colNumber;
        const squares = this.mutateSquares(this.state.squares, toCoords, this.state.playerOneTurn)
        const playerOneTurn = !this.state.playerOneTurn;
		this.setState({playerOneTurn, curRow, curCol, retRow, retCol, squares},this.detectEndState);
    }

    cpuMove(steps, best) {
        const result = this.minMaxBestMove({steps: 0, squares: this.state.squares, row: this.state.curRow, col: this.state.curCol, isMax: best==='max'}, steps, this.lowestResult(), this.highestResult());
        this.movePiece(result.move);
    }

    minMaxBestMove(node, steps, alph, beta) {
        if (steps === 0 || this.isEndState(node)) {
            return this.heuristic(node);
        } else {
            let accResult = node.isMax?this.lowestResult():this.highestResult();
            let childNodes = this.generateChildNodes(node);
            let resultsList = [];
            for (let childNode of childNodes) {
                let curResult = this.minMaxBestMove(childNode, steps-1, alph, beta);
                if (node.move) {
                    curResult.move = node.move;
                }
                if (node.isMax) {
                    accResult = this.resultMax(accResult, curResult);
                    if (this.resultCompare(curResult,beta) > 0) {
                        return accResult;
                    }
                    alph = this.resultMax(alph, accResult);
                } else {
                    accResult = this.resultMin(accResult, curResult);
                    if (this.resultCompare(curResult,alph) < 0) {
                        return accResult;
                    }
                    beta = this.resultMin(beta, accResult);
                }
                resultsList.push(curResult);
            }
            return this.findBest(resultsList, node.isMax);
        }
    }

    //Is passed a game node and returns true iff it represents a state where the game is over
    isEndState(node) {
        return this.assessPosition(node) !== null;
    }

    assessPosition(node) {
        const curRow = node.row;
        const curCol = node.col;
        const hasLegalMove = this.getLegalMoves(node, true).length > 0;
        if (curRow === 0 && curCol === 0) {
            return 1;
        } else if (curRow === this.state.rowCount-1 && curCol === this.state.colCount-1) {
            return 1;
        } else if (curRow === this.state.rowCount-1 && curCol === 0) {
            return 2;
        } else if (curRow === 0 && curCol === this.state.colCount-1) {
            return 2;
        } else if (!hasLegalMove) {
            return 0;
        } else {
            return null;
        }
    }

    //Is passed a game node and returns a heuristic assessment of the state's favorability
    heuristic(node) {
        const row = node.row;
        const col = node.col;

        const cenRow = this.state.startRow;
        const cenCol = this.state.startCol;
        const rowFromCenter = Math.abs(cenRow - row);
        const colFromCenter = Math.abs(cenCol - col);
        const radius = Math.min(rowFromCenter, colFromCenter);
        const stepSize = 1/Math.floor(this.state.boardSize/2);
        const sign = ((row <= cenRow && col <= cenCol) || (row > cenRow && col > cenCol))?1:-1;
        return {
            steps: node.steps,
            move: node.move,
            value: sign*radius*stepSize,
        };
    }

    //returns the lowest possible heuristic value
    lowestResult() {
        return {value: -Infinity};
    }

    //returns the highest possible heuristic value
    highestResult() {
        return {value: Infinity};
    }

    //Takes node representing a game state and returns list of nodes representing possible next game states
    generateChildNodes(node) {
        const legalMoves = this.getLegalMoves(node, false);
        let childNodes = [];
        legalMoves.forEach(move => {
            childNodes.push({
                steps: node.steps+1,
                move: move,
                squares: this.mutateSquares(node.squares, move, node.isMax),
                row: move[0],
                col: move[1],
                isMax: !node.isMax,
            })
        });
        return this.shuffleArray(childNodes);
    }

    shuffleArray (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    getLegalMoves(node, asText) {
        let legalMoves = [];
        for (let i = 0; i < 8; i++) {
            let {mutRow, mutCol} = this.mutateIndices(node.row, node.col, i);
            let valid = mutRow >= 0 && mutRow < this.state.rowCount && mutCol >= 0 && mutCol < this.state.colCount && node.squares[mutRow][mutCol] !== 'X';
            if (valid) {
                if (asText) {
                    legalMoves.push(mutRow+','+mutCol);
                } else {
                    legalMoves.push([mutRow, mutCol]);
                }
            }
        }
        return legalMoves;
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

    mutateSquares(squares, mutCoords, playerOneMove) {
        const mutRow = mutCoords[0];
        const mutCol = mutCoords[1];
        const mutSquares = this.cloneArray(squares);
        for (let i = 0; i<mutSquares.length; i++) {
            for (let j = 0; j<mutSquares[i].length; j++) {
                if (mutSquares[i][j] === '1' || mutSquares[i][j] === '2') {
                   mutSquares[i][j] = 'X';
                }
            }
        }
        mutSquares[mutRow][mutCol] = playerOneMove?'2':'1';
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

    //Takes two nodes that represent minimax results and returns the more positive
    resultMax(a, b) {
        if (a&&b) {
            if (this.resultCompare(a,b)===1) {
                return a;
            } else {
                return b;
            }
        } else {
            return null;
        }
    }

    //Takes two nodes that represent minimax results and returns the more negative
    resultMin(a, b) {
        if (a&&b) {
            if (this.resultCompare(a,b)===-1) {
                return a;
            } else {
                return b;
            }
        } else {
            return null;
        }
    }

    //Takes two nodes that represent minimax results and returns an integer the represents which of the two is more positive
    resultCompare(resultA, resultB) {
        if(resultA&&resultB) {
            const a = resultA.value;
            const b = resultB.value;
            if (a===b) {
                return 0;
            }  else if (a>b) {
                return 1;
            } else if (a<b) {
                return -1;
            }
        } else {
            return null;
        }
    }

    //Takes a list of minimax results and returns the one that would be selected as the best move
    findBest(resultsList, isMax) {
        const exampleBest = resultsList.reduce((bestSoFar, current) => {
            if ((isMax && this.resultCompare(bestSoFar,current)===1)||(!isMax && this.resultCompare(bestSoFar,current)===-1)) {
                return bestSoFar;
            } else {
                return current;
            }
        });
        const isStalling = (isMax && exampleBest.value < 0) || (!isMax && exampleBest.value > 0);
        const leadingResults = resultsList.filter(result => this.resultCompare(result, exampleBest) === 0);
        return leadingResults.reduce((bestSoFar, current) => {
            if ((isStalling && bestSoFar.steps > current.steps) || (!isStalling && bestSoFar.steps < current.steps)) {
                return bestSoFar;
            } else {
                return current;
            }
        });
    }

    detectEndState() {
        const assessment = this.assessPosition({squares: this.state.squares, row: this.state.curRow, col: this.state.curCol});
        if (assessment !== null) {
            this.declareWinner(assessment);
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
                const timeoutId =  setTimeout(() => {this.cpuMove(this.state.cpu1, 'max');}, 1000);
                this.setState({timeoutId});
            }
            if (playerOneTurn===false && this.state.cpu2!==0) {
                const timeoutId =  setTimeout(() => {this.cpuMove(this.state.cpu2, 'min');}, 1000);
                this.setState({timeoutId});
            }
        }
    }

    resetGame(newBoardSize, newCpu1, newCpu2) {
        clearTimeout(this.state.timeoutId);
        const timeoutId = null;
        const gameOngoing = true;
        const playerOneTurn = true;
        const winner = null;
        const boardSize = newBoardSize?newBoardSize:this.state.defaults.boardSize;
        const rowCount = boardSize;
        const colCount = boardSize;
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
            boardSize,
            cpu1,
            cpu2
        }
        const board = document.getElementById('board');
        if (board) {
            board.focus();
        }
        this.setState({defaults, gameOngoing, playerOneTurn, winner, boardSize, rowCount, colCount, startRow, startCol, curRow, curCol, retRow, retCol, cpu1, cpu2, squares, timeoutId},this.detectCpuTurn);
    }

    handleSettings(settings) {
        this.resetGame(settings.boardSize, settings.cpu1, settings.cpu2);
    }

    render() {
        let headerText;
        if (this.state.gameOngoing) {
            if (this.state.playerOneTurn) {
                headerText = 'Red\'s Turn';
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
                <Settings
                    boardSize={this.state.boardSize}
                    cpu1={this.state.cpu1}
                    cpu2={this.state.cpu2}
                    handleReset={this.resetGame}
                    handleSubmit={this.handleSettings}
                />
                <div className="rulesBox" tabIndex='0'>
                    <h2>Rules</h2>
                    <p>
                        Players take turns moving the game token one space vertically, horizontally, or diagonally.
                    </p>
                    <p>
                        Red player's goal is for the game token to enter one of the red corners, while yellow player's goal is for the game token to enter one of the yellow corners.
                    </p>
                    <p>
                        The game token cannot return to a space it has previously been to.  The vaccated space will vanish after each move.
                    </p>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const board = document.getElementById('board');
        board.addEventListener('keyup', this.handleKeyUp);
        board.addEventListener('keydown', this.handleKeyDown);
        if (board) {
            board.focus();
        }
        this.detectCpuTurn();
    }

    componentWillUnmount() {
        const board = document.getElementById('board');
        board.removeEventListener('keyup', this.handleKeyUp);
        board.addEventListener('keydown', this.handleKeyDown);
    }
}

export default Board;