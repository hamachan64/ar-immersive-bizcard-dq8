const cacheName = "DefaultCompany-DegitalCard-0.1.0";
const contentToCache = [
    "Build/c88a2803d760abad6d7c687d68375389.loader.js",
    "Build/96a8b008cf6ed3e9cec92564dd0a5bab.framework.js",
    "Build/2d177970507714eeefc61557e25c7067.data",
    "Build/75b2d8c521a37ec6c737ac5b966f406f.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
