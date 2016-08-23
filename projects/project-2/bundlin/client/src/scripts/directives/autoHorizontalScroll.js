app.directive('autoHorizontalScroll', function($window) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var mobile = $window.outerWidth < 480;
            // debounced the callback, can only be callen once every 500ms
            var debouncedCallback = _.debounce(function(){
                scope.$apply(attrs['scrollEndCallback'], element);
                scrollEnd = false;
            }, 500, true);

            // remember scrolloffset;
            var oldScrollOffsetLeft = 0;

            // mousewheel handler
            var mouseWheelHandler = function mouseWheelHandler(e){
                // console.log(e)
                var scrollLeft = element[0].scrollLeft;
                var scrollEnd = ((element[0].offsetWidth + scrollLeft) > element[0].scrollWidth - 800);
                var scrollDirection = oldScrollOffsetLeft < scrollLeft ? 'right' : 'left'
                oldScrollOffsetLeft = scrollLeft + 10;

                // callback if scrollend is reached and the scrolldirection is right
                if(scrollEnd && scrollDirection === 'right') {
                    debouncedCallback();
                }
                if(e.type === 'mousewheel'){
                    this.scrollLeft -= e.originalEvent.wheelDeltaY;
                    if(!e.originalEvent.wheelDeltaX){
                        e.preventDefault();
                    }
                } else {
                    e.preventDefault();
                    this.scrollLeft += (e.originalEvent.detail * 5);
                }
            };
            
            var oldScrollOffsetTop = 0;
            var scrollBottomHandler = function scrollBottomHandler(e){
                var scrollTop = element[0].scrollTop;
                var scrollEnd = ((element[0].offsetHeight + scrollTop) > element[0].scrollHeight - 800);
                var scrollDirection = oldScrollOffsetTop < scrollTop ? 'down' : 'up'
                oldScrollOffsetTop = scrollTop + 10;

                // callback if scrollend is reached and the scrolldirection is down
                if(scrollEnd && scrollDirection === 'down') {
                    debouncedCallback();
                }
            };

            if(!mobile){
                element.on('mousewheel DOMMouseScroll', mouseWheelHandler);
            } else {
                element.on('scroll', scrollBottomHandler);
            }





            scope.$on('$destroy', function(){
                element.off('mousewheel', mouseWheelHandler);
                element.off('scroll', scrollBottomHandler);
            });
        }
    }
});