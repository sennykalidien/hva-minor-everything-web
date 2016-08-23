app.controller('FeedController', function($scope, $analytics, Auth, Restangular, $rootScope, $document, $timeout) {

    Auth.user()
        .then(function(user) {
            $scope.user = user;
        });

});
