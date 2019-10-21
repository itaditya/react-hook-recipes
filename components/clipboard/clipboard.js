import clipboardStyle from './clipboard.module.css';
import { Component } from "react";

class Clipboard extends Component {
    constructor(props){
        super(props);
    }
    copyToClipboard = str => {
        const temp = document.createElement('textarea');
        temp.value = str;
        temp.setAttribute('readonly', '');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;                                    // Mark as false to know no selection existed before
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        if (selected) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(selected);
        }
    };
    handleClick = e => {
        this.copyToClipboard(e.target.parentNode.querySelector('code').textContent);
    };
    render() {
        return (
            <a onClick={this.handleClick} className={clipboardStyle.clipboardButton} />
        )
    }
}

export default Clipboard;