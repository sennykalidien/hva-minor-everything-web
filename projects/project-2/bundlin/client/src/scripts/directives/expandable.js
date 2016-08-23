app.directive('expandable', function($compile) {
    return {
        restrict: 'AE',
        link: function(scope, elm, attrs) {
            var jqElm = $(elm);
            var expandJqElm = jqElm.find('.expand');
            var compileJqElm = jqElm.find('.compile');

            scope.expand = function() {
                elm.addClass('expanded');
                expandJqElm.trigger('destroy.dot');
                $compile(compileJqElm)(scope);
            };

            scope.contract = function() {
                elm.removeClass('expanded');
                expandJqElm.trigger('update.dot');
                $compile(compileJqElm)(scope);
            };
        }
    };
});