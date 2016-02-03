/*************************************************** 
	NAMESPACE 
***************************************************/

var APP = APP || { }; // Namespace als globale object. Zorgt ervoor dat je een nieuwe ruimte maakt binnen de 'window'. Hierdoor kan je conflicten voorkomen. Maar nooit 100%.

(function () {
	
	'use strict'; 	// Scrict is een nieuwe feature in ECMAScript 5. Met EMCAscript5 kunnen we een programma of een functie in strict javascripttaal plaatsen. Het kijkt naar fouten en schakelt features uit die slecht zijn bedacht. 


	/*************************************************** 
		GLOBALE VARIABELEN
	***************************************************/

		
	/*************************************************** 
		START de flow van de APP.
	***************************************************/
	
	APP.flow = { 	// Literal object: Flow. Vuur af!
		init: function () {	// Start/initialiseer object router met daarin de de essentiele methods om de APP te laten werken.
			APP.router.init();
			APP.pull.init();
			APP.gestures.init();
			APP.data.init();
		}
	};	


	/*************************************************** 
		De flow van de APP. 
	***************************************************/

	APP.router = { 	// Literal object: 'router'.
		init: function () { 			
	  		routie({	//Routie kijkt naar wat achter de # komt achter de link en selecteert het.
			    '/schedule': function() {
					APP.router.change();
			    },
			    '/schedule': function() {
					APP.router.change();
			    },
			    '/schedule/:gameID': function() {   
					//section = qwery('tr')[0];
					//section.classList.add('active');
					//APP.router.change();
			    },				    
			    '/gamePost/:gameID': function() {   
					APP.page.gamePost.get();					
					APP.router.change();
			    },	
			    '/ranking': function() {
					APP.router.change();
			    },		    
			    '*': function() {
					APP.router.change();
			    }
			});
		},
	
		change: function () { //Method: change. 
			var route = window.location.hash.slice(2,10), //voor pagina gamePost,
			    sections = qwery('#content section'),
			    section = qwery('[data-route=' + route + ']')[0];

			// Show active section, hide all others.
			if (section) {
			        for (var i=0; i < sections.length; i++) { // 3 sections.
						sections[i].classList.remove('active');
			        }
				section.classList.add('active');
			}
			
			// Default route
			if (!route) {
			    sections[0].classList.add('active');
			}
		}
	};
	
	
	APP.pull = {
		init: function() {
			var myScroll, pullDownEl, pullDownOffset;
			
			function loaded() {
				var pullDownEl = qwery('#pullDown')[0];
				var pullDownOffset = pullDownEl.offsetHeight; // Rekent uit hoe hoog de pullDownEl is.
				var pullDownLabel = qwery('.pullDownLabel')[0];
				var pullReleaseLabel = qwery('.pullReleaseLabel')[0];
				
				myScroll = new iScroll('wrapper', {
					useTransition: true,
					topOffset: pullDownOffset,
					onRefresh: function () {
						pullDownLabel.classList.add('active');
						pullReleaseLabel.classList.remove('active');
					},
					onScrollMove: function () {
					if (this.y > 30 && !pullDownEl.className.match('flip')) {
							pullDownEl.classList.add('flip');
							pullDownLabel.classList.remove('active');
							pullReleaseLabel.classList.add('active');
						} else if (this.y < 30 && pullDownEl.className.match('flip')) {
							pullDownEl.classList.remove('flip');
							pullDownLabel.classList.add('active');
							pullReleaseLabel.classList.remove('active');
						}
					},
					onScrollEnd: function () {
						if (pullDownEl.className.match('flip')) {
		
							var route = window.location.hash.slice(2,10);		
																						
							switch (route) {
							  	case "schedule":
							    	APP.page.schedule.get(); 
							   		console.log('Haal de Schedule opnieuw op'); 	
								break;
								case "ranking":
							    	APP.page.ranking.get(); 
							   		console.log('Haal de Ranking opnieuw op'); 	
							    break;
								default:
							    	console.log('Wat gaat er mis?');
							};
						}
					}						
				});
			}
			
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
			
			loaded();
		} 
	};
	
	APP.gestures = {
		init: function() {			
		    routie({
			    '/schedule': function() {
					$$('[data-route="schedule"]').swipeLeft(function() {
						window.location = 'index.html#/ranking'
						console.log('Je zit nu op de Ranking pagina');
					});		
			    },
			    '/gamePost': function() {   
					$$('[data-route="gamePost"]').swipeRight(function() {
						window.location = 'index.html#/schedule'
						console.log('Je zit nu op de Schedule pagina');
					});
			    },
			    '/ranking': function() {
					$$('[data-route="ranking"]').swipeRight(function() {
						window.location.replace("#/schedule");
						console.log('Je zit nu op de Schedule pagina');
					});
			    }
			});
		}
	};
	
	APP.data = {
		init: function(){
			APP.page.schedule.get();
			APP.page.ranking.get();
		}
	}
	
	
	/*************************************************** 
		Objecten met (JSON) data vanuit leaguevine. 
	***************************************************/
	/* 	
		HTTPS request: https://www.leaguevine.com/oauth2/token/?client_id=6cfe84f67e52ee62c42cc49ce218b2&client_secret=12f1d6247377f7d9fd82e17ca94294&grant_type=client_credentials&scope=universal
		Client ID: 6cfe84f67e52ee62c42cc49ce218b2
		Client Secret Key: 12f1d6247377f7d9fd82e17ca94294 
		Acces Token: 40e50065ad
	*/

	
	APP.page = {
		// Properties:
		schedule: {			    		    	
			get: function() { 		    		    	
				var type = 'GET';
				var url = 'https://api.leaguevine.com/v1/games/?pool_id=19221&access_token=40e50065ad';
				
				// Create GET request
				var http = new XMLHttpRequest();
				http.open(type,url,true);
				http.setRequestHeader('Content-type','application/json');
				http.setRequestHeader('Authorization','bearer 40e50065ad');
				http.send();			
				
				var loading = qwery('#loading-schedule')[0];
				loading.classList.add('active');	

	            var directives = {
                    objects: { 
                    	id: {
                    		href: function () {
                            	return "?action=Update+score#/gamePost/" + this.id;
                            },
							html: function(){
                            	return "Update score";
                            }                    	     
						}	
					}
	            }; // Sluit directives.				
								
				http.onreadystatechange = function() {
					if (http.readyState==4 && http.status==200) {			
						loading.classList.remove('active');
						
						var data = JSON.parse(http.responseText);			
						Transparency.render(qwery('[data-route="schedule"]')[0], data, directives);
					}
				}
			} 				 
		},		
		gamePost: {
			get: function() { 						
				// Haal gameID op!
				var gameUrl = window.location.toString(); 
				var split = gameUrl.split("/");
				var gameID = split[split.length - 1]; // pak laatste stukje van array
				
				var type = 'GET';
				var url = 'https://api.leaguevine.com/v1/games/'+gameID+'/?access_token=40e50065ad';
				
				// Create GET request
				var http = new XMLHttpRequest();
				http.open(type,url,true);
				http.setRequestHeader('Content-type','application/json');
				http.setRequestHeader('Authorization','bearer 40e50065ad');
				http.send();			
				
				var loading = qwery('#loading-gamePost')[0];
				loading.classList.add('active');	
	            
				http.onreadystatechange = function() {
					if (http.readyState==4 && http.status==200) {			
						loading.classList.remove('active');
						
						var data = JSON.parse(http.responseText);			
						Transparency.render(qwery('[data-route="gamePost"]')[0], data);
					}
				}
			},
			post: function() {	
				// Haal gameID op!
				var gameUrl = window.location.toString();
				var split = gameUrl.split("/");
				var gameID = split[split.length - 1];
				
				var type = 'POST';
				var url = 'https://api.leaguevine.com/v1/game_scores/';
				
				var loading = qwery('#loading-gamePost')[0];
				loading.classList.add('active');
				
				var inputScore1 = qwery('#inputScore1')[0].value;
				var inputScore2 = qwery('#inputScore2')[0].value;
				
				var postData = JSON.stringify({
					game_id: gameID,
					team_1_score: inputScore1,
					team_2_score: inputScore2,
					is_final: 'true'
				});						
				
				// Create POST request
				var http = new XMLHttpRequest();
				http.open(type,url,true);
				http.setRequestHeader('Content-type','application/json');
				http.setRequestHeader('Authorization','bearer 40e50065ad');
				http.send(postData);			
				
				http.onreadystatechange = function() {
					if (http.readyState==4 && http.status==201) {			
						loading.classList.remove('active');	
						window.location = 'index.html#/schedule/'+gameID;					
					}
				}
			}
		},		 
		ranking: {	
			get: function() { 						
				var type = 'GET';
				var url = 'https://api.leaguevine.com/v1/pools/19221/?access_token=40e50065ad';
				
				// Create GET request
				var http = new XMLHttpRequest();
				http.open(type,url,true);
				http.setRequestHeader('Content-type','application/json');
				http.setRequestHeader('Authorization','bearer 40e50065ad');
				http.send();			
				
				var loading = qwery('#loading-ranking')[0];
				loading.classList.add('active');
							
				http.onreadystatechange = function() {
					if (http.readyState==4 && http.status==200) {			
						loading.classList.remove('active');
												
						var data = JSON.parse(http.responseText);									
						Transparency.render(qwery('[data-route="ranking"]')[0], data);
					}
				}
			}		
		}
	}; // Sluit APP.page af.	
	   
    
	/*************************************************** 
		IS DOM READY? FIRE!
	***************************************************/
    
	// DOM ready functie. Als pagina geladen is > start flow van applicatie.
	domready(function () {
		// Start/initialiseer controller en daarbij dus de hele applicatie
		APP.flow.init(); //start 'init'-method van 'flow'-object.
	});

	
})();	