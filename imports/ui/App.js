import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Task from './Task.js';

import { Tasks } from '../api/tasks.js';

class App extends Component {
    renderTasks()
    {
        return this.props.tasks.map(task => (<Task key={ task._id } task={ task } />));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                </header>
                <div>
                    <ul>{ this.renderTasks() }</ul>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {tasks: Tasks.find({}).fetch()};
})(App);