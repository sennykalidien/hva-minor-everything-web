Meteor.methods({
    addArt: function (object) {
        if (!Meteor.userId) {
            throw new Meteor.Error('No Access!');
        }
        
        var collectionObjects = ArtObjects.find().fetch();
        var currentObjectName = object.title;

        
        [].forEach.call(collectionObjects, function(item) { 
            var collectionObjectName = item.title;
            
            if ( currentObjectName === collectionObjectName ) {
                alert('Dit voorwerp is al eens eerder uitgelicht door jou!');
                throw new Meteor.Error('No Access!');

            }        
        });  
        
        ArtObjects.insert({
            title: object.title,
            image: object.image,
            category: object.category,
            creator: object.creator,
            createdAt: new Date(),
            userId: Meteor.userId()
        });          
    },
    removeArt: function(artID){
        ArtObjects.remove(artID);
    }    
});