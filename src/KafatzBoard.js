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
        const result = this.minMaxBestMove(this.state.squares, steps, [-Infinity-Infinity], [Infinity,Infinity], best);
        this.movePiece(...result.moveCoords);
    }

    minMaxBestMove(squares, steps, alph, beta, best) {
        const {oneCount, twoCount} = this.countPieces(squares);
        if (oneCount === 1) {
            return {value: [-1,0]};
        } else if (twoCount === 1) {
            return {value: [1,0]};
        } else if (steps === 0) {
            return {value: this.heuristic(squares)};
        } else {
            let value = best==='max'?[-Infinity-Infinity]:[Infinity,Infinity];

            let currentTurnPiece = [];
            for (let i = 0; i<squares.length; i++) {
                for (let j = 0; j<squares[i].length; j++) {
                    if (squares[i][j] === (best==='max'?1:2)) {
                        currentTurnPiece.push([i,j]);
                    }
                }
            }
            let movesList = [];
            currentTurnPiece.forEach(fromCoord => {
                const movementOptions = this.legalFor(fromCoord, squares, false);
                movesList.push(...movementOptions.map(toCoord => [fromCoord, toCoord]));
            });
            movesList = this.shuffleArray(movesList);

            let resultsList = [];
            for(let moveCoords of movesList) {
                const newSquares = this.squaresChange(squares, moveCoords[0], moveCoords[1]);
                const curResult = this.minMaxBestMove(newSquares, steps-1, alph, beta, best==='max'?'min':'max');
                if (!curResult) {
                    continue;
                }
                const curValue = curResult.value;
                if (best==='max') {
                    value = this.listMax(value, curValue);
                    if (value >= beta) {
                        return {moveCoords, value};
                    }
                    alph = this.listMax(alph, value);
                } else {
                    value = this.listMin(value, curValue);
                    if (value <= alph) {
                        return {moveCoords, value};
                    }
                    beta = this.listMin(beta, value);
                }
                resultsList.push({moveCoords, value: curValue});
            }

            return resultsList.reduce((bestSoFar, current) => {
                if ((best==='max' && this.listCompare(bestSoFar.value,current.value)===1)||(best!=='max' && this.listCompare(bestSoFar.value,current.value)===-1)) {
                    return bestSoFar;
                } else {
                    return current;
                }
            });
            /*
            const valueList = resultsList.map(element => element?element.value:null);
            const bestValue = best==='max'?Math.max(...valueList.filter(element => element!==null)):Math.min(...valueList.filter(element => element!==null));
            return resultsList.find(result => result.value === bestValue);
            */
        }
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

    heuristic(squares) {
        let positionScore = 0;
        let oneCount = 0;
        let twoCount = 0;
        squares.forEach((row, r) => {
            row.forEach((square, c) => {
//                let positionValue = Math.min(r+1, 6-r, c+1, 6-c);
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
        return [
            (oneCount-twoCount)/(Math.max(oneCount,twoCount)-1),
            positionScore
        ];
    }

    listCompare(a, b) {
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
            if (a) {
                return a;
            } else if (b) {
                return b;
            } else {
                return null;
            }
        }
    }

    listMax(a, b) {
        if (this.listCompare(a,b)===1) {
            return a;
        } else {
            return b;
        }
    }

    listMin(a, b) {
        if (this.listCompare(a,b)===-1) {
            return a;
        } else {
            return b;
        }
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
//                this.cpuMove(this.state.cpu1, 'max');
                const timeoutId = setTimeout(() => {this.cpuMove(this.state.cpu1, 'max');}, 1000);
                this.setState({timeoutId});
            }
            if (playerOneTurn===false && this.state.cpu2!==0) {
//                this.cpuMove(this.state.cpu2, 'min');
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
            <p>Note: CPU code still in development and may not make logical moves</p>
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
            <label className="settingInput">
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
                <h1>{headerText}</h1>
                {this.renderBoard()}
                {this.renderControls()}
                <div className="kafatzRulesBox" tabIndex='0'>
                    <h2>Rules</h2>
                    <p>
                        Players take turns moving one of their own color pieces.
                    </p>
                    <p>
                        A piece can be moved one space horizontally, vertically, or diagonally.
                    </p>
                    <p>
                        If the piece you are moving is adjacent to another piece of your color, you may "jump" it over the neighboring piece, moving it two spaces in that direction.
                    </p>
                    <p>
                        You may only move one of your pieces into a space occupied by your opponent's piece when moving by way of a jump.
                    </p>
                    <p>
                        When this happens, the opponent's piece is removed from play.
                    </p>
                    <p>
                        The game ends when one player has eliminated all but one of their oppoent's pieces, thereby preventing them from performing jumps.
                    </p>
                </div>
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