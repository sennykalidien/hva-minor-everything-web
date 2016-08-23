app.directive('carousel', function ($timeout) {
  return {
    restrict: 'AE',
    link: function(scope, elm, attrs) {
      elm.addClass('bln-carousel');
      var list, items, width;
      scope.current = 0;

      scope.calc = function() {
        list = angular.element(elm.find('list')[0]);
        items = angular.element(list.find('item'));
        width = items[0].offsetWidth;
      };

      scope.to = function(number) {
        scope.current = number < 0 ? items.length - 1 : (number >= items.length ? 0 : number);
        var offset = -1 * width * scope.current;
        items.css({
          '-webkit-transform': 'translate('+offset+'px)',
          '-moz-transform': 'translate('+offset+'px)',
          '-ms-transform': 'translate('+offset+'px)',
          '-o-transform': 'translate('+offset+'px)',
          'transform': 'translate('+offset+'px)'
        });
      };

      scope.prev = function() {
        scope.to(scope.current-1);
      };

      scope.next = function() {
        scope.to(scope.current+1);
      };

      $timeout(function() {
        scope.calc();
        scope.to(scope.current);
      }, 0);
    }
  };
});