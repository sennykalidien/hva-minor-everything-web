app.directive('partial', function($http, $templateCache, $compile, $state, Auth) {
	return {
		restrict: 'AE',
		scope: {
			name: '@',
			scope: '='
		},
		link: function(scope, elm, attrs) {
			$http.get('/views/partials/' + scope.name + '.html?v='+BLN_BUILD_TIMESTAMP, { cache: $templateCache }).then(function(response) {
                var newScope = scope.$new();
                newScope.state = $state;
                newScope.user = {};
                mergedScope = _.merge(newScope, scope.scope);
                var newElement = $compile(response.data)(mergedScope);
                elm.replaceWith(angular.element(newElement));
                
                Auth.user()
                    .then(function (user) {
                        if(!newElement) return;
                        var elmScope = newElement.scope();
                        if(!elmScope) return;
                        elmScope.user = user;
                    });
            });
		}
	};
});