import React from 'react';
import './TaeModal.css';

class TaeModal extends React.Component {
    render() {
        const info = this.props.info;
        const config = this.props.config;
        const closeLabel = info.closeLabel ?? config.closeLabel;
        const takeLabel = info.takeLabel ?? config.takeLabel;
        const color = info.color ?? config.color;
        const windowColor = info.windowColor ?? config.windowColor;
        const textColor = info.textColor ?? config.textColor;
        const buttonColor = info.buttonColor ?? config.buttonColor;
        const buttonTextColor = info.buttonTextColor ?? config.buttonTextColor;
        const displayItems = info.items?.filter(item => !this.props.gameState.inventory.includes(item.id));
        let takeButton = null;
        let displayText = info.desc;
        if (displayItems?.length > 0) {
            takeButton = (
                <button className='tae-modalButton' style={{backgroundColor: buttonColor, color: buttonTextColor}} onClick={() => this.props.takeButton(info.items)}>
                    {takeLabel}
                </button>    
            )
            if (info.descWithItems) {
                displayText = info.descWithItems;
            }
        }
        if (info) {
            return (
                <div className='taeModal' style={{backgroundColor: color}}>
                    <div className='tae-modalText' style={{backgroundColor: windowColor, color: textColor}}>
                        {displayText}
                    </div>
                    <button className='tae-modalButton' style={{backgroundColor: buttonColor, color: buttonTextColor}} onClick={this.props.closeButton}>
                        {closeLabel}
                    </button>
                    {takeButton}
                </div>
            );    
        } else {
            return null;
        }
    }
}

export default TaeModal;