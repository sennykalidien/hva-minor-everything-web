app.directive('reloadOnResize', function(debouncedEvents) {
  return {
    restrict: 'A',
    scope: {
      src: '@ngSrc'
    },
    link: function(scope, elm, attrs) {
      if(elm[0].tagName != 'IFRAME') return;

      var src = scope.src;

      scope.$watch('src', function(newSrc) {
        src = newSrc;
        reloadIframe();
      });

      var resizeEventId = debouncedEvents.onResize(function() {
        reloadIframe();
      });

      var debounceTimer;
      var reloadIframe = function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
          elm[0].src = src;
        }, 100);
      };

      reloadIframe();

      scope.$on('$destroy', function () {
        debouncedEvents.off(resizeEventId);
      });

      elm.on('$destroy', function(){
          scope.$destroy();
      });
    }
  };
});