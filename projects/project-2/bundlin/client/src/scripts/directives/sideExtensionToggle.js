app.directive('sideExtensionToggle', function(sideextensions, $document, $rootScope) {
    return {
        restrict: 'AE',
        link: function($scope, $element, $attrs) {
            $scope.sideextensions = sideextensions;
            var name = $attrs.sideExtensionToggle || false;

            var clickHandler = function clickHandler () {
                _.defer(function () {
                    $scope.$apply(function () {
                        sideextensions.all[name].toggle();
                    });
                });
            };

            $element.on('click', clickHandler);

            $scope.$on('$destroy', function () {
                $element.off('click', clickHandler);
            });
        }
    };
});
