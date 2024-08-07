import React from 'react';
import KafatzSquare from './KafatzSquare';
import './KafatzBoard.css';

class KafatzBoard extends React.Component {
    constructor(props) {
        super(props);
        const gameOngoing = true;
        const winner = null;
        const playerOneTurn = true;
        const selectedPiece = null;
        const legalIds = [];
        const retPiece = null;
        const squares = [
            [2,2,0,0,2,2],
            [2,2,0,0,2,2],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1]
        ]
        const cpu1 = 0;
        const inputCpu1 = 0;
        const cpu2 = 0;
        const inputCpu2 = 0;
        
        const timeoutId = null;

        this.state = {
            gameOngoing,
            winner,
            playerOneTurn,
            selectedPiece,
            legalIds,
            retPiece,
            squares,
            cpu1,
            inputCpu1,
            cpu2,
            inputCpu2,
            timeoutId,
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleBoardFocus = this.handleBoardFocus.bind(this);
        this.handleBoardUnfocus = this.handleBoardUnfocus.bind(this);
        this.handleChangeCpu1 = this.handleChangeCpu1.bind(this);
        this.handleChangeCpu2 = this.handleChangeCpu2.bind(this);
    }

    handleClick(row, col) {
        if (this.state.gameOngoing && ((this.state.playerOneTurn && this.state.cpu1 === 0) || (!this.state.playerOneTurn && this.state.cpu2 === 0))) {
            if ((this.state.playerOneTurn && this.state.squares[row][col] === 1) || (!this.state.playerOneTurn && this.state.squares[row][col] === 2)) {
                //Clicking own piece
                if (this.state.selectedPiece !== null && this.state.selectedPiece[0]===row && this.state.selectedPiece[1]===col) {
                        //deselect
                        this.setState({selectedPiece: null, legalIds: []});

                } else {
                    //select
                    const legalIds = this.legalFor([row, col], this.state.squares, true);
                    this.setState({selectedPiece: [row, col], legalIds});
                }
            } else {//Not clicking own piece
                if (this.state.selectedPiece !== null) {
                    if (this.state.legalIds.includes(row+','+col)) {
                        this.movePiece(this.state.selectedPiece, [row, col]);
                    } else {
                        this.setState({selectedPiece: null, legalIds: []});
                    }
                }
            }
        }
    }

    handleKeyUp(event) {
        event.preventDefault();
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        if (this.state.retPiece !== null) {
            let [retRow, retCol] = this.state.retPiece;
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
                        this.resetGame(null, null);
                    }
                    break;
                default:
            }
            retRow = clamp(retRow, 0, 5);
            retCol = clamp(retCol, 0, 5);
            this.setState({retPiece: [retRow, retCol]});
        }
    }

    handleKeyDown(event) {
        const boardIgnores = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space']
        if (boardIgnores.includes(event.code)) {
            event.preventDefault();
        }
    }

    handleBoardFocus(event) {
        if (event.target.getAttribute('class') === 'kafatzBoard') {
            if (this.state.retPiece === null) {
                let retPiece = null;
                if (this.state.selectedPiece) {
                    retPiece = this.state.selectedPiece;
                } else {
                    const target = this.state.playerOneTurn?1:2;
                    const retRow = this.state.squares.findIndex(row => row.includes(target));
                    const retCol = this.state.squares[retRow].indexOf(target);                
                    retPiece = [retRow, retCol];
                }
                this.setState({retPiece});
            }
        }
    }

    handleBoardUnfocus() {
        this.setState({retPiece: null});
    }

    legalFor(fromCoord, squares, asText) {
        const [fromRow, fromCol] = fromCoord;
        let legalCoords = [];
        for (let i = Math.max(fromRow-2,0);i<=Math.min(fromRow+2,5);i++) {
            for (let j = Math.max(fromCol-2,0);j<=Math.min(fromCol+2,5);j++) {
                if (this.spaceDistance(fromCoord,[i,j]) === 1 && squares[i][j] === 0) {
                    if (asText) {
                        legalCoords.push(i+','+j);
                    } else {
                        legalCoords.push([i,j]);
                    }
            }
                if (this.spaceDistance(fromCoord,[i,j]) === 2 && this.manhattanDistance(fromCoord,[i,j])%2 === 0 && squares[fromRow][fromCol] !== squares[i][j]) {
                    const betweenRow = (fromRow+i)/2;
                    const betweenCol = (fromCol+j)/2;
                    if (squares[betweenRow][betweenCol] === squares[fromRow][fromCol]) {
                        if (asText) {
                            legalCoords.push(i+','+j);
                        } else {
                            legalCoords.push([i,j]);
                        }
                    }
                }
            }
        }
        return legalCoords;
    }

    spaceDistance(fromCoord, toCoord) {
        const [fromRow, fromCol] = fromCoord;
        const [toRow, toCol] = toCoord;
        return Math.max(Math.abs(fromRow-toRow),Math.abs(fromCol-toCol));
    }

    manhattanDistance(fromCoord, toCoord) {
        const [fromRow, fromCol] = fromCoord;
        const [toRow, toCol] = toCoord;
        return Math.abs(fromRow-toRow) + Math.abs(fromCol-toCol);

    }

    cpuMove(steps, best) {
        const result = this.minMaxBestMove({steps: 0, squares: this.state.squares, isMax: best==='max'}, steps, this.lowestResult(), this.highestResult());
        this.movePiece(...result.move);
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
        const {oneCount, twoCount} = this.countPieces(node.squares);
        return oneCount === 1 || twoCount === 1;
    }

    //Is passed a game node and returns a heuristic assessment of the state's favorability
    heuristic(node) {
        let positionScore = 0;
        let oneCount = 0;
        let twoCount = 0;
        node.squares.forEach((row, r) => {
            row.forEach((square, c) => {
                let positionValue = Math.min(r+1, 6-r) + Math.min(c+1, 6-c);
                if (square === 1) {
                    oneCount += 1;
                    positionScore += positionValue;
                }
                if (square === 2) {
                    twoCount += 1;
                    positionScore -= positionValue;
                }
            });
        });
        return {
            steps: node.steps,
            move: node.move,
            value: [
                (oneCount-twoCount)/(Math.max(oneCount,twoCount)-1),
                positionScore,
            ]
        };
    }

    //returns the lowest possible heuristic value
    lowestResult() {
        return {value: [-Infinity,-Infinity]};
    }

    //returns the highest possible heuristic value
    highestResult() {
        return {value: [Infinity,Infinity]};
    }

    //Takes node representing a game state and returns list of nodes representing possible next game states
    generateChildNodes(node) {
        let currentTurnPiece = [];
        for (let i = 0; i<node.squares.length; i++) {
            for (let j = 0; j<node.squares[i].length; j++) {
                if (node.squares[i][j] === (node.isMax?1:2)) {
                    currentTurnPiece.push([i,j]);
                }
            }
        }
        let childNodes = [];
        currentTurnPiece.forEach(fromCoord => {
            const movementOptions = this.legalFor(fromCoord, node.squares, false);
            childNodes.push(...movementOptions.map(toCoord => {
                return {
                    steps: node.steps+1,
                    move: [fromCoord, toCoord],
                    squares: this.squaresChange(node.squares, fromCoord, toCoord),
                    isMax: !node.isMax,
                };
            }));
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
        const a = resultA.value;
        const b = resultB.value;
        if (a&&b) {
            for (let i=0; i<Math.min(a.length,b.length);i++) {
                if (a[i] > b[i]) {
                    return 1;
                }
                if (a[i] < b[i]) {
                    return -1
                }
            }
            return 0;
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
        const velocity = this.resultCompare(exampleBest, this.heuristic({squares: this.state.squares}));
        const isStalling = (isMax && velocity < 0) || (!isMax && velocity > 0);
//        const isStalling = (isMax && this.resultSign(exampleBest) < 0) || (!isMax && this.resultSign(exampleBest) > 0);
        const leadingResults = resultsList.filter(result => this.resultCompare(result, exampleBest) === 0);
        return leadingResults.reduce((bestSoFar, current) => {
            if ((isStalling && bestSoFar.steps > current.steps) || (!isStalling && bestSoFar.steps < current.steps)) {
                return bestSoFar;
            } else {
                return current;
            }
        });
    }

    resultSign(resultA) {
        const a = resultA.value;
        for (let i=0; i<a.length; i++) {
            if (a[i] > 0) {
                return 1;
            } else if (a[i] < 0) {
                return -1;
            }
        }
        return 0;
    }

    movePiece(fromCoord, toCoord) {
        const playerOneTurn = !this.state.playerOneTurn;
        const selectedPiece = null;
		const squares = this.squaresChange(this.state.squares, fromCoord, toCoord);
        this.setState({playerOneTurn, selectedPiece, legalIds: [], squares},this.detectEndState);
    }

    squaresChange(initSquares, fromCoord, toCoord) {
        const [fromRow, fromCol] = fromCoord;
        const [toRow, toCol] = toCoord;
		const finaSquares = this.cloneArray(initSquares);
        finaSquares[toRow][toCol] = finaSquares[fromRow][fromCol];
        finaSquares[fromRow][fromCol] = 0;
        return finaSquares;
    }

    cloneArray(squares) {
        const result = Array(6).fill(null).map(() => new Array(6).fill(null));
        for (let i = 0; i<squares.length; i++) {
            for (let j = 0; j<squares[i].length; j++) {
                result[i][j] = squares[i][j];
            }
        }
        return result;
    }

    detectEndState() {
        const {oneCount, twoCount} = this.countPieces(this.state.squares);
        if (oneCount === 1) {
            this.declareEnd(2);
        } else if (twoCount === 1) {
            this.declareEnd(1);
        } else {
            this.detectCpuTurn();
        }
    }

    countPieces(squares) {
        let oneCount = 0;
        let twoCount = 0;
        squares.forEach(row => {
            row.forEach(square => {
                if (square === 1) {
                    oneCount += 1;
                }
                if (square === 2) {
                    twoCount += 1;
                }
            })
        })
        return {oneCount, twoCount};
    }

    declareEnd(winner) {
        if (this.state.gameOngoing) {
            const gameOngoing = false;
            this.setState({gameOngoing, winner});
        }
    }

    detectCpuTurn() {
        if (this.state.gameOngoing) {
            const playerOneTurn = this.state.playerOneTurn;
            if (playerOneTurn===true && this.state.cpu1!==0) {
                const timeoutId = setTimeout(() => {this.cpuMove(this.state.cpu1, 'max');}, 1000);
                this.setState({timeoutId});
            }
            if (playerOneTurn===false && this.state.cpu2!==0) {
                const timeoutId = setTimeout(() => {this.cpuMove(this.state.cpu2, 'min');}, 1000);
                this.setState({timeoutId});
            }
        }
    }

    resetGame(newCpu1, newCpu2) {
        clearTimeout(this.state.timeoutId);
        const timeoutId = null;
        const gameOngoing = true;
        const winner = null;
        const playerOneTurn = true;
        const selectedPiece = null;
        const legalIds = [];
        const retPiece = null;
        const squares = [
            [2,2,0,0,2,2],
            [2,2,0,0,2,2],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1]
        ];
        const cpu1 = newCpu1!==null?newCpu1:this.state.cpu1;
        const inputCpu1 = cpu1;
        const cpu2 = newCpu2!==null?newCpu2:this.state.cpu2;
        const inputCpu2 = cpu2;

        this.setState({gameOngoing, winner, playerOneTurn, selectedPiece, legalIds, retPiece, squares, cpu1, inputCpu1, cpu2, inputCpu2, timeoutId},this.detectCpuTurn);
    }

    handleChangeCpu1(event) {
        this.setState({inputCpu1: parseInt(event.target.value)});
    }

    displayCpu1() {
        if (this.state.inputCpu1 === 0) {
            return ' Human';
        } else {
            return ' CPU ' + this.state.inputCpu1;
        }

    }

    handleChangeCpu2(event) {
        this.setState({inputCpu2: parseInt(event.target.value)});
    }
    
    displayCpu2() {
        if (this.state.inputCpu2 === 0) {
            return ' Human';
        } else {
            return ' CPU ' + this.state.inputCpu2;
        }

    }
    
    renderSquare(rowNumber, colNumber) {
        const squid = rowNumber + ',' + colNumber;
        const value = this.state.squares[rowNumber][colNumber];
		return (
			<KafatzSquare
                squid={squid}
                row = {rowNumber}
                col = {colNumber}
                legal = {this.state.legalIds.includes(squid)}
                playersPiece = {(this.state.playerOneTurn)?value===1:value===2}
                waitersPiece = {(this.state.playerOneTurn)?value===2:value===1}
                ret = {this.state.retPiece && this.state.retPiece[0] === rowNumber && this.state.retPiece[1] === colNumber}
                cpp = {(this.state.playerOneTurn && value === 1) || (!this.state.playerOneTurn && value ===2)}
                value = {value}
                selected = {this.state.selectedPiece && rowNumber === this.state.selectedPiece[0] && colNumber === this.state.selectedPiece[1]}
                onClick = {() => this.handleClick(rowNumber, colNumber)}
            />
		);
    }

    renderRow(rowNumber, length) {
            return <div className="kafatzRow">{Array(length).fill(null).map((element, index) => this.renderSquare(rowNumber, index))}</div>;
    }

    renderBoard() {
        return <div className='kafatzBoard' id='board' tabIndex="0" onFocus={this.handleBoardFocus} onBlur={this.handleBoardUnfocus}>
            {Array(6).fill(null).map((element, index) => this.renderRow(index, 6))}
            </div>;
    }

    renderControls() {
        return <div className="kafatzSettingsPanel">
            <label className="kafatzSettingInput">
                Red:
                {this.displayCpu1()}
                <input
                    className="kafatzInputSlider"
                    type="range"
                    value={this.state.inputCpu1}
                    min="0"
                    max="5"
                    step="1"
                    onChange = {this.handleChangeCpu1}
                />
            </label>
            <label className="kafatzSettingInput">
                White:
                {this.displayCpu2()}
                <input
                    className="kafatzInputSlider"
                    type="range"
                    value={this.state.inputCpu2}
                    min="0"
                    max="5"
                    step="1"
                    onChange = {this.handleChangeCpu2}
                />
            </label>
            <button className="kafatzControlButton" onClick={() => this.resetGame(null, null)}>
                Restart
            </button>
            <button className="kafatzControlButton" onClick={() => this.resetGame(this.state.inputCpu1, this.state.inputCpu2)}>
                Save
            </button>
        </div>
    }

    renderRules() {
        return <div className="kafatzRulesBox" tabIndex='0'>
            <h2>Rules</h2>
            <p>
                Players take turns moving one of their own color pieces.  A piece can be moved one space horizontally, vertically, or diagonally to a vacant space.
            </p>
            <p>
                If the piece you are moving is adjacent to another piece of your color, you may "jump" it over the neighboring piece, moving it two spaces in that direction.
            </p>
            <p>
                In order to move one of your pieces into a space occupied by your opponent's piece, you must be moving by way of a jump.
            </p>
            <p>
                When this happens, the opponent's piece is removed from play.
            </p>
            <p>
                The game ends when one player has eliminated all but one of their oppoent's pieces, thereby preventing them from performing jumps.
            </p>
        </div>
    }

    render() {
        let headerText;
        if (this.state.gameOngoing) {
            if (this.state.playerOneTurn) {
                headerText = 'Red\'s Turn';
            } else {
                headerText = 'White\'s Turn';
            }
        } else {
            if (this.state.winner === 1) {
                headerText = 'Red Wins!';
            }
            if (this.state.winner === 2) {
                headerText = 'White Wins!';
            }
            if (this.state.winner === 0) {
                headerText = 'It\'s a draw!';
            }
        }
        return (
            <div>
                <h1 class='kf-header'>{headerText}</h1>
                {this.renderBoard()}
                {this.renderControls()}
                {this.renderRules()}
            </div>
        )
    }

    componentDidMount() {
        const board = document.getElementById('board');
        board.addEventListener('keyup', this.handleKeyUp);
        board.addEventListener('keydown', this.handleKeyDown);
        this.detectCpuTurn();
    }

    componentWillUnmount() {
        const board = document.getElementById('board');
        board.removeEventListener('keyup', this.handleKeyUp);
        board.addEventListener('keydown', this.handleKeyDown);
   }
}

export default KafatzBoard;