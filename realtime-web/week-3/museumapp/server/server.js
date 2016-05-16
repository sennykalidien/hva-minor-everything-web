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
    searchQuery = query.split(' ').join('+');
    console.log(searchQuery);
    var self = this;
    try {
        var response = HTTP.get('http://amdata.adlibsoft.com/wwwopac.ashx?database=AMcollect&xmltype=grouped&search=title=%27'+searchQuery+'%27&limit=100&output=json');

        var data = response.data.adlibJSON.recordList.record;
        //console.log(data);

        [].forEach.call(data, function (item) {

          if((item.hasOwnProperty('reproduction') != false ) && (item.reproduction[0]['reproduction.identifier_URL'][0] != "" )) {
            var image = item.reproduction[0]['reproduction.identifier_URL'][0].split('\\').pop(); // removes last element of array
            var object = {
                title: item.title[0],
                image: image,
                category: item.object_category[0]
            };
            console.log(object);
            self.added('search_art-objects', Random.id(), object); // Random.id = Meteor package
          }
        });
        self.ready();

    } catch (error) {
        console.log(error);
    }
});
