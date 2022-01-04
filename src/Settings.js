import React from 'react';

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

    render() {
        return (
            <div>
                <label>
                    Size:
                    <input
                        type="number"
                        value={this.state.boardSize}
                        min="5"
                        max="11"
                        step="2"
                        onChange = {this.handleChangeBoardSize}
                    />
                </label>
                <label>
                    Red CPU:
                    <input
                        type="number"
                        value={this.state.cpu1}
                        min="0"
                        max="5"
                        step="1"
                        onChange = {this.handleChangeCpu1}
                    />
                </label>
                <label>
                    Yellow CPU:
                    <input
                    type="number"
                    value={this.state.cpu2}
                    min="0"
                    max="5"
                    step="1"
                    onChange = {this.handleChangeCpu2}
                    />
                </label>
                <button
                    onClick={this.handleSubmit}
                >Save</button>
            </div>
        );

    }
}

export default Settings;