/*************************************************** 
	IMPORT SCRIPTS 
***************************************************/
importScripts('lib/nanoajax.min.js');
importScripts('lib/underscore.min.js');

/*************************************************** 
	WORKER MESSAGE 
***************************************************/
self.addEventListener('message', function (event) { // window.self
    var responseFormat = 'json',
        storySection = 'technology',
        apiKey = 'af7f18026c501a31c7a66eea851e85f4:9:74334837',
        apiURL = 'http://api.nytimes.com/svc/topstories/v1/' + storySection + '.' + responseFormat + '?api-key=' + apiKey + '';

    /* The Ajax (GET) Request with NanoAjax library */
    var xhrRequest = nanoajax.ajax({
        url: apiURL,
        method: 'GET'
    }, function (status, response) {
        var apiData = JSON.parse(response);
        /* Map & Iteratee + unique ID */
        var data = _.map(apiData.results, function (apiData, iteratee) {
            apiData.id = _.uniqueId('articleID=');
            return apiData;
        });        
        if ( status == 200 ) { 
            postMessage(data);
        } else { 
            alert("Data could not be loaded from API");
        } 
    });

}, false);