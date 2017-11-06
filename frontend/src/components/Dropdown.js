import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this)
        this.state = {
            active: false
        }
    };

    toggle() {
        let activeState = !this.state.active;
        this.setState({
            active: activeState
        });
    }

    render() {
        let content;
        if (this.state.active) {
            content = this.props.content
        } else {
            content = "";
        }
        return (
            <div id="content">
                <button class="menu-item" onClick={this.toggle}>{this.props.name}</button>
                {content}
            </div>
        )
    }
}

export default Dropdown;