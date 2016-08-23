app.directive('sideExtension', function(debouncedEvents, sideextensions) {
    return {
        restrict: 'AE',
        scope: true,
        link: function($scope, $element, $attrs) {
            var name = $attrs.sideExtension || false;
            $scope.sideextension = sideextensions.register(name);
        }
    };
});
