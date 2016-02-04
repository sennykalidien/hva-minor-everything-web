var APP = APP || {}; // Namespace als globale object. Zorgt ervoor dat je een nieuwe ruimte maakt binnen de 'window'. Hierdoor kan je conflicten voorkomen. Maar nooit 100%.

(function () {
    'use strict'; // Scrict is een nieuwe feature in ECMAScript 5. Met EMCAscript5 kunnen we een programma of een functie in strict javascripttaal plaatsen. Het kijkt naar fouten en schakelt features uit die slecht zijn bedacht.

    APP.myApp = { // Literal object =)
        init: function () {
            APP.routes.init();
        }
    };

    APP.routes = {
        init: function (event) {
            window.addEventListener("hashchange", APP.sections.toggle); // if hashtag has change, toggle please.
            window.addEventListener("load", APP.sections.toggle); // on load: toggle too please!
        }
    };

    APP.sections = {
        toggle: function () {
            var currentHash = location.hash,
                sections = document.querySelectorAll("section");
            
            for (var i = 0; i < sections.length; i++) {
                sections[i].classList.add('inactive'); // add inactive to ALL sections                                 
                
                // Default route
                if (!currentHash) {
                    sections[0].classList.remove('inactive');  // remove inactive                 
                } else {
                    document.querySelector(currentHash).classList.remove('inactive'); //remove inactive                   
                }
            }
        }   
    };

    APP.myApp.init();

})();


