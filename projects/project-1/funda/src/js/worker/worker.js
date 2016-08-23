/***************************************************
	IMPORT SCRIPTS
***************************************************/
importScripts('app.min.js');
importScripts('lib/underscore.min.js');

/***************************************************
	WORKER MESSAGE
***************************************************/
self.addEventListener('message', function (event) { // window.self
    var responseFormat = 'json',
        storySection = 'technology',
        apiKey = 'af7f18026c501a31c7a66eea851e85f4:9:74334837',
        apiURL = 'http://api.nytimes.com/svc/topstories/v1/' + storySection + '.' + responseFormat + '?api-key=' + apiKey + '';

    APP.data.request(apiURL)
        .then(function (response) {
            var apiData = JSON.parse(response);
            /* Map & Iteratee + unique ID */
            var data = _.map(apiData.results, function (apiData, iteratee) {
                apiData.id = _.uniqueId('articleID=');
                return apiData;
            });
            postMessage(data);
        })
        .catch(function (err) {
            console.error('Oops, there was an error!', err.statusText);
        });

}, false);
