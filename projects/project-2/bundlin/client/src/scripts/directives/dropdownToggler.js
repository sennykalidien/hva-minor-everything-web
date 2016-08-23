app.directive('dropdownToggler', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click', function(e){
                element.toggleClass('bln-tabs-active');
            })
        }
    }
});