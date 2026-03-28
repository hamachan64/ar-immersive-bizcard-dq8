const cacheName = "DefaultCompany-DegitalCard-0.1.0";
const contentToCache = [
    "Build/cd9b53ac03142b2718955580a8d9c1de.loader.js",
    "Build/96a8b008cf6ed3e9cec92564dd0a5bab.framework.js",
    "Build/622af145435c6149213c4feae90ac19e.data",
    "Build/ce2e0630cce4990a5bb8a1f435cdca6c.wasm",
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
