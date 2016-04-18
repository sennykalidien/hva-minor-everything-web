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


Template.artObjectsTemplate.helpers({
    artObjects: function () {
        return SearchArtObjects.find();
    },
    searching: function () {
        return Session.get('searching');
    }
});
