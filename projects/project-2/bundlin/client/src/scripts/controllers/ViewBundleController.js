app.controller('ViewBundleController', function($scope, $rootScope, $state, $stateParams, $q, $location, Auth, Restangular, SEO, $timeout, $document, $filter, $location, error, Bundles) {

    var RELATED_BUNDLES_COUNT = 20;

    $rootScope.stateTransition.time = 1000;
    $scope.bundle = false;
    $scope.isCollected = false;
    $scope.followsAuthor = false;
    $scope.absoluteUrl = $location.absUrl().replace(/https?:\/\//, '');
    $scope.user = false;
    $scope.login = Auth.login;
    $scope.loading = {
        page: true
    };

    var jumpToItem = $state.current.extraParams.jumpToItem || false,
        jumpedToItem = false;

    var bundleBase = Restangular.one('bundles', $stateParams.bundleId);

    // Bundle call
    bundleBase
        .get()
        .then(function (response) {
            var bundle = response.data;
            handleBundle(bundle);

            Auth.user()
                .then(function (user) {
                    $scope.user = user;
                    handleBundleUserRelations(bundle, user);
                });
        }, function () {
            error.status(404);
        })
        .finally(function () {
            $scope.loading.page = false;
        });


    // Handle bundle
    var handleBundle = function(bundle) {
        if(!bundle) return;
        
        var tags = bundle.tags || [];
        var title;
        var description;
        if(bundle.title) {
            title = bundle.title + ' on Bundlin.com. The beauty of the web bundled.';
        } else {
            title = 'Bundle by ' + bundle.author.name + ' on Bundlin';
        }
        if(bundle.description) {
            description = bundle.description ;
        } else {
            description = 'A bundle created by '+ bundle.author.name + ' on Bundlin.com.';
        }

        var seoTags = tags.slice();
        seoTags.push(bundle.author.name);
        seoTags = seoTags.concat(['Bundlin', 'Bundle']);

        SEO.set('keywords', seoTags.join(', '));
        SEO.set('author', bundle.author.name);
        SEO.set('robots', 'index,follow');

        SEO.set('opengraph', {
            'type': 'article',
            'url': $location.protocol() + '://' + $location.host() + '/' + bundle._sid,
            'site_name': 'Bundlin',
            'image': bundle.picture.original
        });

        SEO.set('twitter', {
            'card': 'summary_large_image',
            'site': '@bundlin',
            'image': bundle.picture.original,
            'creator': '@' + bundle.author.username
        });

        SEO.setForAll(title, description);

        bundle.archivedItems = _.filter(bundle.items, function(item) {
            return !item.active;
        });

        bundle.items = _.filter(bundle.items, function(item) {
            return item.active;
        });

        fillRelatedBundles(bundle);

        $scope.bundle = bundle;

        if(jumpToItem && !jumpedToItem) {
            jumpedToItem = true;
            $timeout(function() {
                var toElement = angular.element(document.querySelector('.itemid-' + jumpToItem));
                $document.scrollTo(toElement, 20, 1000);
                toElement.addClass('highlight');
            }, 1000);
        }
    };

    // Fill related bundles with all bundles
    var fillRelatedBundles = function(bundle) {
        bundle.related_bundles = bundle.related_bundles || [];
        var extraBundlesNeeded = RELATED_BUNDLES_COUNT - bundle.related_bundles.length;
        if(extraBundlesNeeded > 0) {

            // If extra bundles are needed
            var bundlesPromise = Restangular.all('bundles').getList();
            bundlesPromise.then(function(response) {
                var extraBundles = [];

                // Call to all bundles
                _.each(Restangular.stripRestangular(response.data), function(extraBundle) {

                    var originalBundle = bundle.original_bundle || false;

                    // Bundle match checks
                    var isCurrentBundle = extraBundle._id === bundle._id,
                        isOriginalBundle = !originalBundle ? false : extraBundle._id === bundle.original_bundle._id,
                        existInRebundles = _.find(bundle.rebundles, {_id: extraBundle._id}),
                        existInRelatedBundles = _.find(bundle.related_bundles, {_id: extraBundle._id}),
                        isProfileBundle = extraBundle._sid < 13000,
                        isErrorBundle = extraBundle._sid === 404;

                    if(!isCurrentBundle && !isOriginalBundle && !existInRebundles && !existInRelatedBundles && !isErrorBundle && !isProfileBundle) {

                        // Add to related bundles
                        bundle.related_bundles.push(extraBundle);
                    }
                });
            });
        }
    };

    function handleBundleUserRelations(bundle, user) {
        if(!bundle || !user) return;
        
        _.each(bundle.collectors, function(collector) {
            if (collector._id == user._id) {
                $scope.isCollected = true;
            }
        });

        _.each(bundle.author.followers, function(follower) {
            if (follower == user._id) {
                $scope.followsAuthor = true;
            }
        });
    }

    $scope.switchFollow = function() {
        $scope.followsAuthor ? $scope.unfollow() : $scope.follow();
    };

    $scope.follow = function() {
        Restangular
            .one('users', $scope.bundle.author._id)
            .customPOST({}, 'follow')
            .then(function(response) {
                $scope.followsAuthor = true;
            });
    };

    $scope.unfollow = function() {
        Restangular
            .one('users', $scope.bundle.author._id)
            .customDELETE('follow')
            .then(function(response) {
                $scope.followsAuthor = false;
            });
    };

    $scope.switchCollect = function() {
        $scope.isCollected ? $scope.uncollect() : $scope.collect();
    };

    $scope.collect = function() {
        Restangular
            .one('bundles', $stateParams.bundleId)
            .customPOST({}, 'collect')
            .then(function(response) {
                $scope.isCollected = true;
                $scope.bundle.collectors.push($scope.user);
            });
    };

    $scope.uncollect = function() {
        Restangular
            .one('bundles', $stateParams.bundleId)
            .customDELETE('collect')
            .then(function(response) {
                _.each($scope.bundle.collectors, function(collector, index) {
                    if (collector._id == $scope.user._id) {
                        $scope.bundle.collectors.splice(index, 1);
                        $scope.isCollected = false;
                    }
                });
            });
    };

    // $scope.rebundle = function() {
    //     Restangular.one('bundles', $stateParams.bundleId).customPOST({}, 'rebundle').then(function(response) {
    //         var newBundle = response.data;
    //         $state.go('app.edit_bundle', { 'bundleId': newBundle._sid });
    //     });
    // };

    $scope.shareWithTwitter = function() {
        if ($scope.bundle) {
            var settings = {
                'height': 420,
                'width': 550,
                'left': (window.innerWidth - 550) / 2,
                'top': 150,
                'toolbar': 0,
                'status': 0
            };

            var settingsString = Object.keys(settings).map(function(key) {
                return key + '=' + settings[key];
            }).join(',');

            var shareText = '' + $scope.bundle.title + ' by @' + $scope.bundle.author.username + ' ' + $location.absUrl() + ' #bundlin',
                shareString = encodeURIComponent(shareText);

            var popup = window.open('https://twitter.com/intent/tweet?text=' + shareString, 'Share', settingsString);

            if (window.focus) {
                popup.focus();
            }
        }
    };

    $scope.shareWithLinkedin = function() {
        if ($scope.bundle) {
            var settings = {
                'height': 420,
                'width': 550,
                'left': (window.innerWidth - 550) / 2,
                'top': 150,
                'toolbar': 0,
                'status': 0
            };

            var settingsString = Object.keys(settings).map(function(key) {
                return key + '=' + settings[key];
            }).join(',');

            var popup = window.open('https://www.linkedin.com/shareArticle?url=' + $location.absUrl() + '&title=Bundlin: ' + $scope.bundle.title + '&summary=' + $scope.bundle.description, 'Share', settingsString);

            if (window.focus) {
                popup.focus();
            }
        }
    };

    $scope.createBundle = function() {
        Bundles.createBundle().then(function(bundle) {
            $state.go('app.edit_bundle', {
                bundleId: bundle._sid
            });
        })
    }

});
