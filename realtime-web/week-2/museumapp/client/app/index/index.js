import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './index.html';


Template.homeTemplate.helpers({
    featured: function () {
        return ArtObjects.find({}, {sort: {createdAt: -1}});
    }
});
