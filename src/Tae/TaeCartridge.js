import React from 'react';
import './TaeCartridge.css';

class TaeCartridge extends React.Component {
    render() {
        const cartColor = this.props.gameInfo.cartColor??'aqua';
        const tabColor = this.props.gameInfo.tabColor??cartColor;
        const stickerColor = this.props.gameInfo.stickerColor??'white';
        const textColor = this.props.gameInfo.textColor??'black';
        return (<div>
            <button className={this.props.gameInfo.id===this.props.currentGame?.id?'tae-cartridge current-game':'tae-cartridge'} style={{backgroundColor: cartColor}} onClick={() => this.props.handleClick(this.props.gameInfo.id)}>
                <div className='select-reticle'/>
                <div className='tae-cartridge-tab' style={{backgroundColor: tabColor, color: tabColor}}><span>Text Adventure System</span></div>
                <div className='tae-cartridge-sticker' style={{backgroundColor: stickerColor, color:textColor}}>
                    <span>
                        {this.props.gameInfo.title}
                    </span>
                </div>
            </button>
        </div>);
    }
}

export default TaeCartridge;