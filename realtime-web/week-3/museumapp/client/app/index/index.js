import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './index.html';


Template.homeTemplate.onCreated(function() {
    // Subscribe only the relevant subscription to this page
    var self = this;
    self.autorun(function() { // Stops all current subscriptions
        self.subscribe('featuredArtObjects'); // Subscribe to the single entry in the collection with the route params id
    });
});


Template.homeTemplate.helpers({
    featured: function () {
        return ArtObjects.find({}, {sort: {createdAt: -1}});
    }
});
