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
        const retRow = null;
        const retCol = null;
        const squares = [
            [2,2,0,0,2,2],
            [2,2,0,0,2,2],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1]
        ]
        
        this.state = {
            gameOngoing,
            winner,
            playerOneTurn,
            selectedPiece,
            legalIds,
            retRow,
            retCol,
            squares,
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleClick(row, col) {
        if (this.state.gameOngoing) {
            if ((this.state.playerOneTurn && this.state.squares[row][col] === 1) || (!this.state.playerOneTurn && this.state.squares[row][col] === 2)) {
                if (this.state.selectedPiece !== null && this.state.selectedPiece[0]===row && this.state.selectedPiece[1]===col) {
                        //deselect
                        this.setState({selectedPiece: null, legalIds: []});

                } else {
                    //select
                    const legalIds = this.legalFor([row, col]);
                    this.setState({selectedPiece: [row, col], legalIds});
                }
                /*
                //I think the refactor above works, but I'm holding on to this for a bit, just in case.
                if (this.state.selectedPiece === null) {
                    //select
                    const legalIds = this.legalFor([row, col]);
                    this.setState({selectedPiece: [row, col], legalIds});
                } else {
                    if (this.state.selectedPiece[0]===row && this.state.selectedPiece[1]===col) {
                        //deselect
                        this.setState({selectedPiece: null, legalIds: []});
                    } else {
                        //select
                        const legalIds = this.legalFor([row, col]);
                        this.setState({selectedPiece: [row, col], legalIds});
                    }
                }*/
            } else {
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

    handleFocus(rowNumber, colNumber) {
        const retRow = rowNumber;
        const retCol = colNumber;
		this.setState({retRow, retCol});
    }

    handleKeyUp(event) {
        event.preventDefault();
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        if (this.state.retRow !== null && this.state.retCol !== null) {
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
                        this.resetGame();
                    }
                    break;
                default:
            }
            retRow = clamp(retRow, 0, 5);
            retCol = clamp(retCol, 0, 5);
            this.setState({retRow, retCol});
            document.getElementById(retRow + ',' + retCol).focus();
        }
    }

    handleKeyDown(event) {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
            event.preventDefault();
        }
    }

    legalFor(fromCoord) {
        const [fromRow, fromCol] = fromCoord;
        let legalCoords = [];
        for (let i = Math.max(fromRow-2,0);i<=Math.min(fromRow+2,5);i++) {
            for (let j = Math.max(fromCol-2,0);j<=Math.min(fromCol+2,5);j++) {
                if (this.spaceDistance(fromCoord,[i,j]) === 1 && this.state.squares[i][j] === 0) {
                    legalCoords.push(i+','+j);
                }
                if (this.spaceDistance(fromCoord,[i,j]) === 2 && this.manhattanDistance(fromCoord,[i,j])%2 === 0 && this.state.squares[fromRow][fromCol] !== this.state.squares[i][j]) {
                    const betweenRow = (fromRow+i)/2;
                    const betweenCol = (fromCol+j)/2;
                    if (this.state.squares[betweenRow][betweenCol] === this.state.squares[fromRow][fromCol]) {
                        legalCoords.push(i+','+j);
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

    movePiece(fromCoord, toCoord) {
        const [fromRow, fromCol] = fromCoord;
        const [toRow, toCol] = toCoord;
        const playerOneTurn = !this.state.playerOneTurn;
        const selectedPiece = null;
		const squares = this.state.squares.slice();
        squares[toRow][toCol] = squares[fromRow][fromCol];
        squares[fromRow][fromCol] = 0;
        this.setState({playerOneTurn, selectedPiece, legalIds: [], squares},this.detectEndState);
    }

    detectEndState() {
        let oneCount = 0;
        let twoCount = 0;
        this.state.squares.forEach(row => {
            row.forEach(square => {
                if (square === 1) {
                    oneCount += 1;
                }
                if (square === 2) {
                    twoCount += 1;
                }
            })
        })
        if (oneCount === 1) {
            this.declareEnd(2);
        }
        if (twoCount === 1) {
            this.declareEnd(1);
        }
    }

    declareEnd(winner) {
        if (this.state.gameOngoing) {
            const gameOngoing = false;
            this.setState({gameOngoing, winner});
        }
    }

    resetGame() {
        const gameOngoing = true;
        const winner = null;
        const playerOneTurn = true;
        const selectedPiece = null;
        const legalIds = [];
        const retRow = null;
        const retCol = null;
        const squares = [
            [2,2,0,0,2,2],
            [2,2,0,0,2,2],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [1,1,0,0,1,1],
            [1,1,0,0,1,1]
        ]

        this.setState({gameOngoing, winner, playerOneTurn, selectedPiece, legalIds, retRow, retCol, squares});
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
                ret = {this.state.retRow === rowNumber && this.state.retCol === colNumber}
                cpp = {(this.state.playerOneTurn && value === 1) || (!this.state.playerOneTurn && value ===2)}
                value = {value}
                selected = {this.state.selectedPiece && rowNumber === this.state.selectedPiece[0] && colNumber === this.state.selectedPiece[1]}
                onClick = {() => this.handleClick(rowNumber, colNumber)}
                onFocus = {() => this.handleFocus(rowNumber, colNumber)}
            />
		);
    }

    renderRow(rowNumber, length) {
            return <div className="kafatzRow">{Array(length).fill(null).map((element, index) => this.renderSquare(rowNumber, index))}</div>;
    }

    renderBoard() {
        return <div className='kafatzBoard'>{Array(6).fill(null).map((element, index) => this.renderRow(index, 6))}</div>;
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
                <button onClick={() => this.resetGame()}>Restart</button>
                <div className="kafatzRulesBox">
                    <h2>Rules</h2>
                    <p>
                        Players take turns moving one of their own color pieces.
                        A piece can be moved one space horizontally, vertically, or diagonally.
                        If the piece you are move is adjacent to another piece of your color, you may "jump" it over the neighboring piece, moving it two spaces in that direction.
                        When a piece is selected, the spaces to which it is able to move will be highlighted.
                        You may only move one of your pieces into a space occupied by your opponent's piece when moving it by way of a jump.
                        When this happens, the opponent's piece is removed from play.
                        The game ends when one player has eliminated all but one of their oppoent's pieces, thereby preventing them from performing jumps.
                    </p>
                </div>
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener('keyup', this.handleKeyUp);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyUp);
        document.addEventListener('keydown', this.handleKeyDown);
    }
}

export default KafatzBoard;