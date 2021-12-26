import React from 'react';
import KafatzSquare from './KafatzSquare';

class KafatzBoard extends React.Component {
    renderSquare(rowNumber, colNumber) {
		return (
			<KafatzSquare
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
}

export default KafatzBoard;