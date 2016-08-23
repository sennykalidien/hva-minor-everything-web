app.filter('bundlinPlural', function () {
    return function (input) {
        var pluralInput = input;

        if(input[input.length - 1] === 's') {
            input += 'es';
        } else if(input[input.length - 1] === 'y') {
            input = input.substr(0, input.length - 1);
            input += 'ies';
        } else {
            input += 's';
        }

        return input;
    };
});