app.directive('bundleItem', function($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            item: '=item',
            bundle: '=bundle',
            classes: '@classes',
            take: '@take',
            types: '@types',
            template: '@template'
        },
        template: '<div ng-include="getTemplateUrl()"></div>',
        link: function($scope, $element, $attrs) {
            $timeout(function() {
                $scope.getTemplateUrl = function() {
                    if (! _.isEmpty($scope.item)) {
                        $element.addClass($scope.item.type);

                        var file = '/views/partials/bundle/' + $scope.template + '/items/' + $scope.item.type;

                        var allTypes = [];

                        if ($scope.types) {
                            _.each($scope.types.split(','), function(type) {
                                var typeParts = type.split('=');
                                var typeName = typeParts[0];
                                var typeValue = typeParts[1];
                                allTypes[typeName] = typeValue;
                            });

                            if ($scope.item.type in allTypes) {
                                file += '-' + allTypes[$scope.item.type];
                            }
                        }

                        return file + '.html?v=' + BLN_BUILD_TIMESTAMP;
                    }

                    return false;
                };
            }, 0);
        }
    };
});
