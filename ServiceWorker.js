const cacheName = "DefaultCompany-DegitalCard-0.1.0";
const contentToCache = [
    "Build/66548299cec6690dc01315b0cc335ffd.loader.js",
    "Build/96a8b008cf6ed3e9cec92564dd0a5bab.framework.js",
    "Build/bf73bbce18a7db9383c27f93899937c5.data",
    "Build/547a6d41631a2c50a9054ddbaf467f37.wasm",
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
