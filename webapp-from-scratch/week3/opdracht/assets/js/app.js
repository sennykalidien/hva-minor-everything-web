/********************************************************* 
	NAMESPACE 
*********************************************************/
var APP = APP || {};

/********************************************************* 
	IIFE 
*********************************************************/
(function () {
    'use strict';

    /********************************************************* 
    	LAUNCH APP
    *********************************************************/
    APP.launch = { // Literal object: Launch. Ready for launch?
        init: function () { // Method: function inside a literal object.
            APP.data.init(); // Initiate function.
        }
    };

    /********************************************************* 
    	DATA REQUEST [with Web Worker + data from NY TIMES] 
    *********************************************************/
    // HTTPS request: http://api.nytimes.com/svc/topstories/v1/{section}.{response-format}?api-key={your-api-key}
    // API KEY: af7f18026c501a31c7a66eea851e85f4:9:74334837    
    APP.data = {
        init: function () {
            if (typeof (Worker) !== "undefined") {
                // Web Worker: (src: https://mobilejquery.wordpress.com/2013/05/20/ajax-call-with-web-worker/)
                var worker = new Worker('assets/js/worker.js'); // Constructer object: Worker.
                //worker.onmessage = workerResultReceiver;
                //worker.onerror = workerErrorReceiver;                                
                worker.message = function postToWorker() {
                    console.log("I just sent a message to the Web Worker, okay?");                    
                    worker.postMessage("");
                }
                worker.onmessage = function workerResultReceiver(e) {
                    console.log("I received word back from the Web Worker, it's al goooooddd");                    
                    APP.router.init(e.data);
                }
                worker.onerror = function workerErrorReceiver() {
                    console.log("Something's wrong with the Web Worker. Gather around guys!");
                }
                worker.message();
                setInterval(worker.message, 10000);
            } else { // Fallback: do a single GET request.
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
                    APP.router.init(data);
                });
            }
        }
    };

    /*********************************************************  
    	ROUTER [with lib: Routie]
    *********************************************************/
    APP.router = { // Literal object: 'router'.  
        init: function (data) {
            routie({ // Routie checks what comes behind the hashtag (#) of the link and selects it. 
                'top-story/:articleID': function (articleID) {
                    APP.router.toggle(window.location.hash.slice(0, 10)); //only get the hashtag
                    APP.page.topStory.init(data, articleID); // Page templating
                },
                '': function () {
                    APP.router.toggle(window.location.hash);
                    APP.page.topStories.init(data); // Page templating
                }
            });
        },
        toggle: function (route) {
            var sections = document.querySelectorAll('section');
            for (var i = 0; i < sections.length; i++) { // For loop to check all sections.
                sections[i].classList.add('inactive'); // add inactive to ALL sections first.                                

                if (!route) { // Default route
                    sections[0].classList.remove('inactive'); // remove inactive if no hashtag in the link                
                } else {
                    document.querySelector(route).classList.remove('inactive'); //remove inactive to the section that corresponds with the hashtag in the link.                    
                }
            }
        }
    };

    /********************************************************* 
    	PAGES [with templating lib: Mustache]
    *********************************************************/
    APP.page = {
        topStories: {
            init: function (data) {
                
                /* Templating with Mustache */
                nanoajax.ajax({
                    url: 'assets/templates/top-stories.mst' // Get the template.
                }, function (code, template) {
                    document.querySelector('#top-stories').innerHTML = Mustache.render(template, data);
                    console.log("Very funny... Now I'm supposed to say: \"But you'll shave it for later\", right?");
                });
                
                console.log("I mustache you a question!");
            }
        },
        topStory: {
            init: function (data, articleID) {

                /* Filter with Underscore */
                var detailData = _.filter(data, {
                    id: articleID
                });

                /* Templating with Mustache */
                nanoajax.ajax({
                    url: 'assets/templates/top-story.mst' // Get the template.
                }, function (code, template) {
                    document.querySelector('#top-story').innerHTML = Mustache.render(template, detailData);
                    console.log("D'oh...");
                });

                console.log("But in all seriousness though: can eyebrowse your computer?");
            }
        }
    };

    /********************************************************* 
    	DOCUMENT READY
    *********************************************************/
    document.addEventListener("DOMContentLoaded", function () { // Not supported by IE8, but screw IE8 anyways ;)
        APP.launch.init(); // Initiate the launch of the app! **WOOOSHHH** (sound of the app getting launched)...
    });

})();