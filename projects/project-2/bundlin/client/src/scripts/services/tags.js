app.service('tags', function($q, Restangular) {

    var tagsPromise = Restangular.one('tags');

    this.load = function(query) {
        // should work with this promise
        var deferred = $q.defer();
        tagsPromise.getList('autocomplete', {search:query}).then(function(response){
            deferred.resolve(response.data);
        }, function(){
            deferred.reject();
        });
        
        return deferred.promise;
    };
});