// uses jQuery Dotdotdot (http://dotdotdot.frebsite.nl/)
app.directive('truncate', function($timeout, $compile) {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs) {
            var jqElm = $(element);
            
            $timeout(function() {

                jqElm.dotdotdot({
                    watch: true,
                    after: attrs.truncateAfter || null,
                    callback: function() {
                        $compile(jqElm.find('.compile'))(scope);
                    }
                });
                
            });
        }
    };
});