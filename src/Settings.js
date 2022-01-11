import React from 'react';
import './Settings.css';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        const boardSize = props.boardSize;
        const cpu1 = props.cpu1;
        const cpu2 = props.cpu2;
        this.state = {
            boardSize,
            cpu1,
            cpu2
        }

        this.handleChangeBoardSize = this.handleChangeBoardSize.bind(this);
        this.handleChangeCpu1 = this.handleChangeCpu1.bind(this);
        this.handleChangeCpu2 = this.handleChangeCpu2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleChangeBoardSize(event) {
        this.setState({boardSize: parseInt(event.target.value)});
    }

    handleChangeCpu1(event) {
        this.setState({cpu1: parseInt(event.target.value)});
    }

    handleChangeCpu2(event) {
        this.setState({cpu2: parseInt(event.target.value)});
    }

    handleSubmit(event) {
        this.props.handleSubmit(this.state);
    }

    handleReset(event) {
        const boardSize = this.props.boardSize;
        const cpu1 = this.props.cpu1;
        const cpu2 = this.props.cpu2;
        this.setState({boardSize, cpu1, cpu2});
        this.props.handleReset(null, null, null);
    }

    displayBoardSize() {
        return ' ' + this.state.boardSize;
    }

    displayCpu1() {
        if (this.state.cpu1 === 0) {
            return ' Human';
        } else {
            return ' CPU ' + this.state.cpu1;
        }
        /*
        switch (this.state.cpu1) {
            case 0:
                return ' Human';
            case 2:
                return ' Easy';
            case 4:
                return ' Medium';
            case 6:
                return ' Hard';
            case 8:
                return ' Expert';
            default:
                return '???';
        }*/
    }

    displayCpu2() {
        if (this.state.cpu2 === 0) {
            return ' Human';
        } else {
            return ' CPU ' + this.state.cpu2;
        }
        /*
        switch (this.state.cpu2) {
            case 0:
                return ' Human';
            case 2:
                return ' Easy';
            case 4:
                return ' Medium';
            case 6:
                return ' Hard';
            case 8:
                return ' Expert';
            default:
                return '???';
        }*/
    }

    render() {
        return (
            <div className="settingsPanel">
                <label className="settingInput">
                    Size:
                    {this.displayBoardSize()}
                    <input
                        className="inputSlider"
                        type="range"
                        value={this.state.boardSize}
                        min="5"
                        max="11"
                        step="2"
                        onChange = {this.handleChangeBoardSize}
                    />
                </label>
                <label className="settingInput">
                    Red:
                    {this.displayCpu1()}
                    <input
                        className="inputSlider"
                        type="range"
                        value={this.state.cpu1}
                        min="0"
                        max="5"
                        step="1"
                        onChange = {this.handleChangeCpu1}
                    />
                </label>
                <label className="settingInput">
                    Yellow:
                    {this.displayCpu2()}
                    <input
                        className="inputSlider"
                        type="range"
                        value={this.state.cpu2}
                        min="0"
                        max="5"
                        step="1"
                        onChange = {this.handleChangeCpu2}
                    />
                </label>
                <button
                    className="controlButton"
                    onClick={this.handleReset}
                >Restart</button>
                <button
                    className="controlButton"
                    onClick={this.handleSubmit}
                >Save</button>
            </div>
        );

    }
}

export default Settings;