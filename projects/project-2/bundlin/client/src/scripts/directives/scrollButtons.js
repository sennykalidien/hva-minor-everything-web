app.directive('scrollButtons', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var scrollElement = element.find('[scrolling-element]');
            var scrollDistance = scrollElement.width();

            scope.scrollRight = function scrollRight(e){
                scrollElement.animate({scrollLeft: '+=' + (scrollDistance * 0.8)}, 500, $.bez([0.74, 0.14, 0.28, 0.9]));
            };

            scope.scrollLeft = function scrollLeft(e){
                scrollElement.animate({scrollLeft: '-=' + (scrollDistance * 0.8)}, 500, $.bez([0.74, 0.14, 0.28, 0.9]));
            };
        }
    }
});