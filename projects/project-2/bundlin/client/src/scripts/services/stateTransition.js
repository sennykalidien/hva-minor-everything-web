app.service('stateTransition', function($timeout, $state, $rootScope, debouncedEvents, $urlRouter) {

    var me = this;

    // State transition handling variables
    var CSS_TRIGGER_ANIMATION_DELAY = 150;
    var transitioned = false;
    var transitioning = false;
    var stateQueue = [];
    var enabled;

    debouncedEvents.onResize(function () {
        enabled = window.innerWidth >= 768;
    });

    var prevent = function (event) {
        event.preventDefault();
        $urlRouter.update(true);
    };

    this.run = function(event, toState, toParams, fromState, fromParams, preCallback, postCallback) {

        preCallback = preCallback || false;
        postCallback = postCallback || false;

        // Return if already transitioned
        if(transitioned) {
            transitioned = false;
            return;
        }

        // Put transition in queue if transition is running
        if(transitioning) {
            stateQueue.push({
                toState: toState,
                toParams: toParams
            });
            prevent(event);
            return;
        }
        
        transitioning = true; // start
        prevent(event);

        $rootScope.stateTransition.same = false;
        if(fromState.name === toState.name) {
            $rootScope.stateTransition.same = true;
        }

        $rootScope.stateTransition.status = 'out'; // (begin fade-out old page) 

        $timeout(function() {
            transitioned = true;
            $rootScope.extraStateParams = toState.extraParams;
            if(postCallback) postCallback();
            $state.go(toState.name, toParams);
            if(preCallback) preCallback();

            $timeout(function() {
                $rootScope.stateTransition.status = 'in'; // (fade-in new page)
                transitioning = false; // end

                // state queue
                var stateQueueItem = stateQueue.shift();
                if(typeof stateQueueItem !== 'undefined') {
                    $rootScope.extraStateParams = stateQueueItem.toState.extraParams;
                    $state.go(stateQueueItem.toState, stateQueueItem.toParams);
                }
            }, enabled ? CSS_TRIGGER_ANIMATION_DELAY : 0);
        }, enabled ? $rootScope.stateTransition.time : 0);

    }
});