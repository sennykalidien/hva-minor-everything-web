app.directive('enableNgAnimate', function($animate) {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            $animate.enabled(true, elm);
        }
    }
});

