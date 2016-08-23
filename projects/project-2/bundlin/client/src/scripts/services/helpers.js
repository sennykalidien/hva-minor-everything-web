app.service('helpers', function() {

    this.moveItemThroughArray = function(array, old_index, new_index) {
        if (new_index > array.length + 1 || new_index < 0) return array;
        array.splice(new_index, 0, array.splice(old_index, 1)[0]);
        return array;
    };

    this.checkIfElementIsBelow = function(element, selector) {
        $element = $(element);
        var self = false;
        $(selector).each(function (idx, match) {
            if(!self) {
                self = $element.get(0) === match;
                return;
            }
        });
        var parents = $element.parents(selector);
        return (!! parents.length || self);
    };
});