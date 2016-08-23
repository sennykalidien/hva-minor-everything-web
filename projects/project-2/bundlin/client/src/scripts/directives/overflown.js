app.directive('overflown', function() {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
            // Check which element we should watch for overflow
            var altElm = attrs.overflownElement || false;
            element = altElm ? $(element).find(altElm)[0] : $(element)[0];

            var checkOverflown = function() {
                scope.overflown = {
                    horizontal: element.scrollWidth > element.clientWidth,
                    vertical: element.scrollHeight > element.clientHeight
                };
            };

            // Check on content change
            scope.$watch(function() {
                return '-' + element.scrollWidth + element.clientWidth + element.scrollHeight + element.clientHeight;
            }, checkOverflown);

            // Initial check
            checkOverflown();
        }
    };
});