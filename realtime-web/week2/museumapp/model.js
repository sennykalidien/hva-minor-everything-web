/* 
    Collections 
*/
ArtObjects = new Mongo.Collection('artobjects');
ArtCategories = new Mongo.Collection('artcategories');


/* 
    Router 
*/

Router.route('/', function () {
  this.render('index');
});
      
     
/* 
    Methods 
*/         
Meteor.methods({
    addTask: function(name){
       if(!Meteor.userId){
           throw new Meteor.Error('No Access!');
       }   
       Tasks.insert({
           name: name,
           createdAt: new Date(),
           userId: Meteor.userId()
       });        
    },
    deleteTask: function(taskId){
        Tasks.remove(taskId);
    }
});           

           

