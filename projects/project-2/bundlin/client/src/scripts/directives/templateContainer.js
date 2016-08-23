app.directive('templateContainer', function($q, $compile, $http, $templateCache, $injector, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            bundle: '=bundle',
            template: '@name'
        },
        link: function($scope, $element, $attrs) {
            $element.addClass('bln-template');
            $scope.$watch('bundle', function(bundle) {
                if(!bundle || !bundle.items || !bundle.items.length) return;

                var algorithm = $injector.get($scope.template.charAt(0).toUpperCase() + $scope.template.slice(1) + 'TemplateAlgorithm');

                var structures = algorithm.run(bundle.items);
                var promises = [];


                _.each(structures, function(structure) {
                    promises.push($http.get('/views/' + structure.structureTemplate, { cache: $templateCache }));
                });

                $q.all(promises).then(function(responses) {

                    var amountOfItemsTaken = 0;
                    
                    $element.html('');

                    _.each(responses, function(response, index) {
                        var takes = structures[index].itemTemplates.length;

                        var newScope = $rootScope.$new(true);
                        newScope.items = bundle.items.slice(amountOfItemsTaken, amountOfItemsTaken + takes);
                        newScope.bundle = bundle;
                        newScope.templates = structures[index].itemTemplates;

                        if (index === 0) newScope.items[0].first = true;

                        amountOfItemsTaken += takes;

                        // Add element to collection
                        var newElement = angular.element(response.data);
                        $compile(newElement)(newScope);
                        $element.append(newElement);
                        
                    });
                });
            }, true);
        }
    };
});
