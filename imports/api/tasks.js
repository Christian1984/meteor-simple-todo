import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //TODO
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //TODO
    },
    'tasks.update'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        //TODO
    }
});