const cacheName = "DefaultCompany-DegitalCard-0.1.0";
const contentToCache = [
    "Build/184532523dae514184140c5ca4712f97.loader.js",
    "Build/96a8b008cf6ed3e9cec92564dd0a5bab.framework.js",
    "Build/6eb131fbe71ff3d014e47288fdf77d15.data",
    "Build/18d4a11a68acf904dbb85f1cbd20813a.wasm",
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
