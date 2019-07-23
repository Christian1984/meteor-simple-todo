import React, { Component } from 'react';

export default class App extends Component {
    getTasks()
    {
        return [
            { _id: 1, text: 'This is Task 1'},
            { _id: 2, text: 'This is Task 2'},
            { _id: 3, text: 'This is Task 3'}
        ];
    }

    renderTasks()
    {
        return this.getTasks().map(task => (<li key={ task._id }>{ task.text }</li>));
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