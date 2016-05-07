import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './art-object.html';


// Template onCreated
Template.artObjectTemplate.onCreated(function() {
    // Subscribe only the relevant subscription to this page
    var self = this;
    self.autorun(function() { // Stops all current subscriptions
        var id = FlowRouter.getParam('id'); // Get the collection id from the route parameter
        self.subscribe('featuredArtObjects', id); // Subscribe to the single entry in the collection with the route params id
    });
});

// Template helper functions
Template.artObjectTemplate.helpers({
    artObject: function() {
        // Get the single entry from the collection with the route params id
        var id = FlowRouter.getParam('id');
        var post = ArtObjects.findOne({_id: id}) || {};
        return post;
    }
});
