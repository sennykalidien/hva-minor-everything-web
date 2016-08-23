app.filter('bundlinRaw', function($sce) {
    return function(input) {
        return $sce.trustAsHtml(input);
    };
});