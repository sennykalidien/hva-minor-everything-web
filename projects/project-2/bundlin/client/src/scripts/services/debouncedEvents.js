/*
 * This service debounces heavy events like 'scroll' and 'resize'
 *
 * Syntax:
 *  debouncedEvents.on(element, event(s), handler, time);
 *
 * Where time is the debounce milliseconds for the event. Default is 10.
 *
 */

app.service('debouncedEvents', function($window, $rootScope, $timeout) {
    var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

    var bindedEvents = [];

    // Scroll event
    this.onScroll = function(handler, time) {
        return this.onWindow('load scroll', handler, time);
    };

    // Resize event
    this.onResize = function(handler, time) {
        if(iOS) {
            return this.onWindow('load orientationchange', handler, time);
        }

        return this.onWindow('load resize', handler, time);
    };

    // Window event
    this.onWindow = function(eventString, handler, time) {
        return this.on($window, eventString, handler, time);
    };

    // Event
    this.on = function(elm, eventString, callback, time) {
        time = time || 10;
        var timeout = null;

        var handler = function() {
            if (timeout !== null) {
                $timeout.cancel(timeout);
            }

            timeout = $timeout(function() {
                if (typeof callback === "function") {
                    return callback();
                }
            }, time);
        };

        $elm = angular.element(elm);
        $elm.on(eventString, handler);

        var newId = 0;
        if(bindedEvents.length) newId = _.max(bindedEvents, 'id').id + 1;
        bindedEvents.push({
            id: newId,
            elm: $elm,
            eventString: eventString,
            handler: handler
        });

        return newId;
    };

    this.off = function (identifier) {
        var index = _.findIndex(bindedEvents, { id: identifier });
        var bindedEvent = bindedEvents[index];
        bindedEvent.elm.off(bindedEvent.eventString, bindedEvent.handler);
        if (index > -1) bindedEvents.splice(index, 1);
    };

});