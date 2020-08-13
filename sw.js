const CACHE_NAME = "spaceunknown-v10";
const fileToCache = [
    "/",
    "/nav.html",
    "/pages/home.html",
    "/pages/contact.html",
    "/pages/about.html",
    "/img/bumi.jpg",
    "/img/jupiter.jpg",
    "/img/mars.jpg",
    "/img/matahari.jpg",
    "/img/mercury.jpg",
    "/img/neptune.jpg",
    "/img/saturnus.jpg",
    "/img/uranus.jpg",
    "/img/venus.jpg",
    "/detail/bumi.html",
    "/detail/jupiter.html",
    "/detail/mars.html",
    "/detail/matahari.html",
    "/detail/merkurius.html",
    "/detail/neptunus.html",
    "/detail/saturnus.html",
    "/detail/uranus.html",
    "/detail/venus.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
];

self.addEventListener("install", event => {
    console.log('[Service Worker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(fileToCache)
        })
        .catch(error => console.log(error))
    )
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(r => {
            console.log('Service Worker Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    console.log('Service Worker Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })
    )
})

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keylist => {
            return Promise.all(keylist.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }))
        })
    )
});