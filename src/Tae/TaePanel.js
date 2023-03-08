import React from 'react';
import './TaePanel.css';

class TaePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: props.config,
        };
    }

    render() {
       if (this.state.config.display) {
           const items = this.props.items?this.props.items:[];
            return <div className="tae-input" style={{backgroundColor: this.state.config.color}}>
                        <div className="tae-optionPanel" tabIndex="0">
                            {items.map(item => <button className="tae-optionButton" onClick={() => this.props.handleClick(item.id)}>{item.label}</button>)}
                        </div>
                        {this.state.config.label}
                    </div>;

        } else {
            return null;
        }
    }
}

export default TaePanel;