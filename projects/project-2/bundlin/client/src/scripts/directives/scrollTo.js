/*
 * This directive lets the browser scroll to another point on the website
 *
 * Usage: attibute only.
 *
 *  scroll-to - specify the selector of the destination element here. the directive will add a touchend/click event
 *
 */

app.directive('scrollTo', function($document, scrollToggler) {
    return {
        restrict: 'AE',
        link: function($scope, $element, $attrs) {
            var offset = $attrs.scrollToOffset || 0;
            offset = parseInt(offset, 10);
            var time = $attrs.scrollToSpeed || 1000;

            var clickHandler = function clickHandler () {
                if (scrollToggler.status || typeof $attrs.scrollToForce !== 'undefined') {
                    var toSelector = $attrs.scrollTo;

                    if (toSelector.length > 0) {
                        var toElement = $(toSelector);
                        if(toElement && toElement.length) {
                            _.defer(function () {
                                $document.scrollTo(toElement, offset, time);
                            });
                        }

                    }
                }
            };

            $element.on('click', clickHandler);

            $scope.$on('$destroy', function () {
                $element.off('click', clickHandler);
            });

        }
    };
});
