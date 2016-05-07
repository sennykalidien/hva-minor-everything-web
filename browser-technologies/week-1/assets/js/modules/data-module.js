/********************************************************* 
	DATA REQUEST [with Web Worker + data from NY TIMES] 
*********************************************************/
// HTTPS request: http://api.nytimes.com/svc/topstories/v1/{section}.{response-format}?api-key={your-api-key}
// API KEY: af7f18026c501a31c7a66eea851e85f4:9:74334837    
APP.data = (function () {
    var init = function () {
        if (typeof (Worker) !== "undefined") {
            /* Web Worker: (src: https://mobilejquery.wordpress.com/2013/05/20/ajax-call-with-web-worker/) */
            var worker = new Worker('assets/js/worker.js'); // Constructer object: Worker.                               
            
            /* Send a message to the Web Worker */
            worker.message = function postToWorker() {
                    worker.postMessage("Do a new GET request please");
            }
            worker.message();
            //setInterval(worker.message, 30000);
                        
            /* Check if a message is received back from the Web Worker */
            worker.onmessage = function workerResultReceiver(e) {
                APP.router.init(e.data);
                APP.behaviour.loader();
                APP.behaviour.gestures();
            }
            worker.onerror = function workerErrorReceiver() {
                console.log("Something's wrong with the Web Worker. Gather around guys!");
            }

        } else { // Fallback: do a single GET request.
            /* The Ajax (GET) Request with NanoAjax library */
            var responseFormat = 'json',
                storySection = 'technology',
                apiKey = 'af7f18026c501a31c7a66eea851e85f4:9:74334837',
                apiURL = 'http://api.nytimes.com/svc/topstories/v1/' + storySection + '.' + responseFormat + '?api-key=' + apiKey + '';          
        
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
                    setInterval(function(){ APP.router.init(data) }, 3000);              
                    APP.behaviour.loader();
                    APP.behaviour.gestures();                    
                } else { 
                    alert("Data could not be loaded from API");
                }
            });
        }
    };
    
    return {
        init: init
    };    
    
})();