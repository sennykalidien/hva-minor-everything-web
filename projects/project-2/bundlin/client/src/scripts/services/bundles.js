app.factory('Bundles', function($q, Restangular, BundlesHelpers, Auth) {
    var Bundles = {};

    var bundlesBase = Restangular.all('bundles');
    var userBundlesBase = function(username){
        return Restangular.one('users', username);
    }
    var BUNDLE_LOAD_LIMIT = 10;

    Bundles.getLatestBundles = function getLatestBundles(page){
        var defer = $q.defer();

        bundlesBase.getList({page: page, limit: BUNDLE_LOAD_LIMIT}).then(function(response) {

            Auth.user().then(function(user){

                var bundles = BundlesHelpers.markCollected(user, response.data),
                    bundlesWithLoadIndex = BundlesHelpers.setLoadIndex(bundles);

                defer.resolve(bundlesWithLoadIndex);
            });

        }, function(error){
            defer.reject(error);
        });

        return defer.promise;
    };

    Bundles.getFeaturedPopularBundles = function getFeaturedPopularBundles(page) {
        var defer = $q.defer();
        page = page || 1;
        bundlesBase.all('featured_popular').getList({page: page, limit: BUNDLE_LOAD_LIMIT}).then(function(response) {
            defer.resolve(response.data);
        }, function(error){
            defer.reject(error);
        });

        return defer.promise;
    }

    Bundles.getPopularBundles = function getPopularBundles(page){
        var defer = $q.defer();
        bundlesBase.all('popular').getList({page: page, limit: BUNDLE_LOAD_LIMIT}).then(function(response) {

            Auth.user().then(function(user){

                var bundles = BundlesHelpers.markCollected(user, response.data),
                    bundlesWithLoadIndex = BundlesHelpers.setLoadIndex(bundles);

                defer.resolve(bundlesWithLoadIndex);
            });
        }, function(error){
            defer.reject(error);
        });

        return defer.promise;
    }

    Bundles.getFollowerBundles = function getFollowerBundles(page){
        var defer = $q.defer();
        bundlesBase.all('following').getList({page: page, limit: BUNDLE_LOAD_LIMIT}).then(function(response) {

            Auth.user().then(function(user){

                var bundles = BundlesHelpers.markCollected(user, response.data),
                    bundlesWithLoadIndex = BundlesHelpers.setLoadIndex(bundles);

                defer.resolve(bundlesWithLoadIndex);
            });
        }, function(error){
            defer.reject(error);
        });

        return defer.promise;
    }
    
    Bundles.getUserBundles = function getUserBundles(username, page){
        var defer = $q.defer();
        userBundlesBase(username).getList('bundles', {page: page, limit: BUNDLE_LOAD_LIMIT}).then(function(response) {
            var bundles = BundlesHelpers.markUnpublishedByCurrentUser(response.data),
                bundlesWithLoadIndex = BundlesHelpers.setLoadIndex(bundles);
            defer.resolve(bundlesWithLoadIndex);
        },function(error){
            defer.reject(error);
        });
        return defer.promise;
    };

    Bundles.getUserCollectedBundles = function getUserCollectedBundles(username, page){
        var defer = $q.defer();
        userBundlesBase(username).all('bundles').customGETLIST('collects', {page: page, limit: BUNDLE_LOAD_LIMIT}).then(function(response) {
            var bundlesWithLoadIndex = BundlesHelpers.setLoadIndex(response.data);
            defer.resolve(bundlesWithLoadIndex);
        },function(error){
            defer.reject(error);
        });
        return defer.promise;
    };

    Bundles.getUserPublishedBundles = function getUserPublishedBundles(username, page){
        var defer = $q.defer();
        userBundlesBase(username).all('bundles').customGETLIST('published', {page: page, limit: BUNDLE_LOAD_LIMIT}).then(function(response) {
            var bundlesWithLoadIndex = BundlesHelpers.setLoadIndex(response.data);
            defer.resolve(bundlesWithLoadIndex);
        },function(error){
            defer.reject(error);
        });
        return defer.promise;
    };

    Bundles.getUserUnpublishedBundles = function getUserUnpublishedBundles(username, page){
        var defer = $q.defer();
        userBundlesBase(username).all('bundles').customGETLIST('unpublished', {page: page, limit: BUNDLE_LOAD_LIMIT}).then(function(response) {
            var bundles = BundlesHelpers.markAllUnpublishedByCurrentUser(response.data),
                bundlesWithLoadIndex = BundlesHelpers.setLoadIndex(bundles);
            defer.resolve(bundlesWithLoadIndex);
        },function(error){
            defer.reject(error);
        });
        return defer.promise;
    };

    Bundles.createBundle = function createBundle() {
        var defer = $q.defer();
        bundlesBase.post().then(function (response) {
            defer.resolve(response.data)
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    }

    return Bundles;
});