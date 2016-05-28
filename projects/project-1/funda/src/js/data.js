/*********************************************************
	DATA REQUEST
*********************************************************/
APP.data = ( (city) => {
    function request(url) { // src: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload =  () => {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror =  () => {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    };

    function getHouses(city) {
        var objectType = 'json',
            apiKey = 'e2d60e885b8742d4b0648300e3703bd7',
            type = 'koop',
            city = city,
            pageNumber = '1',
            pageSize = '25',
            apiURL = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/'+ objectType + '/'+ apiKey + '/?type=' + type + '&zo=/' + city + '&page=' + pageNumber + '&pagesize=' + pageSize + '';

        this.request(apiURL)
            .then( (response) => {
                var houseData = JSON.parse(response);
                var houseIDs = [];

                // [].forEach.call(houseData.Objects,(house) => {
                //     if(house.HeeftVideo == true) {
                //         var IDs = {
                //             id: house.Id
                //         };
                //         houseIDs.push(IDs);
                //     }
                // });

                houseData.Objects.forEach((house) => {
                    if(house.HeeftVideo == true) {
                        var IDs = {
                            id: house.Id
                        };
                        houseIDs.push(IDs);
                    }
                });

                APP.router.init(houseIDs, city);
            })
    };

    function getHouseFavourites(city) {
        var objectType = 'json',
            apiKey = 'e2d60e885b8742d4b0648300e3703bd7',
            type = 'koop',
            city = city,
            pageNumber = '1',
            pageSize = '25',
            apiURL = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/'+ objectType + '/'+ apiKey + '/?type=' + type + '&zo=/' + city + '&page=' + pageNumber + '&pagesize=' + pageSize + '';

        this.request(apiURL)
            .then( (response) => {
                var houseData = JSON.parse(response);

                var data = [];

                [].forEach.call(houseData.Objects, function (object) {
                    var objects = {
                        id: object.Id,
                        title: object.Adres,
                        photo: object.FotoLargest,
                        postalcode: object.Postcode,
                        place: object.Woonplaats,
                        price: object.Prijs.Koopprijs
                    };
                    data.push(objects);
                });

                APP.page.houseFavourites(data);
            })
    };

    function getHouseDetail(ID) {
        var objectType = 'json',
            apiKey = 'e2d60e885b8742d4b0648300e3703bd7',
            ID = ID,
            type = 'koop',
            apiURL = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/' + objectType + '/detail/' + apiKey + '/' + type + '/' + ID + '/';


        this.request(apiURL)
            .then( (response) => {
                var houseData = JSON.parse(response);

                var i, media, j, mediaItems, largePhotosUrl;
                var photos = [];
                for (i = 0; i < houseData.Media.length-12; i++) {
                  media = houseData.Media[i];
                  if(media.MediaItems[3] != undefined) {
                      largePhotosUrl = media.MediaItems[3].Url;
                  }
                  photos.push({photo: largePhotosUrl});
                }

                var data = [];
                var objects = {
                    id: houseData.InternalId,
                    title: houseData.Titels[0].Omschrijving,
                    photos: photos,
                    description: houseData.VolledigeOmschrijving,
                    price: houseData.KoopPrijs,
                    url: houseData.URL
                };
                data.push(objects);

                APP.page.houseDetail(data);
            })

    };

    function getHouseVideo(ID, houseIDs) {
        var objectType = 'json',
            apiKey = 'e2d60e885b8742d4b0648300e3703bd7',
            ID = ID,
            type = 'koop',
            apiURL = 'http://funda.kyrandia.nl/feeds/Aanbod.svc/' + objectType + '/detail/' + apiKey + '/' + type + '/' + ID + '/';


        this.request(apiURL)
            .then( (response) => {
                var houseDetailData = JSON.parse(response);

                // Get next ID in array
                var nextItem = (id) => {
                    var i = 0,
                    max = houseIDs.length;

                    for (i; i < max; i += 1) {
                        if (houseIDs[i].id === ID) {
                            return houseIDs[i + 1];
                        }
                    }
                    return 'not found';
                };

                // Get prev ID in array
                var prevItem = (id) => {
                    var i = 0,
                    max = houseIDs.length;

                    for(i; i < max; i += 1) {
                        if (houseIDs[i].id === ID) {
                            return houseIDs[i - 1];
                        }
                    }
                    return 'not found';
                };

                var nextID = nextItem(ID);
                var prevID = prevItem(ID);

                if(prevID == undefined) {
                    var data = {
                        id: ID,
                        nextID: nextID.id,
                        title: houseDetailData.Titels[0].Omschrijving,
                        buyPrice: houseDetailData.Prijs.Koopprijs,
                        videoURL: houseDetailData.Video.Videos[0].Cdns[0].Url
                    };
                } else if(nextID == undefined) {
                    var data = {
                        id: ID,
                        prevID: prevID.id,
                        title: houseDetailData.Titels[0].Omschrijving,
                        buyPrice: houseDetailData.Prijs.Koopprijs,
                        videoURL: houseDetailData.Video.Videos[0].Cdns[0].Url
                    };
                } else {
                    var data = {
                        id: ID,
                        nextID: nextID.id,
                        prevID: prevID.id,
                        title: houseDetailData.Titels[0].Omschrijving,
                        buyPrice: houseDetailData.Prijs.Koopprijs,
                        videoURL: houseDetailData.Video.Videos[0].Cdns[0].Url
                    };
                }

                APP.page.houseVideo(data);
            })
    };

    return {
        request: request,
        getHouses: getHouses,
        getHouseFavourites: getHouseFavourites,
        getHouseVideo: getHouseVideo,
        getHouseDetail, getHouseDetail
    };

})();
