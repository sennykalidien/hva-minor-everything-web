app.controller('ViewProfileController', function($rootScope, $scope, $state, Restangular, Auth, $timeout, SEO, $location) {

    $scope.profile = undefined;
    $scope.user = {};
    $scope.profileScreenName = $state.params.profileScreenName;
    $scope.login = Auth.login;
    $scope.followsAuthor = false;

    Auth.user()
        .then(function (user) {
            $scope.user = user;
        });

    $scope.switchFollow = function() {
        $scope.followsAuthor ? $scope.unfollow() : $scope.follow();
    };

    $scope.follow = function() {
        Restangular
            .one('users', $scope.profile._id)
            .customPOST({}, 'follow')
            .then(function(response) {
                $scope.followsAuthor = true;
                $scope.user.follows.push($scope.profile._id);
                Auth.updateLocal({
                    follows: $scope.user.follows
                });
                _.defer(function () { $scope.$apply(); });
            });
    };

    $scope.unfollow = function() {
        Restangular
            .one('users', $scope.profile._id)
            .customDELETE('follow')
            .then(function(response) {
                $scope.followsAuthor = false;
                var currentFollowerIndex = $scope.user.follows.indexOf($scope.profile._id);
                if(currentFollowerIndex > -1) {
                    $scope.user.follows.splice(currentFollowerIndex, 1);
                    Auth.updateLocal({
                        follows: $scope.user.follows
                    });
                }
                _.defer(function () { $scope.$apply(); });
            });
    };

    function initializeProfile() {
        Restangular
            .one('users', $scope.profileScreenName)
            .get()
            .then(function(user) {
                var profile = user.data;

                // Make user's website url valid to link to from the app
                if(profile.website){
                    if (profile.website.indexOf('http://') !== 0 && profile.website.indexOf('https://') !== 0) {
                        profile.website_url = 'http://' + profile.website;
                    } else {
                        profile.website_url = profile.website;
                    }
                }

                Auth.user().then(function (currentUser) {
                    if(currentUser._id !== user._id) {
                        $scope.followsAuthor = (currentUser.follows.indexOf(profile._id) > -1);
                    }
                });

                // Replace url and Twitter handle occurrences in bio with actual links
                // Commented out because of not using AUtolink yet
                //profile.bio = Autolinker.link(user.data.bio, {
                //    hashtag: 'twitter'
                //});

                $scope.profile = profile;

                //SEO.set('title', profile.name + ' on Bundlin');
                //SEO.set('description', profile.bio);
                SEO.set('author', profile.name);

                SEO.set('opengraph', {
                    'type': 'profile',
                    'title': profile.name + ' on Bundlin',
                    'url': $location.protocol() + '://' + $location.host() + '/profile/' + profile.username,
                    'image': profile.picture.original
                });

                SEO.set('twitter', {
                    'card': 'summary_large_image',
                    'site': '@bundlin',
                    'title': profile.name + ' on Bundlin',
                    'description': profile.bio,
                    'image': profile.picture.original,
                    'creator': '@' + profile.username
                });

                _.defer(function () { $scope.$apply(); });
            }, function(response) {
                if(response.status == 404) {
                    $state.go('app.error', {
                        bundleId: 404
                    });
                }
            });
    }

    initializeProfile();
    var updateListener = $rootScope.$on('bln:profileUpdated', function(event, data){
        if(data.username === $scope.profile.username){
            initializeProfile();
        }
    });

    $scope.$on('$destroy', function(){
        updateListener();
    })
});
