app.directive('scrollButtonsIe', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if(msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
                scope.ie = true;
                var scrollElement = element;
                var scrollDistance = scrollElement.width();

                scope.scrollRight = function scrollRight(e){
                    scrollElement.animate({scrollLeft: '+=' + (scrollDistance * 0.8)}, 500, $.bez([0.74, 0.14, 0.28, 0.9]));
                };

                scope.scrollLeft = function scrollLeft(e){
                    scrollElement.animate({scrollLeft: '-=' + (scrollDistance * 0.8)}, 500, $.bez([0.74, 0.14, 0.28, 0.9]));
                };
            } else {
                scope.ie = false;
            }
        }
    }
});