app.directive('descriptionContent', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            descriptionContent: '=descriptionContent'
        },
        link: function($scope, $element, $attrs) {
            $scope.$watch('descriptionContent', function(contentSource) {
                if(!contentSource) return;
                var content = angular.copy(contentSource);
                content = cleanUrls(content);
                $element.html(content);
            });

            var cleanUrls = function(content) {
                // find urls
                var urlRegEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                var urls = content.match(urlRegEx);

                // make each found url pretty
                _.each(urls, function(url) {
                    var hostname = new URL(url).hostname;
                    content = content.replace(url, hostname);
                });

                return content;
            };
        }
    };
});
