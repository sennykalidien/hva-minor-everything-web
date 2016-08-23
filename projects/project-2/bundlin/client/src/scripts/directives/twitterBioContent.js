app.directive('twitterBioContent', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            bioContent: '=twitterBioContent',
            bioUrls: '=urls',
            bioUserMentions: '=userMentions'
        },
        link: function($scope, $element, $attrs) {
            $scope.$watch('bioContent', function(contentSource) {
                var content = angular.copy(contentSource);

                if(typeof $scope.bioUrls === 'object') {
                    _.each($scope.bioUrls, function(urlData) {
                        content = content.replace(urlData.shortened_url, generatePrettyHyperlink(urlData.url));
                    });
                }

                if(typeof $scope.bioUserMentions === 'object') {
                    _.each($scope.bioUserMentions, function(userMentionData) {
                        content = content.replace('@' + userMentionData.username, generateUserHyperlink(userMentionData.username));
                    });
                }

                $element.html(content);
            });

            // Generate pretty <a> from twitter username
            var generateUserHyperlink = function(username) {
                var generatedLink = username;

                // wrap url in <a></a>
                generatedLink = '<a href="http://twitter.com/' + username + '" target="_blank" class="user">@' + username + '</a>';

                return generatedLink;
            };

            // Generate pretty <a> tag from url
            var generatePrettyHyperlink = function(url) {
                var generatedLink = url;

                // make url valid
                if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }

                // strip protocol from url
                generatedLink = generatedLink.replace('http://', '').replace('https://', '');

                // strip url after '?'
                generatedLink = generatedLink.split('?')[0];

                // truncate url after 35 characters
                if(generatedLink.length > 45)
                    generatedLink = generatedLink.substring(0, 45) + '...';

                // wrap url in <a></a>
                generatedLink = '<a href="' + url + '" target="_blank" class="url">' + generatedLink + '</a>';

                return generatedLink;
            };
        }
    };
});
