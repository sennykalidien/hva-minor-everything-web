app.directive('bundleItemProperty', function($timeout, Restangular) {
    return {
        restrict: 'A',
        scope: {
            bundle: '=bundle',
            item: '=item',
            property: '@property'
        },
        link: function($scope, $element, $attrs) {
            $scope.updated = true;
            $scope.updatedCount = 0;

            var timeoutPromise = true;

            $scope.$watch('item.fields.' + $scope.property, function(field) {
                $scope.updated = false;
                $scope.updatedCount++;

                if ($scope.updatedCount > 1) {
                    if (! $scope.updated) {
                        $timeout.cancel(timeoutPromise);
                    }

                    timeoutPromise = $timeout(function() {
                        var data = {};
                        data.fields = {};
                        data.fields[$scope.property] = field;
                        Restangular.one('bundles', $scope.bundle._sid).one('items', $scope.item._sid).patch(data).then(function() {
                            $scope.updated = true;
                        });
                    }, 1000)
                }
            });
        }
    };
});
