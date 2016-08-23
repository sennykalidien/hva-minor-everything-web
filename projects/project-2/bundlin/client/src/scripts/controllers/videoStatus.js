app.directive('videoStatus', function() {
    return {
        restrict: 'AE',
        scope: {
            videoStatus: '='
        },
        link: function(scope, elm, attrs) {
            var player = elm;
            var url = window.location.protocol + player.attr('src').split('?')[0];

            scope.$watch('videoStatus', function(status) {
                if(status) {
                    controlPlayer('seekTo', '0');
                    controlPlayer('play');
                } else {
                    controlPlayer('pause');
                }
            });
            
            // Helper function for sending a message to the player
            var controlPlayer = function(action, value) {
                player[0].contentWindow.postMessage({
                    method: action,
                    value: value
                }, url);
            }
        }
    };
});