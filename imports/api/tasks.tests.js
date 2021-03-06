/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';

import { Tasks } from './tasks.js';
 
if (Meteor.isServer) {
    describe('Tasks', () => {
        describe('methods', () => {
            //setup db before testing
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove();
                taskId = Tasks.insert({
                    text: 'testTask',
                    owner: userId,
                    createdAt: Date.now(),
                    username: 'testuser',
                    isPrivate: false
                });
            });

            //run test
            it('can delete owned task', () => {
                // Find the internal implementation of the task method so we can
                // test it in isolation
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];
        
                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };
        
                // Run the method with `this` set to the fake invocation
                deleteTask.apply(invocation, [taskId]);
        
                // Verify that the method does what we expected
                assert.equal(Tasks.find().count(), 0);
            });
        });
    });
}
