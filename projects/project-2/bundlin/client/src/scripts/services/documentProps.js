/*
 * This service returns properties of the browser, document, agent or window
 *
 * Syntax:
 *  documentProps.getHeight();
 *  documentProps.isTouch();
 *
 */

app.service('documentProps', function() {

    this.getHeight = function() {
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    };

    this.isTouch = function() {
        return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    };

});
