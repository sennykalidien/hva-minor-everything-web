/*********************************************************
	NAMESPACE
*********************************************************/
var APP = APP || {};

/*********************************************************
    APP LAUNCHER
*********************************************************/
APP.launcher = (function() {

    function init() {
        document.addEventListener("DOMContentLoaded", function() {

            /* Feature Detection */
            if ((document.querySelectorAll || document.querySelector) && ('forEach' in Array.prototype)) {
                APP.data.storage();
            } else {}
        });
    };

    return {
        init: init
    };

}());

/*********************************************************
	DATA: SET LOCAL STORAGE (or COOKIE)
*********************************************************/
APP.data = (function() {

    /* Local Storage Checker (else: check cookie) */
    try { // src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        localStorage.test = 1; // Try to set a key + value in localstorage
        if (localStorage.getItem("shirtID") === null) {
            var arrayID = [];
        } else {
            var arrayID = JSON.parse(localStorage.getItem('shirtID'));
        }
    } catch (e) { // if localstorage fails, make a cookie
        function readCookie(key) {
            var nameEQ = key + "=";
            var ca = document.cookie.split(';');
            for (var i = 0, max = ca.length; i < max; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        var cookieID = readCookie("shirtID");
        if (cookieID === null) {
            var arrayID = [];
        } else {
            var arrayID = JSON.parse(cookieID);
        }
    }

    // Create a new variable newArrayID for dynamic adding favourites.
    var newArrayID = arrayID;

    // Global variables
    var _favouriteContainers = document.querySelectorAll('.favourites__container');
    var _favouriteButtons = document.querySelectorAll('.shirts__favourite__btn');

    // Add favourites to list according to newArrayID
    [].forEach.call(newArrayID, function(ID) {
        var _favouriteContainers = document.querySelector('#favourite-' + ID + '');
        _favouriteContainers.classList.add('favourites__container--active');


        var _shirtFavouriteButtons = document.querySelector('.shirts__favourite__btn[value="' + ID + '"]');
        _shirtFavouriteButtons.classList.add('active');
        _shirtFavouriteButtons.innerHTML = 'Remove from favourites';
    });

    // Storage function for dynamically adding new IDs to newArrayID based on click on add button.
    function storage() {
        [].forEach.call(_favouriteButtons, function(button) {
            button.addEventListener('click', storeID, false);
        });

        function storeID(event) {
            event.preventDefault()
            var clickedID = this.getAttribute('value');
            arrayID.push(clickedID);

            this.classList.add('active');
            this.innerHTML = 'Remove from favourites';

            [].forEach.call(_favouriteContainers, function(container) {
                container.classList.remove('favourites__container--active');
            });


            /*  CHECK FOR DUPLICATED ID's - src: https://jsfiddle.net/BumbleB2na/XvgTb/1/ */
            for (var h = 0; h < arrayID.length; h++) {
                var curItem = arrayID[h],
                    foundCount = 0;
                // search array for item
                for (var i = 0; i < arrayID.length; i++) {
                    if (arrayID[i] == arrayID[h])
                        foundCount++;
                }
                if (foundCount > 1) {
                    // remove repeated item from new array
                    for (var j = 0; j < newArrayID.length; j++) {
                        if (newArrayID[j] == curItem) {
                            newArrayID.splice(j, 1);
                            j = j - 1;
                            this.classList.remove('active');
                            this.innerHTML = 'Add to favourites';
                        }
                    }
                }
            };

            [].forEach.call(newArrayID, function(ID) {
                var _favouriteContainers = document.querySelector('#favourite-' + ID + '');
                _favouriteContainers.classList.add('favourites__container--active');


                var _shirtFavouriteButtons = document.querySelector('.shirts__favourite__btn[value="' + ID + '"]');
                _shirtFavouriteButtons.classList.add('active');
                _shirtFavouriteButtons.innerHTML = 'Remove from favourites';
            });

            addStorage('shirtID', newArrayID);
        };
    };

    function addStorage(key, value) { // src: https://gist.github.com/Fluidbyte/4718380
        var lsSupport;

        try {
            localStorage.test = 1;
            lsSupport = true;
        } catch (e) {
            lsSupport = false;
        }

        // If value is detected, set new or modify store
        if (typeof value !== "undefined" && value !== null) {
            // Convert object values to JSON
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            // Set the store
            if (lsSupport) { // Native support
                localStorage.setItem(key, value);
            } else { // Use Cookie
                createCookie(key, value, 30);
            }
        }

        // No value supplied, return value
        if (typeof value === "undefined") {
            // Get value
            if (lsSupport) { // Native support
                data = localStorage.getItem(key);
            } else { // Use cookie
                data = readCookie(key);
            }

            // Try to parse JSON...
            try {
                data = JSON.parse(data);
            } catch (e) {
                data = data;
            }

            return data;

        }

        // Null specified, remove store
        if (value === null) {
            if (lsSupport) { // Native support
                localStorage.removeItem(key);
            } else { // Use cookie
                createCookie(key, '', -1);
            }
        }

        /**
         * Creates new cookie or removes cookie with negative expiration
         * @param  key       The key or identifier for the store
         * @param  value     Contents of the store
         * @param  exp       Expiration - creation defaults to 30 days
         */
        function createCookie(key, value, exp) {
            var date = new Date();
            date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
            document.cookie = key + "=" + value + expires + "; path=/";
        }

        /**
         * Returns contents of cookie
         * @param  key       The key or identifier for the store
         */
        function readCookie(key) {
            var nameEQ = key + "=";
            var ca = document.cookie.split(';');
            for (var i = 0, max = ca.length; i < max; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
    };

    return {
        storage: storage,
        addStorage: addStorage
    };

})();


APP.launcher.init();
