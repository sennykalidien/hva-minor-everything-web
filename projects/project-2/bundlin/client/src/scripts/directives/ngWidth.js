app.directive('ngWidth', function() {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var applyWidth = function(width) {
        elm.css("cssText", "width: " + width + " !important;");
      };

      applyWidth(attrs.ngWidth);
      attrs.$observe('ngWidth', function(value) {
        applyWidth(value);
      }, true);
    }
  };
});