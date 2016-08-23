app.service('tooltips', function($rootScope, debouncedEvents, $compile, $document, helpers) {

    // find placeholder for all tooltips
    var tooltipPlaceholder = $('.bln-tooltips');

    // store this
    var me = this;

    this.all = [];
    tooltipPlaceholder.html('');

    // register tooltip
    this.register = function(properties) {
        properties.sourceScope.state = false;

        var element = angular.element('<div class="bln-tooltipcontainer" ng-class="{\'active\': state}" ng-style="{ left: position.x + \'px\', top: position.y + \'px\', width: position.width + \'px\', height: position.height + \'px\' }"><tooltip angle="{{tooltiptoggleAngle}}" state="{{state}}" class="bln-tooltip" style="{{tooltiptoggleStyle}}" size="{{tooltiptoggleSize}}"><ng-include src="\'/views/partials/\' + template + \'.html?v=\' + BLN_BUILD_TIMESTAMP"></ng-include></tooltip></div>');
        var compiledElement = $compile(element)(properties.sourceScope);

        var tooltip = {};
        tooltip.state = false;
        tooltip.element = angular.element(compiledElement);
        tooltip.scope = compiledElement.scope();
        tooltip.open = function() {
            me.disableAll();
            tooltip.state = true;
            tooltip.scope.state = true;
            _.defer(function () { tooltip.scope.$apply(); });
        };
        tooltip.close = function() {
            tooltip.state = false;
            tooltip.scope.state = false;
            _.defer(function () { tooltip.scope.$apply(); });
        };
        tooltip.toggle = function() {
            if (tooltip.state) {
                tooltip.close();
            } else {
                tooltip.open();
            }
        };
        tooltip.setPosition = function(position) {
            tooltip.scope.position = position;
        };
        tooltip.find = function(selector) {
            return $(tooltip.element).find(selector);
        };

        tooltipPlaceholder.append(compiledElement);

        me.all.push(tooltip);
        return tooltip;
    };

    // disable all tooltips: handling
    this.disableAll = function() {
        _.each(me.all, function(tooltip) {
            tooltip.close();
        });
    };

    // disable all tooltips on resize and scroll
    debouncedEvents.onResize(me.disableAll);
    debouncedEvents.onScroll(me.disableAll);

    // disable all tooltips when user clicks next to it
    var documentElement = angular.element(document);
    documentElement.on('mousedown', function($event) {
        var preventClick = false;
        _.each(me.all, function (tooltip) {
            if(helpers.checkIfElementIsBelow($event.target, '.bln-tooltip')) {
                preventClick = true;
            }
        });

        if(!preventClick) me.disableAll();
    });

    this.unsubscribe = function(tooltip) {
        tooltip.element.remove();
        var index = me.all.indexOf(tooltip);
        if (index > -1) {
            me.all.splice(index, 1);
        }
    };

});
