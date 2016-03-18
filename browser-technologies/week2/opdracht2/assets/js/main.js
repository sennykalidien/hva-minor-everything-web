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
    APP.launcher = { // Literal object: Launch. Ready for launch?
        init: function () { // Method: function inside a literal object.            
            APP.data.init(); // Initiate function  
        }
    };

    /********************************************************* 
    	DOCUMENT READY
    *********************************************************/
    document.addEventListener("DOMContentLoaded", function () { // Not supported by IE8, but screw IE8 anyways ;)
        APP.launcher.init(); // Initiate the launch of the app! **WOOOSHHH** (sound of the app getting launched)...
    });

})();