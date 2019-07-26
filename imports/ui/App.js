import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

import { Tasks } from '../api/tasks.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideCompleted: true
        }
    }

    handleSubmit(e)
    {
        e.preventDefault();

        let textInput = ReactDOM.findDOMNode(this.refs.textInput);
        let text = textInput.value.trim();

        /*Tasks.insert({
            text,
            owner: Meteor.userId(),
            username: Meteor.user().username,
            createdAt: new Date()
        });*/

        Meteor.call('tasks.insert', text);

        textInput.value = '';
    }

    toggleHideCompleted()
    {
        this.setState(
            {
                hideCompleted: !this.state.hideCompleted
            }
        );
    }

    renderTasks()
    {
        return this.props.tasks.filter(task => !this.state.hideCompleted || !task.checked).map(task => (<Task key={ task._id } task={ task } />));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({ this.props.incompleteCount })</h1>
                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={ this.state.hideCompleted }
                            onClick={ this.toggleHideCompleted.bind(this) }
                        />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    { this.props.currentUser ? 
                        <form className="new-task" onSubmit={ this.handleSubmit.bind(this) }>
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new task..."
                            />
                        </form> : ''
                    }
                </header>
                <div>
                    <ul>{ this.renderTasks() }</ul>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: {$ne: true} }).count(),
        currentUser: Meteor.user()
    };
})(App);