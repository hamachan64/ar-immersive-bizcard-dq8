const cacheName = "DefaultCompany-DegitalCard-0.1.0";
const contentToCache = [
    "Build/a92614ce87c03e1709233fde2c1e15c9.loader.js",
    "Build/50bec446c21d14e7133db4f13f7ff6b5.framework.js",
    "Build/428cd9895b29a277143363c2d693f070.data",
    "Build/5feecc18144209bd1d12870b833d9aa7.wasm",
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
