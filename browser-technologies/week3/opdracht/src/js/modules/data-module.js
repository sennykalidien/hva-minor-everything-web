/********************************************************* 
	DATA REQUEST
*********************************************************/  
APP.data = (function () {
    
    /* GLOBAL VARIABLES */
    if (localStorage.getItem("shirtID") === null) { 
        var arrayID = [];
        console.log("Nieuw");
    } else {
        var arrayID = JSON.parse(localStorage.getItem('shirtID')); 
        console.log("Oud");
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
    
        var favouriteButtons = document.querySelectorAll('.favourite__btn');           
        
        [].forEach.call(favouriteButtons, function(button) {
            button.addEventListener('click', storeID, false);
        });   

        function storeID() {          
            var ID = this.getAttribute('data-id');
            arrayID.push(ID);
            
            /*  CHECK FOR DUPLICATED ID's - src: https://jsfiddle.net/BumbleB2na/XvgTb/1/ */
            for(var h = 0; h < arrayID.length; h++) { 
                var curItem = arrayID[h];
                var foundCount = 0;
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
                        }
                    }            
                }
            }    
            
            console.log(arrayID);
            localStorage.setItem("shirtID", JSON.stringify(newArrayID));
            window.location.reload();
        }; 
    };

    return {
        request: request,
        init: init,
        storage: storage
    };

})();