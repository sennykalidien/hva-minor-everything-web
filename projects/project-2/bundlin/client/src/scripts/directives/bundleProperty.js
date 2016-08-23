app.directive('bundleProperty', function(Restangular) {
    return {
        restrict: 'A',
        scope: {
            bundle: '=bundle',
            property: '@property'
        },
        link: function($scope, $element, $attrs) {
            $scope.$watch('bundle', function(bundle) {
                $element.val($scope.bundle[$scope.property]);
            });

            var blurWatcher = function() {
                var data = {};
                data[$scope.property] = $element.val();
                Restangular.one('bundles', $scope.bundle._sid).patch(data);
            };

            $element.on('blur', blurWatcher);

            $scope.$on('$destroy', function() {
                $element.off('blur', blurWatcher);
            });
        }
    };
});
