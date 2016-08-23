//TODO: shouldn't this be a filter?
app.directive('simplifyWebsite', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            websiteUrl: '=content'
        },
        link: function($scope, $element, $attrs) {
            $scope.$watch('websiteUrl', function(websiteUrl) {
                
                var content = angular.copy(websiteUrl);

                if(typeof $scope.websiteUrl === 'string') {
                    content = content.replace('http://www.', '').replace('https://www.', '').replace('http://', '').replace('https://', ''); // remove protocol and www.
                    content = content.split('?')[0]; // remove '?' and everything after it
                    while(content[content.length - 1] === '/') { // remove trailing slash(es)
                        content = content.substring(0, content.length - 1);
                    }
                    content = content.charAt(0).toUpperCase() + content.slice(1); // capitalize
                }

                $element.html(content);

            });
        }
    };
});
