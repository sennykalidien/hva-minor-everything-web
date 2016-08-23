app.directive('templateStructure', function($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            template: '@file',
            bundle: '=bundle',
            skips: '@skips'
        },
        template: '<div ng-include="templateToLoad"></div>',
        link: function($scope, $element, $attrs) {
            $timeout(function() {
                if (! _.isEmpty($scope.bundle)) {
                    $scope.skips = parseInt($scope.skips);
                    $scope.templateToLoad = $scope.template;
                }
            }, 0);
        }
    };
});
