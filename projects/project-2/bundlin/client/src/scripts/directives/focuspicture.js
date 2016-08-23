app.directive('focuspicture', function($document, documentProps) {
  return {
    restrict: 'A',
    scope: {
      fx: '@focuspictureX',
      fy: '@focuspictureY'
    },
    link: function(scope, elm, attrs) {

      // Apply function
      var applyFocus = function(x, y) {
        elm.css({
          backgroundPosition: 'top ' + y + '% left ' + x + '%'
        });
      };

      // Watch values
      scope.$watch(function() {
        return scope.fx + ',' + scope.fy;
      }, function() {
        applyFocus(scope.fx, scope.fy);
      }, true);

      // Initial
      applyFocus(scope.fx, scope.fy);

    }
  };
});
