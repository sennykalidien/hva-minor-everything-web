/*************************************************** 
	NAMESPACE 
***************************************************/
var APP = APP || { };

/*************************************************** 
	IIFE 
***************************************************/
(function () {
	'use strict';


	/*************************************************** 
		GLOBALE VARIABELEN
	***************************************************/
    var sections = document.querySelectorAll("section"); 	    	 	  		
		
		
	/*************************************************** 
		START de flow van de APP.
	***************************************************/
	APP.launch = { 	// Literal object: Launch.
		init: function () { // Method: functie binnen een literal object.
			APP.router.init();
			APP.data.init();
		}
	};	


	/*************************************************** 
		De flow van de APP. 
	***************************************************/
	APP.router = { 	// Literal object: 'router'.  
		init: function () { 				
	  		routie({ //Routie kijkt naar wat achter de # komt van de link en selecteert dat.
			    sections: function() {
					APP.router.toggle(window.location.hash);
			    },	    
			    '*': function() {
					APP.router.toggle(window.location.hash);
			    }
			});
		},	
		toggle: function (route) {            
            for (var i = 0; i < sections.length; i++) { // For loop to check all sections.
                sections[i].classList.add('inactive'); // add inactive to ALL sections first.                                
                
                if (!route) {  // Default route
                    sections[0].classList.remove('inactive'); // remove inactive if no hashtag in the link                
                } else {
                    document.querySelector(route).classList.remove('inactive'); //remove inactive to the section that corresponds with the hashtag in the link.                    
                }
            }
		}
	};
	
	
	APP.data = {
		init: function(){
			APP.page.topStories.get();
		}
	}
	
	
	/*************************************************** 
		Pagina's met (JSON) data, vanuit NY TIMES. 
	***************************************************/
	/* 	
		HTTPS request: http://api.nytimes.com/svc/topstories/v1/{section}.{response-format}?api-key={your-api-key}
		API KEY: af7f18026c501a31c7a66eea851e85f4:9:74334837
	*/
	APP.page = {
		topStories: {			    		    	
			get: function() {
    			var responseFormat = 'json',
    			    storySection = 'technology',
    			    apiKey = 'af7f18026c501a31c7a66eea851e85f4:9:74334837',
                    apiURL = 'http://api.nytimes.com/svc/topstories/v1/'+storySection+'.'+responseFormat+'?api-key='+apiKey+'';                   
                
                /* The Ajax Request (GET) with NanoAjax library */
                var xhrRequest = nanoajax.ajax({
                        url: apiURL,
                        method: 'GET'
                }, function (code, responseText) {
                        var data = JSON.parse(responseText);
                        console.log(data);
                        Transparency.render(document.querySelector('[data-route="top-stories"]'), data, directives);                        
                })	 
                
                /* Directives needed for Transparency to manipulate data-bind */
                var directives = {
                    results: {
                        /* 
                    	url: {
                    		href: function () {
                                return this.url;
                            },
							html: function(){
                            	return "Read more";
                            }                    	     
						},
						*/
						multimedia: {
    						url: {
        						src: function () {
            						return this.url
        						}
    						}	
						}	
					}
	            };
			}  // Sluit APP.page.topStories.get				 
		} // Sluit APP.page.topStories
	}; // Sluit APP.page.	
	   
    
    APP.launch.init();
	
})();	