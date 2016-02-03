
var APP = APP || { }; // Namespace als globale object. Zorgt ervoor dat je een nieuwe ruimte maakt binnen de 'window'. Hierdoor kan je conflicten voorkomen. Maar nooit 100%.

(function () {
	'use strict'; 	// Scrict is een nieuwe feature in ECMAScript 5. Met EMCAscript5 kunnen we een programma of een functie in strict javascripttaal plaatsen. Het kijkt naar fouten en schakelt features uit die slecht zijn bedacht. 

	APP.flow = { 
        init: function() { 
            APP.routes.init();
            APP.sections.toggle();                 
        }
    };
    
	APP.routes = { 
        init: function() { 

        }    
    };    

	APP.sections = { 
        toggle: function() {
            window.location.hash = 'foobar';            
        }
    };
    
    APP.flow.init()

})();
    
    var MyApp = {
        handleHashChange : function(event){
            var currentHash = location.hash,
                message= document.getElementById("messageContainer");
            if(currentHash === "#name"){
                message.innerText ="Name: Sandeep";
            } else if(currentHash === "#subject"){
                message.innerText ="Name: Computer Science";
            }
        }
    };
    window.addEventListener("hashchange",MyApp.handleHashChange);
    window.addEventListener("load",MyApp.handleHashChange);
    Read more at http://www.tutorialsavvy.com/2015/02/javascript-hashchange-event-demo.html/#xHUrKRej5t0iKEeO.99;