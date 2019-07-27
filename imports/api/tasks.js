import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

//publish db to clients (after removing autopublish)
if (Meteor.isServer) {
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

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //seems to work fine as well
        let newTask = {
            text,
            owner: Meteor.userId(),
            username: Meteor.user().username,
            isPrivate: true,
            createdAt: new Date()
        };

        Tasks.insert(newTask);
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
    },
    'tasks.update'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { 
            $set: { checked: setChecked }
        });
    },
    'tasks.togglePrivate'(taskId, setPrivate) {
        check(taskId, String);
        check(setPrivate, Boolean);

        //TODO: throw if not owned by user
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { 
            $set: { isPrivate: setPrivate }
        });
    }
});