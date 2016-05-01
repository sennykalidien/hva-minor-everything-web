import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
    Meteor.publish('featuredArtObjects', function(){
       return ArtObjects.find();
    });

    Meteor.publish('myArtObjects', function(){
       return ArtObjects.find({userId: this.userId});
    });
});

Meteor.publish('artSearch', function (query) {
    var self = this;
    try {
        var response = HTTP.get('http://amdata.adlibsoft.com/wwwopac.ashx?database=AMcollect&xmltype=grouped&search=title=' + query + '&limit=25&output=json');

        var data = response.data.adlibJSON.recordList.record;
        //console.log(data);

        [].forEach.call(data, function (item) {

          if(item.hasOwnProperty('reproduction') != false) {
            var object = {
                title: item.title[0],
                image: item.reproduction[0]['reproduction.reference'][0] ,
                category: item.object_category[0],
                creator: item.maker.creator
            };

            console.log(object);

            self.added('search_art-objects', Random.id(), object);

          }

        });

        self.ready();

    } catch (error) {
        console.log(error);
    }
});
