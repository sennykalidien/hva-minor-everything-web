var APP = APP || {}; // Namespace als globale object. Zorgt ervoor dat je een nieuwe ruimte (module) maakt binnen de 'window' ter beveiliging. Hierdoor kan je conflicten voorkomen met objects or variables (vooral bij toepassen van 3d party scripts). Maar nooit 100%. Daarnaast zijn de erg handig om blokken van functionaliteit beter the organiseren in mijn applicatie door ze een unieke identiteit mee te geven (zie APP.launch, APP.routes, APP.sections).

(function () { // IIFE: Immediately-invoked Function Expressions
    'use strict'; // Scrict is een nieuwe feature in ECMAScript 5. Met EMCAscript5 kunnen we een programma of een functie in strict javascripttaal plaatsen. Het kijkt naar fouten en schakelt features uit die slecht zijn bedacht.

    APP.launch = { // Literal object 
        init: function () {
            APP.routes.init(); // Fire object routes.
        }
    };

    APP.routes = {
        init: function () {                    
            window.addEventListener("hashchange", function () {
                APP.sections.toggle(location.hash)
            }); // if hashtag has change, toggle please.
            
            window.addEventListener("load", function () {
                APP.sections.toggle(location.hash)
            }); // on load: toggle too please!   
        }
    };

    APP.sections = {
        toggle: function (route) {
            var sections = document.querySelectorAll("section");
            
            for (var i = 0; i < sections.length; i++) { // For loop to check all sections.
                sections[i].classList.add('inactive'); // add inactive to ALL sections                                 
                
                if (!route) {  // Default route
                    sections[0].classList.remove('inactive');  // remove inactive if no hashtag in the link                
                } else {
                    document.querySelector(route).classList.remove('inactive'); //remove inactive to the section that corresponds with the hashtag in the links                    
                }
            }
        }   
    };

    APP.launch.init(); // fire object 'fire'.

})();