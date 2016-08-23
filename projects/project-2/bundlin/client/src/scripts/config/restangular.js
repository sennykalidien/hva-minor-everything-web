app.config(function(RestangularProvider) {

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setFullResponse(true);

    RestangularProvider.addResponseInterceptor(function(response, operation) {
        if (!response || !response.data) return response;

        var newResponse = response.data;

        if (operation === 'get' || operation === 'post') {
            newResponse = newResponse[0];
        }

        return newResponse;
    });

});
