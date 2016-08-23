app.controller('IntroController', function($scope, $state, $analytics, Auth, Restangular, $rootScope, $document, $timeout, Bundles) {

    $rootScope.stateTransition.time = 350;
    $scope.featured = [];
    $scope.fullGallery = false;
    $scope.user = false;
    $scope.beta_invites_remaining = 'a couple';

    Auth.user()
        .then(function (user) {
            $scope.user = user;
        });
    
    $scope.logInWithTwitter = function() {
        Auth.login()
            .then(function(user) {
                if (user.hasRole('beta')) {
                    $state.go('app.home.feed.popular');
                }
            });
    };

    $scope.playvideo = false;
    $scope.video_played = false;
    $scope.playVideo = function() {
        $scope.video_played = true;
        $scope.playvideo = true;
        var toElement = angular.element(document.querySelector('#introvideo'));
        $document.scrollTo(toElement, 150, 1000);
    };

    $scope.stopVideo = function() {
        $scope.playvideo = false;
    };

    Bundles.getFeaturedPopularBundles().then(function (bundles) {
        $scope.featured = bundles;
    });

    Restangular.one('beta_invites_remaining').get().then(function(response) {
        if(response.data.amount > 0) {
            $scope.beta_invites_remaining = response.data.amount;
        }
    });

});
