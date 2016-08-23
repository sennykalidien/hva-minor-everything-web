/*********************************************************
	NAMESPACE
*********************************************************/
var APP = APP || {};
'use strict';

/*********************************************************
    LAUNCH APP
*********************************************************/
APP.launcher = (function () {

    function init() {
        document.addEventListener("DOMContentLoaded", function () {
            APP.geo.getLocation();
        });
    };

    return {
        init: init
    };

}());

APP.launcher.init();
