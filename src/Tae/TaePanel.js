import React from 'react';
import './TaePanel.css';

class TaePanel extends React.Component {
    constructor(props) {
        super(props);

        const searchValue = '';
        this.state = {searchValue};
        this.searchInput = this.searchInput.bind(this);
        this.searchSubmit =this.searchSubmit.bind(this);
    }

    searchInput(event) {
        this.setState({searchValue: event.target.value});
    }

    searchSubmit(event) {
        if (event.key === 'Enter') {
            const items = this.props.items??[];
            const searchItem = items.filter(item => item.requirements === undefined || item.requirements.reduce((soFar, req) => soFar && (Array.isArray(this.props.gameState[req[0]])?this.props.gameState[req[0]].includes(req[1]):this.props.gameState[req[0]] === req[1]), true)).find(item => item.label.toLowerCase() === this.state.searchValue.toLowerCase());
            if (searchItem) {
                this.props.handleClick(searchItem);
            }
        }
    }

    render() {
       if (this.props.config.display) {
           const items = this.props.items??[];
           const displayItems = items.filter(item => item.requirements === undefined || item.requirements.reduce((soFar, req) => soFar && (Array.isArray(this.props.gameState[req[0]])?this.props.gameState[req[0]].includes(req[1]):this.props.gameState[req[0]] === req[1]), true));
           let optionsInteractables = null;
           if (this.props.config.useTextbox) {
            optionsInteractables = <input className='tae-optionTextbox' type='text' placeholder={this.props.config.textboxPlaceholder} onInput={this.searchInput} onKeyUp={this.searchSubmit}/>
           } else {
            optionsInteractables = displayItems.map((item, index) => <button key={index} style={{backgroundColor: this.props.config.buttonColor, color: this.props.config.buttonTextColor}} className="tae-optionButton" onClick={() => this.props.handleClick(item)}>{item.label}</button>)
           }
           return <div className="tae-input" style={{backgroundColor: this.props.config.color, color: this.props.config.textColor}}>
                        {this.props.config.label}
                        <div className="tae-optionPanel">
                            {optionsInteractables}
                        </div>
                    </div>;

        } else {
            return null;
        }
    }
}

export default TaePanel;