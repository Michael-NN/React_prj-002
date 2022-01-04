import './Square.css';

function Square (props) {
    let buttonClass = 'button';
    let gamePieceClass = 'gamePiece';
    switch(props.colCount) {
        case 5:
            buttonClass += ' cols-5'
            break;
        case 7:
            buttonClass += ' cols-7'
            break;
        case 9:
            buttonClass += ' cols-9'
            break;
        case 11:
            buttonClass += ' cols-11'
            break;
        default:
            buttonClass += ''
    }
    let tabIndex = -1;
    if (props.ret) {
        buttonClass += ' ret';
    }
    if (props.adj && props.value !== 'X') {
        buttonClass += ' legal';
        tabIndex = 0;
    }
    if (props.goal === 'G1') {
        buttonClass += ' red'
    }
    if (props.goal === 'G2') {
        buttonClass += ' yellow'
    }
    switch(props.value) {
        case '1':
            gamePieceClass += ' red'
            break;
        case '2':
            gamePieceClass += ' yellow'
            break;
        case 'X':
            buttonClass += ' fallen'
            break;
        default:
            buttonClass += ''
    }
    return (
        <button
            id = {props.squid}
            className={buttonClass}
            tabIndex = {tabIndex}
            onClick={props.onClick}
            onFocus={props.onFocus}
        >
            <div className={gamePieceClass}>
            </div>
        </button>
    );
}

export default Square;