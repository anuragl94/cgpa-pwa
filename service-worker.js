const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  "/",
  "assets/logo-16x16.png",
  "assets/logo-32x32.png",
  "assets/logo-192x192.png",
  "assets/logo-apple-180x180.png",
  "/styles/main.css",
  "/scripts/app.js"
];

self.addEventListener('install', function (event) {
  console.log('[Service Worker] Installing Service Worker...', event);
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function (event) {
  console.log('[Service Worker] Activating Service Worker...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          // let's not add to the cache for now
          // cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});