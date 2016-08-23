app.directive('sidebar', function($rootScope, sideextensions, Auth, $state) {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: '/views/partials/sidebar.html?v=' + BLN_BUILD_TIMESTAMP,
        link: function (scope) {

            scope.user = false;
            scope.$state = $state;

            Auth.user()
                .then(function(user) {
                    scope.user = user;
                });

            /***********************************************************************************************/
            /* Login function */
            /***********************************************************************************************/
            scope.login = function login () {
                $rootScope.$broadcast('closeSidebarPlease');

                Auth.login()
                    .then(function(user) {
                        if (user.hasRole('beta')) {
                            $state.go('app.home.feed.popular');
                        }
                    });
            };

            /***********************************************************************************************/
            /* Side extensions */
            /***********************************************************************************************/
            scope.menuStates = {
                notifications: false,
                settings: false,
            };

            var sideExtensionChangeDestroyer = $rootScope.$on('sideExtensionChange', function () {
                scope.menuStates.notifications = sideextensions.all['notificationsMenu'].state;
                scope.menuStates.settings = sideextensions.all['settingsMenu'].state;
            });
            
            scope.disableSideextensions = sideextensions.disableAll;

            scope.$on('$destroy', function () {
                sideExtensionChangeDestroyer();
            });
        }
    };
});