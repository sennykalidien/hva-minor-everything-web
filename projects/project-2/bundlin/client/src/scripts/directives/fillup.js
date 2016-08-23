app.directive('fillup', function($timeout, debouncedEvents, $interval, $rootScope) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {

      var jqElm = $(element);
      var jqEndElm = $(jqElm.children('[fillup-element]')[0]);
      var direction = attrs.fillup.length > 0 ? attrs.fillup : 'height';

      var getParts = function() {
        return jqElm.children('[fillup-part]');
      };

      var calculate = function() {
        var width = jqElm.outerWidth();
        var height = jqElm.outerHeight();

        var partWidth = 0;
        var partHeight = 0;
        _.each(parts, function(part) {
          partWidth += $(part).outerWidth();
          partHeight += $(part).outerHeight();
        });

        return {
          'height': height - partHeight,
          'width': width - partWidth
        };
      };

      var applyFilllup = function() {
        if(direction === 'height') {
          jqEndElm.height(0);
          jqEndElm.height(calculate().height);
        } else if (direction === 'width') {
          jqEndElm.width(0);
          jqEndElm.width(calculate().width);
        }
        $rootScope.$broadcast('bundle_edit_details:fillup');
      };

      var resizeEventId = debouncedEvents.onResize(function() {
        $timeout(applyFilllup);
        $timeout(applyFilllup, 100);
      });

      var parts = getParts();
      $timeout(applyFilllup);

      scope.$on('$destroy', function () {
        debouncedEvents.off(resizeEventId);
      });
    }
  };
});