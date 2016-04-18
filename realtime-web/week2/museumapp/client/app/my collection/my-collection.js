import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './my-collection.html';


Template.myCollectionTemplate.events({
    "click .remove-art" : function(event, template){
        // Subscribe user to add object to collection
        //Meteor.subscribe('myArtObjects');

        // Prevent form from refeshing page by removing default behaviour
        event.preventDefault();
        var object = this;
        if(confirm('Dit voorwerp verwijderen?')){
            Meteor.call('removeArt', this._id); // this._id = passed to the methods as parameter
        }
        return false;
    }
});


Template.myCollectionTemplate.helpers({
    myCollection: function () {
        return ArtObjects.find({}, {sort: {createdAt: -1}});
    }
});
