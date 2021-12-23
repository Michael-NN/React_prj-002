import './Square.css';

function Square (props) {
    let className = 'button';
    let tabIndex = -1;
    if (props.ret) {
        className += ' ret';
    }
    if (props.adj && props.value !== 'X') {
        className += ' legal';
        tabIndex = 0;
    }
    if (props.goal === 'G1') {
        className += ' goalOne'
    }
    if (props.goal === 'G2') {
        className += ' goalTwo'
    }
    switch(props.value) {
        case '1':
            className += ' current one'
            break;
        case '2':
            className += ' current two'
            break;
        case 'X':
            className += ' fallen'
            break;
        default:
            className += ''
    }
    return (
        <button
            id = {props.squid}
            className={className}
            tabIndex = {tabIndex}
            onClick={props.onClick}
            onFocus={props.onFocus}
        >
        </button>
    );
}

export default Square;