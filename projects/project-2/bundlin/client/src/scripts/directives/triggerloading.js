app.directive('triggerloading', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            $rootScope.loading.state = true;
            $(elm).load(function() {
                if(elm[0].src) {
                    $rootScope.loading.state = false;
                }
            });
        }
    };
});