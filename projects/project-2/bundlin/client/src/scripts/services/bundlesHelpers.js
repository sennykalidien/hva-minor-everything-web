app.factory('BundlesHelpers', function(){
    var BundlesHelpers = {};

    BundlesHelpers.markCollected = function markCollected (user, bundles) {
        return _.map(bundles, function (bundle) {
            // mark as collected
            bundle.collectedByCurrentUser = user.collected_bundles.indexOf(bundle._id) > -1 ? true : false;
            return bundle;
        });
        
    };

    BundlesHelpers.markUnpublishedByCurrentUser = function markCollected (bundles) {
        return _.map(bundles, function (bundle) {
            // mark as unpublished
            bundle.unpublishedByCurrentUser = bundle.published ? false : true;
            return bundle;
        });
        
    };

    BundlesHelpers.markAllUnpublishedByCurrentUser = function markCollected (bundles) {
        return _.map(bundles, function (bundle) {
            // mark as unpublished
            bundle.unpublishedByCurrentUser = true;
            return bundle;
        });
        
    };

    BundlesHelpers.setLoadIndex = function markCollected (bundles) {
        return _.map(bundles, function (bundle, index) {
            // set a load index
            bundle.loadIndex = index;
            return bundle;
        });
        
    };

    return BundlesHelpers;
});