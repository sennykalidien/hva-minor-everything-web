APP.storage = (function () {
	function init() { // src: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
		/* Local Storage array  */
	    if (localStorage.getItem("houseID") === null || localStorage.getItem("houseID") === "") {
	        var arrayID = [];
	    } else {
	        var arrayID = JSON.parse(localStorage.getItem('houseID'));
	    }

		// Create a new variable newArrayID for dynamic adding favourites.
	    var newArrayID = arrayID;

		// Find button
		var _favouriteButton = document.querySelectorAll('.favourite-btn');

		// Check if ID is stored in array and make button active
		[].forEach.call(newArrayID, function(ID) {
			var _favouriteButtonID = document.querySelector('.favourite-btn[value="' + ID + '"]');
			if(_favouriteButtonID) {
				_favouriteButtonID.classList.add('active');
			}
	 	});

		// Favourite button eventlistener
		[].forEach.call(_favouriteButton, function(button) {
            //var buttonID = button.getAttribute('data-id');
            button.addEventListener('click', storeID, false);
        });

		function storeID(event) {
			event.preventDefault()
            var clickedID = this.getAttribute('value');
            arrayID.push(clickedID);

			// Remove class
			this.classList.remove('active');

			/*  CHECK FOR DUPLICATED ID's - src: https://jsfiddle.net/BumbleB2na/XvgTb/1/ */
            for (var h = 0; h < newArrayID.length; h++) {
                var curItem = newArrayID[h],
                    foundCount = 0;
                // search array for item
                for (var i = 0; i < newArrayID.length; i++) {
                    if (newArrayID[i] == arrayID[h])
                        foundCount++;
                }
                if (foundCount > 1) {
                    // remove repeated item from new array
                    for (var j = 0; j < newArrayID.length; j++) {
                        if (newArrayID[j] == curItem) {
                            newArrayID.splice(j, 1);
                            j = j - 1;
                            //this.classList.remove('active');
                            //this.innerHTML = 'Add to favourites';
                        }
                    }
                }
            };

			// Check if ID is stored in array and make button active
			[].forEach.call(newArrayID, function(ID) {
				var _favouriteButtonID = document.querySelector('.favourite-btn[value="' + ID + '"]');
				if(_favouriteButtonID) {
					_favouriteButtonID.classList.add('active');
				}
			});

			addStorage('houseID', newArrayID);
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
    };

	return {
        init: init
    };

})();
