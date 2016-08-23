app.directive('snapOnScroll', function(debouncedEvents, $document) {
    return {
        scope: {
            snapOnScrollEnabled: '='
        },
        link: function(scope, elm, attrs) {
            // init vars
            var enabled = scope.snapOnScrollEnabled || scope.snapOnScrollEnabled === 'undefined' || false,
                treshold = attrs.snapOnScrollTreshold || false,
                scrollElementSelector = attrs.snapOnScrollElement || false,
                scrollElement = scrollElementSelector ? $(elm).find(scrollElementSelector) : elm,
                snapped = false,
                inRange = false;

            // on element scroll
            var elementScrollEventId = debouncedEvents.on(scrollElement, 'scroll', function() {
                if(snapped || (treshold && !inRange) || !enabled) return;
                snapped = true;

                // oh snap
                $document.scrollTo(elm, 0, 100);
            }, 20);

            // on page scroll
            var documentScrollEventId = debouncedEvents.onScroll(function() {
                // prevent snap if element is not in range
                if(treshold) {
                    var elmOffset = Math.abs(elm[0].getBoundingClientRect().top);
                    inRange = elmOffset <= treshold;
                }

                // Reset snapped when out of range
                if(!inRange) snapped = false;
            }, 20);

            scope.$on('$destroy', function () {
                debouncedEvents.off(elementScrollEventId);
                debouncedEvents.off(documentScrollEventId);
            })
        }
    };
});
