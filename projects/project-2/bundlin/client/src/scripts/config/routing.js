app.config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {

    // Disable strict mode
    $urlMatcherFactoryProvider.strictMode(false);

    // HTML5 mode (no #)
    $locationProvider.html5Mode(true); 

    // Redirects
    $urlRouterProvider
        .when('/intro', '/')
        .when('/pim', '/12001')
        .when('/nick', '/12002')
        .when('/peter', '/12003')
        .otherwise(function ($injector, $location) {
            var $state = $injector.get('$state');
            if($state.current.name !== 'app.error') {
                var wrongUrl = $location.$$url;
                $state.go('app.error', { bundleId: 404 });
            }
        });

    // Routes
    $stateProvider

        // app
        .state('app', {
            url: '',
            abstract: true,
            controller: 'AppController',
            templateUrl: '/views/layouts/app.html?v=' + BLN_BUILD_TIMESTAMP
        })
        .state('app.error', {
            url: '/error/:bundleId',
            controller: 'ViewBundleController',
            templateUrl: '/views/app/view_bundle.html?v=' + BLN_BUILD_TIMESTAMP
        })
        .state('app.home', {
            url: '/',
            template: '<ui-view></ui-view>'
        })
        .state('app.home.intro', {
            url: '',
            controller: 'IntroController',
            templateUrl: '/views/app/intro.html?v=' + BLN_BUILD_TIMESTAMP
        })
        .state('app.home.feed', {
            templateUrl: '/views/app/feed.html?v=' + BLN_BUILD_TIMESTAMP,
            controller: 'FeedController',
            abstract: true
        })
        .state('app.home.feed.popular', {
            url: '',
            views: {
                'bundles': {
                    templateUrl: '/views/app/feed_bundles.html?v=' + BLN_BUILD_TIMESTAMP,
                    controller: function($scope, $state, Bundles, $rootScope, SEO) {
                        $rootScope.stateTransition.time = 0;
                        var currentPage = 1, loading = false;
                        $scope.bundles  = [];
                        $scope.$parent.loadBundles = function() {
                            if(loading) return;
                            Bundles.getPopularBundles(currentPage).then(function(bundles){
                                $scope.bundles = $scope.bundles.concat(bundles);
                                currentPage++;
                                loading = false;
                                $rootScope.pageLoading = 'loaded';
                                SEO.setForAll('Trending Bundles on Bundlin', 'These are the popular, most viewed Bundles on Bundlin.com. The trending Bundles are refreshed every hour.');
                            });
                        };
                        $scope.$parent.loadBundles();
                    }
                }
            }
        })
        .state('app.home.feed.new', {
            url: 'latest',
            views: {
                'bundles': {
                    templateUrl: '/views/app/feed_bundles.html?v=' + BLN_BUILD_TIMESTAMP,
                    controller: function($scope, $state, Bundles, $rootScope, SEO) {
                        $rootScope.stateTransition.time = 0;
                        var currentPage = 1, loading = false;
                        $scope.bundles  = [];
                        $scope.$parent.loadBundles = function() {
                            if(loading) return;
                            Bundles.getLatestBundles(currentPage).then(function(bundles){
                                $scope.bundles = $scope.bundles.concat(bundles);
                                currentPage++;
                                loading = false;
                                $rootScope.pageLoading = 'loaded';
                                SEO.setForAll('The Latest Bundles on Bundlin', 'This is a stream of the latest Bundles created by people around the world!');
                            });
                        };
                        $scope.$parent.loadBundles();
                    }
                }
            }
        })
        .state('app.home.feed.following', {
            url: 'following',
            views: {
                'bundles': {
                    templateUrl: '/views/app/feed_bundles.html?v=' + BLN_BUILD_TIMESTAMP,
                    controller: function($scope, $state, Bundles, $rootScope, SEO) {
                        $rootScope.stateTransition.time = 0;
                        var currentPage = 1, loading = false;
                        $scope.bundles  = [];
                        $scope.$parent.loadBundles = function() {
                            if(loading) return;
                            Bundles.getFollowerBundles(currentPage).then(function(bundles){
                                $scope.bundles = $scope.bundles.concat(bundles);
                                currentPage++;
                                loading = false;
                                $rootScope.pageLoading = 'loaded';
                                SEO.setForAll('Bundles created by Bundlers you follow', 'These are the Bundles created by Bundlers you follow! The more people you follow, to more active this stream becomes.');
                            });
                        };
                        $scope.$parent.loadBundles();
                    }
                }
            }
        })
        .state('app.create_bundle', {
            url: '/create',
            controller: 'CreateBundleController'
        })
        .state('app.profile', {
            url:'/profile',
        })
        .state('app.view_profile', {
            url:'/profile/:profileScreenName',
            templateUrl: '/views/app/view_profile.html?v=' + BLN_BUILD_TIMESTAMP,
            controller: 'ViewProfileController',
            abstract: true
        })
        .state('app.view_profile.bundles', {
            url: '',
            views: {
                'bundles': {
                    templateUrl: '/views/app/view_profile_bundles.html?v=' + BLN_BUILD_TIMESTAMP,
                    controller: function($scope, $state, Bundles, $rootScope, SEO) {
                        $rootScope.stateTransition.time = 0;
                        var username = $state.params.profileScreenName, currentPage = 1, loading = false;
                        $scope.bundles  = [];
                        $scope.$parent.loadBundles = function() {
                            if(loading) return;
                            Bundles.getUserBundles(username, currentPage).then(function(bundles){
                                $scope.bundles = $scope.bundles.concat(bundles);
                                currentPage++;
                                loading = false;
                                $rootScope.pageLoading = 'loaded';
                                SEO.setForAll(username + ' on Bundlin.com', username + ' is a creator of beautiful lookbooks consisting of amazing links on Bundlin.com.');
                                SEO.set('author', username);
                            });
                        };
                        $scope.$parent.loadBundles();
                    }
                }
            }
        })
        .state('app.view_profile.collects', {
            url: '/collected',
            views: {
                'bundles': {
                    templateUrl: '/views/app/view_profile_bundles.html?v=' + BLN_BUILD_TIMESTAMP,
                    controller: function($scope, $state, Bundles, $rootScope, SEO) {
                        $rootScope.stateTransition.time = 0;
                        var username = $state.params.profileScreenName, currentPage = 1, loading = false;

                        $scope.bundles  = [];
                        $scope.$parent.loadBundles = function() {
                            if(loading) return;
                            Bundles.getUserCollectedBundles(username, currentPage).then(function(bundles){
                                $scope.bundles = $scope.bundles.concat(bundles);
                                currentPage++;
                                loading = false;
                                $rootScope.pageLoading = 'loaded';
                                SEO.setForAll('These are the Bundles collected by ' + username, 'Collect Bundles so you never lose track of your favorite content.');
                            });
                        };
                        $scope.$parent.loadBundles();
                    }
                }
            }
        })
        .state('app.view_profile.published', {
            url: '/published',
            views: {
                'bundles': {
                    templateUrl: '/views/app/view_profile_bundles.html?v=' + BLN_BUILD_TIMESTAMP,
                    controller: function($scope, $state, Bundles, $rootScope, SEO) {
                        $rootScope.stateTransition.time = 0;
                        var username = $state.params.profileScreenName, currentPage = 1, loading = false;
                        $scope.bundles  = [];
                        $scope.$parent.loadBundles = function() {
                            if(loading) return;
                            Bundles.getUserPublishedBundles(username, currentPage).then(function(bundles){
                                $scope.bundles = $scope.bundles.concat(bundles);
                                currentPage++;
                                loading = false;
                                $rootScope.pageLoading = 'loaded';
                                SEO.setForAll(username + '\'s published Bundles on Bundlin', 'These Bundles are visible to everyone.');
                            });
                        };
                        $scope.$parent.loadBundles();
                    }
                }
            }
        })
        .state('app.view_profile.unpublished', {
            url: '/unpublished',
            views: {
                'bundles': {
                    templateUrl: '/views/app/view_profile_bundles.html?v=' + BLN_BUILD_TIMESTAMP,
                    controller: function($scope, $state, Bundles, $rootScope, SEO) {
                        $rootScope.stateTransition.time = 0;
                        var username = $state.params.profileScreenName, currentPage = 1, loading = false;
                        $scope.bundles  = [];
                        $scope.$parent.loadBundles = function() {
                            if(loading) return;
                            Bundles.getUserUnpublishedBundles(username, currentPage).then(function(bundles){
                                $scope.bundles = $scope.bundles.concat(bundles);
                                currentPage++;
                                loading = false;
                                $rootScope.pageLoading = 'loaded';
                                SEO.setForAll('Your unpublished Bundles', 'This are the Bundles that are not visible to the public.');
                            });
                        };
                        $scope.$parent.loadBundles();
                    }
                }
            }
        })
        .state('app.edit_bundle', {
            url: '/:bundleId/edit',
            controller: 'EditBundleController',
            templateUrl: '/views/app/edit_bundle.html?v=' + BLN_BUILD_TIMESTAMP
        })
        .state('app.view_bundle', {
            url: '/:bundleId',
            controller: 'ViewBundleController',
            templateUrl: '/views/app/view_bundle.html?v=' + BLN_BUILD_TIMESTAMP
        })

});
