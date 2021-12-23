import React from 'react';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        const rowCount = props.rowCount;
        const colCount = props.colCount;
        const cpu1 = props.cpu1;
        const cpu2 = props.cpu2;
        this.state = {
            rowCount,
            colCount,
            cpu1,
            cpu2
        }

        this.handleChangeRowCount = this.handleChangeRowCount.bind(this);
        this.handleChangeColCount = this.handleChangeColCount.bind(this);
        this.handleChangeCpu1 = this.handleChangeCpu1.bind(this);
        this.handleChangeCpu2 = this.handleChangeCpu2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeRowCount(event) {
        this.setState({rowCount: parseInt(event.target.value)});
    }

    handleChangeColCount(event) {
        this.setState({colCount: parseInt(event.target.value)});
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
                    Rows:
                    <input
                        type="number"
                        value={this.state.rowCount}
                        min="3"
                        max="9"
                        step="2"
                        onChange = {this.handleChangeRowCount}
                    />
                </label>
                <label>
                    Columns:
                    <input
                        type="number"
                        value={this.state.colCount}
                        min="3"
                        max="9"
                        step="2"
                        onChange = {this.handleChangeColCount}
                    />
                </label>
                <label>
                    CPU 1:
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
                    CPU 2:
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