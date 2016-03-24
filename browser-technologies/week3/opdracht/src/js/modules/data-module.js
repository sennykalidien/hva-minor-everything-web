/********************************************************* 
	DATA REQUEST
*********************************************************/  
APP.data = (function () {
    
    /* Local Storage Checker (else: check cookie) */
    try { // src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        localStorage.test = 1;
        if (localStorage.getItem("shirtID") === null) {
            var arrayID = [];
            console.log(arrayID);
        } else {
            var arrayID = JSON.parse(localStorage.getItem('shirtID')); 
            console.log(arrayID);
        }
    } catch (e) {
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
        console.log(arrayID);
    }    
    var newArrayID = arrayID;
    
    function request(url) { // src: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    };

    function init() {
        APP.data.request('../opdracht/dist/data/shirts.json')
            .then(function (response) {
                var data = JSON.parse(response);
                APP.router.init(data);
            })
            .catch(function (err) {
                console.error('Oops, there was an error!', err.statusText);
            });
    };
    
    function storage(ID) { 
    
        var _favouriteButtons = document.querySelectorAll('.favourite__btn');
        
        [].forEach.call(_favouriteButtons, function(button) {
            //var buttonID = button.getAttribute('data-id');
            button.addEventListener('click', storeID, false);
        });       
        
        
        function storeID() {          
            var clickedID = this.getAttribute('data-id');
            arrayID.push(clickedID);
            this.classList.add('active');
            this.innerHTML = 'Remove from favourites';

            /*  CHECK FOR DUPLICATED ID's - src: https://jsfiddle.net/BumbleB2na/XvgTb/1/ */
            for(var h = 0; h < arrayID.length; h++) { 
                var curItem = arrayID[h],
                    foundCount = 0;
                // search array for item
                for(var i = 0; i < arrayID.length; i++) {
                    if (arrayID[i] == arrayID[h])
                        foundCount++;                   
                }
                if(foundCount > 1) {
                    // remove repeated item from new array
                    for(var j = 0; j < newArrayID.length; j++) {
                        if(newArrayID[j] == curItem) {                
                            newArrayID.splice(j, 1);
                            j = j - 1;
                            this.classList.remove('active');
                            console.log(this);
                            this.innerHTML = 'Add to favourites';
                        }
                    }            
                }
            };    
            
            console.log(newArrayID);
            //localStorage.setItem("shirtID", JSON.stringify(newArrayID));
            storageFallback('shirtID', newArrayID);
        }; 
    };
    
    function storageFallback (key, value) { // src: https://gist.github.com/Fluidbyte/4718380
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
            if ( typeof value === 'object' ) {
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
            }
            catch(e) {
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
        request: request,
        init: init,
        storage: storage,
        storageFallback: storageFallback
    };

})();