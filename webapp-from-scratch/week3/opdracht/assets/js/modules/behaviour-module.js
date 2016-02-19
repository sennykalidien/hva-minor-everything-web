/********************************************************* 
	BEHAVIOUR [with gestures lib: Hammer.js ] 
*********************************************************/
APP.behaviour = (function () {
    var gestures = function () {
        document.addEventListener("touchstart", function () {}, true);
        var myElement = document.querySelector("#top-story");
        /* Swipe right: go back */
        var mc = new Hammer(myElement);
        mc.on("swiperight", function (ev) {
            window.history.back();
        });
        /* Swipe down: Pull Request */
        WebPullToRefresh.init( {
            loadingFunction: function() {
                return new Promise( function( resolve, reject ) {
                // Run some async loading code here
                var responseFormat = 'json',
                    storySection = 'technology',
                    apiKey = 'af7f18026c501a31c7a66eea851e85f4:9:74334837',
                    apiURL = 'http://api.nytimes.com/svc/topstories/v1/' + storySection + '.' + responseFormat + '?api-key=' + apiKey + '';
                if(1 === 1) {
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
                            APP.router.init(data);
                            console.log(data);
                            resolve();
                        } else { 
                            alert("Data could not be loaded from API");
                        }
                    });   
                } else {
                    reject();
                }
                });        
            }
        });
    };
    
    var loader = function () {
        var loader = document.getElementById('loader');
        setTimeout(function () {
                loader.classList.remove('active'); // Remove loader                         
            }, 2000) // Give a delay of 2 seconds          
    };
    
    return {
        gestures: gestures,
        loader: loader
    }       
    
})();
