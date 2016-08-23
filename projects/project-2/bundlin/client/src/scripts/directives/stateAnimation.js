app.directive('stateAnimation', function($rootScope, $timeout, debouncedEvents) {
    return {
        restrict: 'AE',
        scope: {
            enterWatch: '='
        },
        link: function(scope, elm, attrs) {
            var delayTimer;

            var watchStateTransitionDestroy = $rootScope.$watch('stateTransition', function(stateTransition) {
                $timeout.cancel(delayTimer);

                var settings = {
                    enterDelay: attrs.enterDelay || 0,
                    leaveDelay: attrs.leaveDelay || 0,
                    preventIfSame: typeof attrs.preventIfSame !== 'undefined' && attrs.preventIfSame !== 'false',
                    enterWatch: attrs.enterWatch || false
                };

                if(stateTransition.status === 'out') {
                    delayTimer = $timeout(function() { elm.removeClass('enter'); }, settings.leaveDelay);
                }

                if(settings.enterWatch) {
                    scope.$watch('enterWatch', function(enter) {
                        enter ? elm.addClass('enter') : elm.removeClass('enter');
                    });
                } else {
                    if(stateTransition.status === 'in') {
                        delayTimer = $timeout(function() { elm.addClass('enter'); }, settings.enterDelay);
                    }
                }

                // Prevent if fromState and toState are the same
                if (settings.preventIfSame && stateTransition.same) {
                    elm.addClass('prevent');
                } else {
                    elm.removeClass('prevent');
                }

            }, true);

            scope.$on('$destroy', function () {
                watchStateTransitionDestroy();
            });
        }
    };
});