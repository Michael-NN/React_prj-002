import './KafatzSquare.css';

function KafatzSquare(props) {
    let buttonClass = 'kafatzButton'
    let gamePieceClass = 'gamePiece';
    if (props.legal) {
        if (props.waitersPiece) {
            buttonClass += " threatened";
        } else {
            buttonClass += " selected";
        }
    }
    if (props.ret) {
        buttonClass += ' kafatzRet';
    }
    if (props.value===1) {
        gamePieceClass += " playerOnePiece"
    }
    if (props.value===2) {
        gamePieceClass += " playerTwoPiece"
    }
    if (props.selected) {
        gamePieceClass += " selected"
    }
    let tabIndex = -1;
    /*
    if (props.cpp || props.legal) {
        tabIndex = 0;
    }*/
    return (
        <div className="kafatzSquare">
            <button id={props.squid}
                    className={buttonClass}
                    tabIndex={tabIndex}
                    onClick={props.onClick}
                    >
                <div className={gamePieceClass}>
                </div>
            </button>
        </div>
    )
}

export default KafatzSquare;