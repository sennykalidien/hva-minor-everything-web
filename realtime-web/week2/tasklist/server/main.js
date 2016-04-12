import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Meteor.publish('tasks', function(){
       return Tasks.find({userId: this.userId}); 
    });
});
