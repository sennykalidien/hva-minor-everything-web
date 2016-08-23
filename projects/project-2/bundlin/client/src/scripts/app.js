'use strict';

// Initialize Angular app
var app = angular.module('bundlin', [
    'duScroll', // durated/angular-scroll: angular scrollTo function
    'ui.router', // to handle the dynamic views
    'ngAnimate',
    'restangular', // to handle API requests
    'angulartics', // Google Analytics for angular
    //'angulartics.google.analytics',
    'angularFileUpload',
    'ngTagsInput',
    'ng-fastclick',
    'toastr'
]);