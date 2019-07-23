import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Task from './Task.js';

import { Tasks } from '../api/tasks.js';

class App extends Component {
    handleSubmit(e)
    {
        e.preventDefault();

        let textInput = ReactDOM.findDOMNode(this.refs.textInput);
        let text = textInput.value.trim();

        Tasks.insert({
            text,
            createdAt: new Date()
        });

        textInput.value = '';
    }

    renderTasks()
    {
        return this.props.tasks.map(task => (<Task key={ task._id } task={ task } />));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                    <form className="new-task" onSubmit={ this.handleSubmit.bind(this) }>
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new task..."
                        />
                    </form>
                </header>
                <div>
                    <ul>{ this.renderTasks() }</ul>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()};
})(App);