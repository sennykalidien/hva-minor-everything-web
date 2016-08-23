/*
 * This service can freeze the browsers scroll
 *
 * Syntax:
 *  scrollToggler.enable();
 *  scrollToggler.disable();
 *  scrollToggler.toggle();
 *  scrollToggler.status();
 *
 */

app.service('scrollToggler', function() {

    var scrollEnabled = true;
    var body = angular.element(document.querySelector('body'));

    this.enable = function() {
        body.removeClass('no-scroll');
        scrollEnabled = true;
    };

    this.disable = function() {
        body.addClass('no-scroll');
        scrollEnabled = false;
    };

    this.toggle = function() {
        scrollEnabled ? this.disableStatus() : this.enableStatus();
    };

    this.status = scrollEnabled;

});
