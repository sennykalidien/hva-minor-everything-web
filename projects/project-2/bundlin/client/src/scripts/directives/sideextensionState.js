app.directive('sideextensionState', function($rootScope, $document, helpers, sideextensions) {
    return {
        restrict: 'A',
        link: function sidebarStateLink (scope, $elm, attrs) {

            // Close specific sideextension
            scope.closeSideExtension = function closeSideExtension (name) {
                sideextensions.all[name].close();
            };

            // Document click handler
            var documentClickHandler = function ($event) {
                if(helpers.checkIfElementIsBelow($event.target, '.bln-sidebarcontainer, .bln-sideextension')) return;
                sideextensions.disableAll();
                _.defer(function () { scope.$apply(); });
            };

            // State
            $rootScope.$on('sideExtensionChange', function (event, state) {
                scope.sideextensionIsActive = state;
                if(state) {
                    $document.on('click', documentClickHandler);
                } else {
                    $document.off('click', documentClickHandler);
                }
            });

            // Disable on scope destroy
            scope.$on('$destroy', function () {
                $document.off('click', documentClickHandler);
            });

        }
    };
});