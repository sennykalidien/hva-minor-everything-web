import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './art-objects.html';

SearchArtObjects = new Mongo.Collection('search_art-objects');

Session.setDefault('searching', false);

Tracker.autorun(function () {
    if (Session.get('query')) {
        var searchHandle = Meteor.subscribe('artSearch', Session.get('query'));
        Session.set('searching', !searchHandle.ready());
    }
});

// Events
Template.artObjectsTemplate.events({
    'submit .search-art': function (event) {
        event.preventDefault();
        var query = event.target.search.value;
        console.log(query);
        if (query) {
            Session.set('query', query);
            event.target.search.value = '';
        }
    },
    "click .add-art" : function(event, template){
        // Prevent form from refeshing page by removing default behaviour
        event.preventDefault();
        var object = this;
        if(confirm('Dit voorwerp uitlichten?')){
            Meteor.call('addArt', object); // this._id = passed to the methods as parameter
        }
        return false;
    }
});

// When Template is created.
// src: https://stackoverflow.com/questions/34583383/meteor-flow-router-setting-up-site-com-singlepostpage
Template.artObjectsTemplate.onCreated(function() {
    // Subscribe only the relevant subscription to this page
    var self = this;
    self.autorun(function() { // Stops all current subscriptions
        self.subscribe('myArtObjects'); // Subscribe to the single entry in the collection with the route params id
    });
});

// Helpers
Template.artObjectsTemplate.helpers({
    artObjects: function () {
        return SearchArtObjects.find();
    },
    searching: function () {
        return Session.get('searching');
    }
});
