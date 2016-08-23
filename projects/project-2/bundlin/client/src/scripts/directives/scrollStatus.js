app.directive('scrollStatus', function(debouncedEvents, $timeout) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, elm, attrs) {
            // Check which element we should watch for scroll events
            var altElm = attrs.scrollStatusElement || false;
            elm = altElm ? $(elm).find(altElm)[0] : $(elm)[0];

            // Fire check-function on scroll
            var scrollEventId = debouncedEvents.on(elm, 'scroll', function() {
                scope.scrollStatus = getScrollStatus();
            }, 15);

            // Check on content change
            scope.$watch(function() {
                return '-' + elm.scrollWidth + elm.clientWidth + elm.scrollHeight + elm.clientHeight;
            }, function() {
                scope.scrollStatus = getScrollStatus();
            });

            // Check-function
            var getScrollStatus = function() {
                var boundTreshold = 40;
                return {
                    horizontal: {
                        view: elm.clientWidth,
                        content: elm.scrollWidth,
                        scroll: {
                            position: elm.scrollLeft,
                            left: elm.scrollLeft <= boundTreshold,
                            right: elm.scrollLeft >= elm.scrollWidth - elm.clientWidth - boundTreshold
                        }
                    },
                    vertical: {
                        view: elm.clientHeight,
                        content: elm.scrollHeight,
                        scroll: {
                            position: elm.scrollTop,
                            top: elm.scrollTop <= boundTreshold,
                            bottom: elm.scrollTop >= elm.scrollHeight - elm.clientHeight - boundTreshold
                        }
                    }
                };
            };

            // Initial check
            scope.scrollStatus = getScrollStatus();

            // Destroy scope
            scope.$on('$destroy', function () {
                debouncedEvents.off(scrollEventId);
            });
        }
    };
});