import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';
import { Meteor } from 'meteor/meteor';

export default class Task extends Component {
    deleteItem() {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    toggleCheckbox(e) {
        Meteor.call('tasks.update', this.props.task._id, !this.props.task.checked);
    }

    render() {
        let checked = !!this.props.task.checked;

        return (
            <li className={ checked ? "checked" : "" }>
                <button className="delete" onClick={ this.deleteItem.bind(this) }>&times;</button>
                <input 
                    type="checkbox"
                    readOnly
                    checked={ checked }
                    onClick={ this.toggleCheckbox.bind(this) }
                />
                <span className="text">{ this.props.task.text } <i>({ this.props.task.username })</i></span>
            </li>
        );
    }
}