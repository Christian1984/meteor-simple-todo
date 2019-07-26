# What is this?

This todo-list project is me refreshing my Meteor skills by loosely following along Meteor's todo list tutorial... (https://www.meteor.com/tutorials/react/creating-an-app)

# Notes

## Create New Meteor Project with React

- Initialize a new Meteor project with `meteor create <name>`
- Start the server by cd'ing into the directory and call `meteor`
- Install React packages with `meteor npm install --save react react-dom`
- Remove Meteor's template engine with `meteor remove blaze-html-templates`
- Add the static html package with `meteor add static-html`
- Replace starter code so that all references to Meteor's template engine is gone
- To use mongo-db-data with react, call `meteor add react-meteor-data`
- Start coding :-)

## Run as iOS App

- Run `meteor install-sdk ios`
- Run `meteor add-platform ios`
- Run `meteor run ios`
- If you encounter errors, follow `https://stackoverflow.com/a/17980786`
- If you still get errors, run `meteor reset` and try again

## Security

### Run CRUD-Operations Securely

- When done with initial prototyping, remove package `insecure` with `meteor remove insecure`
- Use `Meteor.methods()` to define methods that the client can call via `Meteor.call()` to modify the db savely.

### Limit Clients' Access to the Database

- To prevent meteor from publishing ALL data in the database to ALL clients, autopublish must be turned off. Do this with `meteor remove autopublish`
- Use `Meteor.publish()`on the server and `Meteor.subscribe()`on the client to limit clients' access to just the data they actually need to have access to.

