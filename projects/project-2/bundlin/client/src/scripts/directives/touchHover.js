/*
 * Adds the 'touchhover' class on touchend, to use with CSS
 *
 * Usage: attibute only.
 *  
 *  toggle-hover - does the thing
 *
 */

app.directive('touchHover', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
            var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
            if (! iOS) return false;

            var touchHandler = function touchHandler () {
                $element.toggleClass('touchhover');
            };

            $element.on('touchend', touchHandler);

            $scope.$on('$destroy', function () {
                $element.off('touchend', touchHandler);
            });
        }
    };
});
