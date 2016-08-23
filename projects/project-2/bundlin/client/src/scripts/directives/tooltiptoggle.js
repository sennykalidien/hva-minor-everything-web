app.directive('tooltiptoggle', function(tooltips, $timeout) {
    return {
        restrict: 'A',
        scope: {
            tooltiptoggle: '=',
            tooltiptoggleTemplate: '@',
            tooltiptoggleScope: '=',
            tooltiptoggleAngle: '@',
            tooltiptoggleStyle: '@',
            tooltiptoggleSize: '@',
            tooltiptoggleSelect: '@',
            tooltiptoggleHideIf: '=',
            tooltiptoggleDoIf: '=',
            tooltiptoggleDoAction: '='
        },
        link: function(scope, elm, attrs) {

            // Check for existance
            scope.tooltiptoggleTemplate = scope.tooltiptoggleTemplate || false;
            scope.tooltiptoggleAngle = scope.tooltiptoggleAngle || false;
            scope.tooltiptoggleSelect = scope.tooltiptoggleSelect || false;

            // Tooltip requirements (tooltipTemplate)
            if(!scope.tooltiptoggleTemplate) return false;

            // Register tooltip
            scope.template = 'tooltips/' + scope.tooltiptoggleTemplate;
            var tooltip = tooltips.register({
                template: 'tooltips/' + scope.tooltiptoggleTemplate,
                sourceScope: scope
            });

            // On click
            var clickHandler = function clickHandler () {
                if(attrs.tooltiptoggle.length > 0 && !scope.tooltiptoggle) return;
                
                var jqElm = $(elm);
                tooltip.toggle();
                scope.tooltipActive = tooltip.state;
                tooltip.setPosition({
                    x: jqElm.offset().left,
                    y: jqElm.offset().top,
                    width: jqElm.outerWidth(),
                    height: jqElm.outerHeight()
                });

                if(scope.tooltiptoggleSelect && !Modernizr.touch) {
                    var selectElm = tooltip.find(scope.tooltiptoggleSelect);
                    $timeout(function() {
                        selectElm.select();
                    }, 0);
                }
            }
            elm.on('click', clickHandler);

            // Scope watchers
            scope.$watch(function() {
                return scope.tooltiptoggleDoIf + ' ' + scope.tooltiptoggleHideIf;
            }, function(variable) {
                // Do if
                if(scope.tooltiptoggleDoAction && variable && tooltip.state) {
                    scope.tooltiptoggleDoAction();
                }

                // Hide if variable if true
                if(variable) {
                    tooltip.close();
                }
            });

            // Add toggle class
            elm.addClass('bln-tooltiptoggle');

            scope.$on('$destroy', function () {
                elm.off('click', clickHandler);
                tooltips.unsubscribe(tooltip);
            });
        }
    };
});
