import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.subscribe('tasks');

Template.tasks.helpers({
    tasks: function(){
        return Tasks.find({}, {sort: {createdAt: -1}});
    }
});


Template.tasks.events({
    "submit .add-task": function (events) {
        var name = event.target.name.value;
        //console.log(name);

        Meteor.call('addTask', name); // name = passed to the methods as parameter

        event.target.name.value = '';

        return false;
    },
    "click .delete-task" : function(event){
        if(confirm('Delete Task?')){
            Meteor.call('deleteTask', this._id); // this._id = passed to the methods as parameter
        }
        return false;
    }
    
});
