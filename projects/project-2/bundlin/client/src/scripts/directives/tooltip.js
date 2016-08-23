app.directive('tooltip', function($timeout, $rootScope) {
    return {
        restrict: 'AE',
        scope: {
            angle: '@',
            size: '@',
            state: '@',
            selectSelector: '@'
        },
        link: function(scope, elm, attrs) {
            $timeout(function() {

                // Generate tooltip classes
                scope.angle = scope.angle || 'top';
                scope.size = scope.size || false;

                if (scope.angle) elm.addClass('bln-tooltip-' + scope.angle);
                if (scope.size) elm.addClass('bln-tooltip-' + scope.size);

                // DOM changes on state change
                scope.$watch('state', function(state) {
                    if(state === "true") {
                        elm.addClass('active');
                    } else {
                        elm.removeClass('active');
                    }
                });

            }, 0);
        }
    };
});