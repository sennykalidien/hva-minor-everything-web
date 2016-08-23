/*
 * Only show this element on top/bottom of page. This is disabled on ios, because Safari on touch-devices pauses Javascript while scrolling.
 *
 * Usage: attibute only.
 *
 *  show-at="false" - can be top/bottom
 *
 */

app.directive("showAt", function($window, debouncedEvents, documentProps) {
    return {
        restrict: 'AE',
        link: function($scope, $element, $attrs) {
            // Test for iOS
            var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

            // Disable on iOS if set
            if (iOS && typeof $attrs.showAtIos != "undefined") {
                return false;
            }

            // Set hide class name
            var hideClass = 'bln-invisible';

            // Set bln-invisible classes based on top/bottom
            var scrolled = function() {
                if ($attrs.showAt === "top" && $window.pageYOffset <= 200) {
                    $element.removeClass(hideClass);
                } else if ($attrs.showAt === "bottom" && $window.pageYOffset >= documentProps.getHeight() - $window.innerHeight - 100) {
                    $element.removeClass(hideClass);
                } else {
                    $element.addClass(hideClass);
                }
            };

            // Call scrolled() on pageload and debounced scroll
            var scrollEventId = debouncedEvents.onScroll(scrolled);
            scrolled();

            // Destroy
            $scope.$on('$destroy', function () {
                debouncedEvents.off(scrollEventId);
            });
        }
    };
});
