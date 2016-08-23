'use strict';

var currentCacheName = 'bundlin-assets-1.0';

this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(currentCacheName).then(function(cache) {
            console.log('caching', currentCacheName);
            return cache.addAll([
                './',
                '/css/app.css',
                '/css/vendor.css',
                '/js/app.js',
                '/js/vendor.js',
                '/sw.js',
                'lib/font-face-observer.min.js',
                '/views/app/intro.html?v=111111111',
                '/views/layouts/app.html?v=111111111',
                '/views/partials/bundletile.html?v=111111111',
                '/views/partials/sidebar.html?v=111111111',
                '/favicon.ico',
                '/images/logo.png',
                '/fonts/bundlin-icons/bundlin-icons.woff',
                '/fonts/proxima-nova/proximanova-regular.woff2',
                '/fonts/source-sans-pro/sourcesanspro-regular.woff2',
                '/fonts/source-sans-pro/sourcesanspro-bold.woff2',
                '/fonts/source-sans-pro/sourcesanspro-light.woff2',
                '/api/bundles/featured_popular',
                '/api/bundles/13880'
            ]);
        })      
    );
});

this.addEventListener('activate', function(event) {
	console.log('delete old caches');
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function(cacheName) {
						return cacheName.startsWith('bundlin-assets-1.');
					})
					.filter(function(cacheName) {
						return cacheName !== currentCacheName;
					})
					.map(function(cacheName) {
						console.log('deleted cache', cacheName);
						return caches.delete(cacheName);
					})
			);
		})
	);
});

this.addEventListener('fetch', function(event) {
    event.respondWith(        
        caches.match(event.request)
            .then(function(response) {
                if(response) {
                    //console.log('found cached response', response);
                    return response;
                } else {
                    //console.log('response not in cache, fetching it');
                    //return fetch(event.request);
                    return fetchAndCache(event);
                }
            })
    );
});

function fetchAndCache(event) {
    return fetch(event.request).then(function(response) {
        return caches.open('bundlin-other-1.0').then(function(cache) {
            console.log('fetched and caching', event.request);
            cache.put(event.request, response.clone());
            return response;
        });
    });
};