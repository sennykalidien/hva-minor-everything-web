app.directive('sidebarState', function($rootScope, $state, $timeout, scrollToggler, $document, helpers, debouncedEvents, sideextensions, Bundles) {
    return {
        restrict: 'A',
        link: function sidebarStateLink (scope, $elm, attrs) {

            var DISABLED_MOBILE_STATES = [
                'app.home.intro'
            ];

            // Document click handler
            var documentClickHandler = function ($event) {
                if(helpers.checkIfElementIsBelow($event.target, '.bln-sidebarcontainer, .bln-sideextension')) return;
                scope.disableSidebar();
                _.defer(function () { scope.$apply(); });
            };

            // State
            scope.sidebarIsActive = false;

            // Enable / disable
            scope.disableSidebar = function disableSidebar () {
                scrollToggler.enable();
                scope.sidebarIsActive = false;
                $document.off('click', documentClickHandler);
            };
            scope.enableSidebar = function enableSidebar () {
                scope.sidebarIsActive = true;
                scrollToggler.disable();
                $document.on('click', documentClickHandler);
            };

            // Toggle
            scope.toggleSidebar = function toggleSidebar () {
                scope.sidebarIsActive ? scope.disableSidebar() : scope.enableSidebar();
            };

            scope.createBundle = function() {
                Bundles.createBundle().then(function(bundle) {
                    $state.go('app.edit_bundle', {
                        bundleId: bundle._sid
                    });
                })
            }

            // Auto toggle on window resize
            var previousWidth = window.innerWidth;
            var resizeEventId = debouncedEvents.onResize(function () {
                if(previousWidth < 768 && window.innerWidth >= 768) {
                    scope.disableSidebar();
                }
                previousWidth = window.innerWidth;
            });

            // Add 'top' class on top
            var scrollEventId = debouncedEvents.onScroll(function () {
                scope.onTop = window.scrollY <= 0;
            });

            // Check disabled mobile states
            var checkDisabledMobileStates = function checkDisabledMobileStates () {
                scope.disableMobileSidebar = false;
                _.each(DISABLED_MOBILE_STATES, function (stateName) {
                    if($state.includes(stateName)) {
                        scope.disableMobileSidebar = true;
                        return;
                    }
                });
                
                if(scope.disableMobileSidebar) scope.disableSidebar();
            };

            // Listen to disableSidebarPlease event
            var closeSidebarPleaseDestroyer = $rootScope.$on('closeSidebarPlease', scope.disableSidebar);
            var openSidebarPleaseDestroyer = $rootScope.$on('openSidebarPlease', scope.enableSidebar);
            var stateChangeSuccessDestroyer = $rootScope.$on('$stateChangeSuccess', checkDisabledMobileStates);
            $timeout(checkDisabledMobileStates);
            checkDisabledMobileStates();

            // Destroy
            scope.$on('$destroy', function () {
                closeSidebarPleaseDestroyer();
                openSidebarPleaseDestroyer();
                stateChangeSuccessDestroyer();
                debouncedEvents.off(resizeEventId);
                debouncedEvents.off(scrollEventId);
                $document.off('click', documentClickHandler);
            });

        }
    };
});