app.directive('switch', function() {
    return {
        restrict: 'AE',
        scope: true,
        link: function($scope, $element, $attrs) {
            // Get varnames
            var varNames = $attrs.vars.split(',');
            var toggle = typeof $attrs.toggle != 'undefined' && $attrs.toggle != 'false';
            var defaultVarName = $attrs.default;
            $scope.switches = {};

            // Reset function
            $scope.reset = function(varNames) {
                _.each(varNames, function(varName) {
                    $scope.switches[varName] = false;
                });
            };

            // Switch function
            $scope.switch = function(varName) {
                var prevstate = $scope.switches[varName];
                $scope.reset(varNames);
                $scope.switches[varName] = toggle ? !prevstate : true;
            };

            // Initialize default states
            $scope.reset(varNames);
            $scope.switch(defaultVarName);
        }
    };
});
