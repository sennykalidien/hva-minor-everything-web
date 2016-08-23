/*
 * This directive sets the height of the element to the height of the window (also on window-resize)
 *
 * Usage: attibute only.
 *
 *  set-window - possible options: width/height/min-width/min-height (default is height)
 *  set-window-percentage - percentage (0, 50, 100, etc)
 *
 */

app.directive('setWindow', function($window, debouncedEvents) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var cssprop = attrs.setWindow || 'height',
                percentage = attrs.setWindowPercentage || 100,
                percentagePlus = attrs.setWindowPercentagePlus || 0;

            // Function to assign window height to the element
            var set = function() {                
                var prop = cssprop.indexOf('height') >= 0 ? 'innerHeight' : cssprop.indexOf('width') >= 0 ? 'innerWidth' : false;
                if(prop) {
                    element.css(cssprop, ($window[prop] * parseInt(percentage, 10) / 100 + parseInt(percentagePlus, 10)) + 'px');
                }
            };

            // Every time the user stops resizing the window
            var resizeEventId = debouncedEvents.onResize(set, 100);

            // Once
            set();

            scope.$on('$destroy', function () {
                debouncedEvents.off(resizeEventId);
            });
        }
    };
});
