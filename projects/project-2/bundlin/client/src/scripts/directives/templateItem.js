app.directive('templateItem', function($compile, $http, $templateCache, $state, $rootScope, $location, $sce) {
    return {
        restrict: 'E',
        scope: {
            item: '=item',
            bundle: '=bundle',
            template: '=template',
            classes: '@classes',
            vars: '@vars'
        },
        link: function($scope, $element, $attrs) {
            
            $scope.$watch(function() {

                return $scope.item + $scope.bundle + $scope.template + $scope.classes + $scope.vars;

            }, function() {

                $element.html('');

                if ($scope.item && $scope.template) {
                    $http.get('/views/' + $scope.template, { cache: $templateCache }).then(function(response) {
                        var newScope = $rootScope.$new(true);
                        newScope.item = $scope.item;
                        newScope.bundle = $scope.bundle;
                        newScope.template = {};
                        newScope.state = $state;
                        newScope.trustHtml = $sce.trustAsHtml;
                        if($scope.vars) {
                            var varsToPass = $scope.vars.split(' ');
                            _.each(varsToPass, function(varToPass) {
                                newScope.template[varToPass] = true;
                            });
                        }
                        newScope.goToWebsite = function(url) {
                            window.location.href = url;
                        };
                        newScope.allowed = true;

                        var newElement = angular.element(response.data);
                        if (newScope.item.first) newElement.addClass('bln-bundleitem-first');
                        newElement.addClass($scope.classes);
                        newElement.addClass('itemid-' + $scope.item._sid);
                        
                        $element.append(newElement);

                        $compile($element.contents())(newScope);
                    });
                }

            }, true);
        }
    };
});
