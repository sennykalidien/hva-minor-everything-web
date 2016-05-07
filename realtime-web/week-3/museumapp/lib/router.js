FlowRouter.route( '/', {
    name: 'index',
    // subscriptions: function (params, queryParams) {
    //   this.register('index', Meteor.subscribe('featuredArtObjects'))
    // },
    action: function() {
        BlazeLayout.render( 'homeLayout', {
            header: 'headerTemplate',
            main: 'homeTemplate',
            footer: 'footerTemplate'
        });
        console.log( "Okay, we're on the Home page!" );
    }
});

FlowRouter.route( '/art-objects', {
    name: 'artObjects',
    action: function() {
        BlazeLayout.render( 'artObjectsLayout', {
            header: 'headerTemplate',
            main: 'artObjectsTemplate',
            footer: 'footerTemplate'
        });
        console.log( "Okay, we're on the ArtObjects page!" );
    }
});

FlowRouter.route( '/my-collection', {
    name: 'myCollection',
    action: function() {
        BlazeLayout.render( 'myCollectionLayout', {
            header: 'headerTemplate',
            main: 'myCollectionTemplate',
            footer: 'footerTemplate'
        });
        console.log( "Okay, we're on the My Collection page!" );
    }
});

FlowRouter.route( '/art-object/:id', {
    name: 'ArtObject',
    action: function(params, queryParams) {
        BlazeLayout.render( 'artObjectLayout', {
            header: 'headerTemplate',
            main: 'artObjectTemplate',
            footer: 'footerTemplate'
        });
        console.log( "Okay, we're on the ArtObject page!" );
    }
});
