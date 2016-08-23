app.directive('focuspoint', function($document, documentProps, debouncedEvents, $timeout, $window, $rootScope) {
  return {
    restrict: 'A',
    scope: {
      fx: '=focuspointX',
      fy: '=focuspointY',
      releaseFunction: '=onFocuspointRelease'
    },
    link: function(scope, elm, attrs) {

      // Get picture element
      var pictureElm = elm.find('figure');

      // Add focuspoint class to elements
      var focuspointElm = angular.element('<div class="bln-focuspoint"></div>');
      elm.append(focuspointElm);

      // standard loading
      elm.addClass('fp-loading');

      // Get container dimensions
      var getContainerDimensions = function() {
        return {
          x: elm[0].getBoundingClientRect().left,
          y: elm[0].getBoundingClientRect().top,
          width: elm[0].offsetWidth,
          height: elm[0].offsetHeight
        };
      };

      // Do the dragging
      var touchDevice = documentProps.isTouch();
      var events = {
        down: touchDevice ? 'touchstart' : 'mousedown',
        move: touchDevice ? 'touchmove' : 'mousemove',
        up: touchDevice ? 'touchend' : 'mouseup',
        hoverstart: touchDevice ? 'touchstart' : 'mouseenter',
        hoverend: touchDevice ? 'touchend' : 'mouseleave'
      };

      var container = getContainerDimensions();
      var offset = 30;
      var startCoords = { x: 0, y: 0 };
      var startFocuspoints = { fx: 0, fy: 0 };
      var dragging = false;

      // Mouse/finger down (start dragging)
      var downHandler = function(event) {
        event.preventDefault();

        // Both touch & mouse
        container = getContainerDimensions();
        if(!event) event = window.event;
        var button = event.which || event.button;
        elm.addClass('fp-dragging');
        dragging = true;
        startCoords = {
          x: event.clientX,
          y: event.clientY
        };
        startFocuspoints = {
          fx: scope.fx,
          fy: scope.fy,
        };

      };
      focuspointElm.on(events.down, downHandler);

       // Drag if enabled
      var moveElm = touchDevice ? focuspointElm : $document;
      moveElm.on(events.move, function(event) {
        if(!dragging) return;
        event.preventDefault();

        scope.fx = bound(startFocuspoints.fx / 100 + ((event.clientX - startCoords.x) / (container.width - offset * 2)), 0, 1) * 100;
        scope.fy = bound(startFocuspoints.fy / 100 + ((event.clientY - startCoords.y) / (container.height - offset * 2)), 0, 1) * 100;

        movePoint();
        movePicture();
      });

       // Mouse/finger up (end of dragging)
      var documentHandler = function() {
        if(!dragging) return;
        event.preventDefault();

        dragging = false;
        elm.removeClass('fp-dragging');
        _.defer(function () { scope.$apply(); });
        if(scope.releaseFunction) scope.releaseFunction(scope.fx, scope.fy);
      };
      $document.on(events.up, documentHandler);

      // Hover
      elm.on(events.hoverstart, function() {
        elm.addClass('fp-hover');
      });
      elm.on(events.hoverend, function() {
        elm.removeClass('fp-hover');
      });

      // Move the point
      var movePoint = function() {
        focuspointElm.css({
          left: (offset / container.width * 100 + scope.fx * (1 - offset / container.width * 2)).toFixed(1) + '%',
          top: (offset / container.height * 100 + scope.fy * (1 - offset / container.height * 2)).toFixed(1) + '%'
        });
      };

      // Move the picture
      var movePicture = function() {
        pictureElm.css({
          backgroundPosition: 'top ' + scope.fy + '% left ' + scope.fx + '%'
        });
      };

      // On window resize
      var resizeEventId = debouncedEvents.onResize(function() {
        container = getContainerDimensions();
        movePoint();
      });

      // On fillup change
      var fillupListener = $rootScope.$on('bundle_edit_details:fillup', function () {
        container = getContainerDimensions();
        movePoint();
      });

      // Boundaries
      var bound = function(val, min, max) {
        return Math.max(min, Math.min(max, val));
      };

      // Validate scope focuspoint
      var validate = function(fx, fy) {
        var x_defined = typeof fx != 'undefined';
        var y_defined = typeof fy != 'undefined';
        var x_in_range = fx >= 0 && fx <= 100;
        var y_in_range = fy >= 0 && fy <= 100;

        return x_defined && y_defined && x_in_range && y_in_range;
      };

      // Reset the coordinates
      var reset = function() {
        elm.removeClass('fp-loading');
        
        return {
          reset: true,
          x: 50,
          y: 50
        };
      };

      // Watch values
      scope.$watch(function() {
        return scope.fx + ',' + scope.fy;
      }, function() {
        // Validate values
        if(!validate(scope.fx, scope.fy)) {
          var def = reset();
          scope.freset = def.reset;
          scope.fx = def.x;
          scope.fy = def.y;
        } else if(scope.freset) {
          scope.freset = false;
        } else {
          elm.removeClass('fp-loading');
        }

        movePoint();
        movePicture();
      }, true);

      // Apply positions for first time
      movePoint();
      movePicture();

      // Destroy events on scope destroy
      scope.$on('$destroy', function () {
        focuspointElm.off(events.down, downHandler);
        $document.off(events.up, documentHandler);
        debouncedEvents.off(resizeEventId);
        fillupListener();
      });
    }
  };
});