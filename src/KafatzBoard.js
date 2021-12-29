import React from 'react';
import KafatzSquare from './KafatzSquare';
import './KafatzBoard.css';

class KafatzBoard extends React.Component {
    constructor(props) {
        super(props);
        const gameOngoing = true;
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
                const legalIds = this.legalFor([row, col]);
                this.setState({selectedPiece: [row, col], legalIds});
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
//                        this.resetGame(null, null, null, null);
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
        this.setState({playerOneTurn, selectedPiece, squares})
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
        return (
            <div>
                <span>This game is under development and it has been deployed because I do what I want and no one is going to see this page right now anyway.</span>
                {this.renderBoard()}
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