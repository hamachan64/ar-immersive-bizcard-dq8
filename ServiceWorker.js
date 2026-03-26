const cacheName = "DefaultCompany-DegitalCard-0.1.0";
const contentToCache = [
    "Build/be42564869e0e00592d37a73e71a946f.loader.js",
    "Build/50bec446c21d14e7133db4f13f7ff6b5.framework.js",
    "Build/e6ce2e406dd28f2fd384aa3f331971b0.data",
    "Build/ab6a88ace5bd12d41d53463aaa994598.wasm",
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
