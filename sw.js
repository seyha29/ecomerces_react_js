const CACHE_NAME = 'techtrend-v2';
const urlsToCache = [
  '/ecomerces_react_js/',
  '/ecomerces_react_js/index.html',
  '/ecomerces_react_js/static/js/main.js',
  '/ecomerces_react_js/static/js/bundle.js', // Added bundle.js
  '/ecomerces_react_js/static/css/main.css',
  '/ecomerces_react_js/fallback-image.png',
  '/ecomerces_react_js/offline.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching resources:', urlsToCache);
      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).then(() => {
            console.log(`Cached: ${url}`);
            return url;
          }).catch((error) => {
            console.error(`Failed to cache ${url}:`, error);
            return null;
          })
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  const normalizedUrl = requestUrl.pathname.startsWith('/ecomerces_react_js')
    ? requestUrl.pathname
    : `/ecomerces_react_js${requestUrl.pathname}`;
  const normalizedRequest = new Request(normalizedUrl, event.request);

  event.respondWith(
    caches.match(normalizedRequest).then((response) => {
      if (response) {
        console.log('Serving from cache:', normalizedRequest.url);
        return response;
      }
      return fetch(event.request).then((networkResponse) => {
        if (event.request.destination === 'image' && networkResponse.ok) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(normalizedRequest, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      }).catch((error) => {
        console.error('Fetch failed for:', event.request.url, error.message);
        if (event.request.destination === 'image') {
          return caches.match('/ecomerces_react_js/fallback-image.png');
        }
        return caches.match('/ecomerces_react_js/offline.html');
      });
    })
  );
});