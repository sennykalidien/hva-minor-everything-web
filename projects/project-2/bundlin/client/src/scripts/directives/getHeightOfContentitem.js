app.directive('getHeightOfContentitem', function(debouncedEvents) {
	return {
		restrict: 'AE',
		scope: {
			getHeightOfContentitemClass: '@',
			getHeightOfContentitemWatch: '@'
		},
		link: function(scope, elm, attrs) {
			if(!scope.getHeightOfContentitemClass) return;
			var className = scope.getHeightOfContentitemClass;

			var run = function() {
				var targetElm = $(elm).find('.' + className);
				elm.css({'height': targetElm.height() + 'px'});
				
				// re-run after a delay
				setTimeout(run, 300);
			};

			scope.$watch('getHeightOfContentitemWatch', run);
			var resizeEventId = debouncedEvents.onResize(run);

			// Destroy events on scope destroy
			scope.$on('$destroy', function () {
				debouncedEvents.off(resizeEventId);
			});
			
			elm.on('$destroy', function(){
			    scope.$destroy();
			});
		}
	};
});