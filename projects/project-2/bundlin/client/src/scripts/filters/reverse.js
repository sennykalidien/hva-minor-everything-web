app.filter('reverse', function() {
    return function(items) {
        if(typeof items !== 'object') return items;
        return items.slice().reverse();
    };
});