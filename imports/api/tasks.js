import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

//TODO: use either this.userId or Meteor.userId(), but don't mix

//publish db to clients (after removing autopublish)
if (Meteor.isServer) {
    //publish only tasks that are either not private OR that are used by the logged in user
    Meteor.publish('tasks', () => Tasks.find({ 
        $or: [
            { isPrivate: { $ne: true } },
            { owner: Meteor.userId() }
        ]
    }));
}

//methods for CRUD operations
Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        //only logged in users may create tasks
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let newTask = {
            text,
            owner: this.userId,
            username: Meteor.user().username, //may fail during tests
            //username: Meteor.users.findOne(this.userId).username, //from tutorial
            isPrivate: true,
            createdAt: new Date()
        };

        Tasks.insert(newTask);
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        let task = Tasks.findOne(taskId);

        //a task should only be removed by the owner
        if (task.owner != this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
    },
    'tasks.update'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        let task = Tasks.findOne(taskId);

        //private tasks may only be updated by owners, other tasks only by logged in users
        if (!this.userId || (task.owner != this.userId && task.isPrivate)) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { 
            $set: { checked: setChecked }
        });
    },
    'tasks.togglePrivate'(taskId, setPrivate) {
        check(taskId, String);
        check(setPrivate, Boolean);

        let task = Tasks.findOne(taskId);

        if (task.owner != this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { 
            $set: { isPrivate: setPrivate }
        });
    }
});