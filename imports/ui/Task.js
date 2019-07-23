import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';

export default class Task extends Component {
    deleteItem() {
        Tasks.remove(this.props.task._id);
    }

    render() {
        return (
            <li>
                <button className="delete" onClick={ this.deleteItem.bind(this) }>&times;</button>
                <span>{ this.props.task.text }</span>
            </li>
        );
    }
}