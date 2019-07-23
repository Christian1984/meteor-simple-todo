import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';

export default class Task extends Component {
    deleteItem() {
        Tasks.remove(this.props.task._id);
    }

    toggleCheckbox(e) {
        Tasks.update(this.props.task._id, { 
            $set: { checked: !this.props.task.checked }
        });
    }

    render() {
        let checked = !!this.props.task.checked;

        return (
            <li className={ checked ? "checked" : "" }>
                <button className="delete" onClick={ this.deleteItem.bind(this) }>&times;</button>
                <input 
                    type="checkbox"
                    readOnly
                    checked={ !!this.props.task.checked }
                    onClick={ this.toggleCheckbox.bind(this) }
                />
                <span className="text">{ this.props.task.text } <i>({ this.props.task.username })</i></span>
            </li>
        );
    }
}