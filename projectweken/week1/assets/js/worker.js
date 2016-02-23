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
        apiType = 'koop',
        apiKey = 'e2d60e885b8742d4b0648300e3703bd7',
        apiPage = 1,     
        apiSize = 25, 
        apiQuery = 'amsterdam',
        apiURL = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/'+responseFormat+'/'+apiKey+'/?type='+apiType+'&zo=/'+apiQuery+'&page='+apiPage+'&pagesize='+apiSize+'';  
    
        //http://wiki.openstreetmap.org/wiki/Nominatim

    /* The Ajax (GET) Request with NanoAjax library */
    var xhrRequest = nanoajax.ajax({
        url: apiURL,
        method: 'GET'
    }, function (status, response) {
        var apiData = JSON.parse(response);
        /* Map & Iteratee + unique ID */
        var data = _.map(apiData.Objects, function (apiData, iteratee) {
            return apiData;
        });        
        if ( status == 200 ) { 
            postMessage(data);
            console.table(data);
        } else { 
            alert("Data could not be loaded from API");
        } 
    });

}, false);