/********************************************************* 
	NAMESPACE 
*********************************************************/
var APP = APP || {};

/********************************************************* 
    LAUNCH APP
*********************************************************/ 
APP.launcher = (function () {
     
    function init() {     
        document.addEventListener("DOMContentLoaded", function () { 
            APP.data.init();
        });            
    };    
    
    return { 
        init: init
    };
    
}());

APP.launcher.init();