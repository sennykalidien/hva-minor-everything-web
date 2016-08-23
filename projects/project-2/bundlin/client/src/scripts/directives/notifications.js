app.directive('notifications', function(Auth, userProfile) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
            scope.user = false;
            
            Auth.user() // pass true to force refresh
                .then(function(user) {
                    scope.user = user;
                });
            scope.$on('$destroy', function(){
                userProfile.markNotificationsAsRead();
                Auth.user(true); // pass true to force refresh

            })
        }
    }
});
