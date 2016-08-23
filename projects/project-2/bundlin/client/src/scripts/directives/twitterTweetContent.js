app.directive('twitterTweetContent', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            tweetContent: '=twitterTweetContent',
            tweetUrls: '=urls',
            tweetMedia: '=media',
            tweetUserMentions: '=userMentions',
            tweetHashtags: '=hashtags'
        },
        link: function($scope, $element, $attrs) {
            $scope.$watch('tweetContent', function(contentSource) {
                var content = angular.copy(contentSource);

                if(typeof $scope.tweetUrls === 'object') {
                    _.each($scope.tweetUrls, function(urlData) {
                        content = content.replace(urlData.shortened_url, generatePrettyHyperlink(urlData.url));
                    }); 
                }

                if(typeof $scope.tweetMedia === 'object') {
                    _.each($scope.tweetMedia, function(mediaData) {
                        if (mediaData.type === 'photo') {
                            content = content.replace(mediaData.shortened_url, '');
                        } else {
                            content = content.replace(mediaData.shortened_url, generatePrettyHyperlink(mediaData.shortened_url))
                        }
                    });
                }

                if(typeof $scope.tweetUserMentions === 'object') {
                    _.each($scope.tweetUserMentions, function(userData) {
                        content = content.replace('@' + userData.username, generateUserHyperlink(userData.username));
                    });
                }

                if(typeof $scope.tweetHashtags === 'object') {
                    _.each($scope.tweetHashtags, function(hashtagData) {
                        content = content.replace('#' + hashtagData, generateHashtagSpan(hashtagData));
                    });
                }

                $element.html(content);
            });

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

            // Generate pretty <a> from twitter username
            var generateUserHyperlink = function(username) {
                var generatedLink = username;

                // wrap url in <a></a>
                generatedLink = '<a href="http://twitter.com/' + username + '?ref=bundlin" target="_blank" class="user">@' + username + '</a>';

                return generatedLink;
            };

            // Generate pretty <a> from twitter username
            var generateHashtagSpan = function(hashtag) {
                var generatedSpan = hashtag;

                // wrap url in <a></a>
                generatedSpan = '<span class="hashtag">#' + hashtag + '</span>';

                return generatedSpan;

            };
        }
    };
});
