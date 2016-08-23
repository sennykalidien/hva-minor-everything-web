/*
 * This directive gives the element a fancy intro when it appears in the user viewport
 *
 * Usage: attibute only.
 *  
 *  fancy-intro - to initialize the directive
 *  fancy-intro-delay="0" - to set a delay in milliseconds

 *  The following attributes adds classes to the element:
 *  fancy-intro-effect="false" - you can use your own effect name. following classes will be set: 'fancy-intro-effect' and 'fancy-intro-effect-youreffectname'
 *  fancy-intro-effect-distance="false" - only use with fancy-intro-effect. you can use your own distance name. following classes will be set: 'fancy-intro-effect-distance' and 'fancy-intro-effect-distance-yourdistancename'
 *  fancy-intro-speed="false" - you can use your own speed name. follow classes will be set: 'fancy-intro-speed' and 'fancy-intro-speed-yourspeedname'
 *
 *  You can define the necessary classes in styles/components/fancy-intro.less
 *
 */

app.directive('fancyIntro', function($window, debouncedEvents, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      // Test for unsupported circumstances
      var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
          mobile = $window.innerWidth < 768,
          noSupport = iOS || mobile;

      // Save element as Angular-element and save options
      var delay = noSupport ? 0 : attrs.fancyIntroDelay || 0,
          delay = delay ? parseInt(delay, 10) : 0,
          effect = attrs.fancyIntroEffect || false,
          speed = attrs.fancyIntroSpeed || false,
          offset = attrs.fancyIntroOffset || 0,
          effectDistance = attrs.fancyIntroEffectDistance || false,
          children = attrs.fancyIntroChildren || false,
          childrenDelay = attrs.fancyIntroChildrenDelay || false,
          childrenDelay = childrenDelay ? parseInt(childrenDelay, 10) : 0;

      // Introed
      var introed = false;

      // Get window height on resize
      var windowHeight = 0;
      var saveWindowDimensions = function() {
        windowHeight = $window.innerHeight;
        mobile = $window.innerWidth < 768;
      };
      var resizeEventId = debouncedEvents.onResize(saveWindowDimensions);
      saveWindowDimensions();

      var initializeElement = function(element) {
        // Set the basic class
        element.addClass('fancy-intro');

        // Set the effect classes
        if(effect) {
          element.addClass('fancy-intro-effect fancy-intro-effect-'+effect);
          if(effectDistance) {
          element.addClass('fancy-intro-effect-distance-'+effectDistance);
          }
        }

        // Set the speed classes
        if(speed) {
          element.addClass('fancy-intro-speed fancy-intro-speed-'+speed);
        }
      };

      // Show element with delay
      var showUp = function(element, delay, index) {
        delay = children ? delay + childrenDelay * index : delay;
        $timeout(function() {
          element.addClass('fancy-intro-init');
        }, delay);
      };

      // Init
      var elements = children ? $(elm).find(children) : [elm];
      _.each(elements, function(element) {
        element = angular.element(element);
        initializeElement(element);
      });

      // When scrolled, check if element is in view, then call showUp()
      var scrollHandler = function() {
        if(!introed && (noSupport || (elm[0].getBoundingClientRect().top + parseInt(offset, 0)) <= windowHeight)) {
          _.each(elements, function(element, index) {
            element = angular.element(element);
            showUp(element, delay, index);
          });
          introed = true;
        }
      };

      // Call scrolled() on scroll
      var scrollEventId = debouncedEvents.onScroll(scrollHandler);
      scrollHandler();

      // Event destroy
      scope.$on('$destroy', function () {
        debouncedEvents.off(resizeEventId);
        debouncedEvents.off(scrollEventId);
      });

    }
  };
});