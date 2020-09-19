self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open('static')
            .then(cache => {
                return cache.addAll(["./", "script/index.js", "index.html", "/css/style.css", "/images/logo192.png"])
            })
    )
})

self.addEventListener("activate", (event) => {
    console.log('Service Worker: Installed')
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request)
            })
    )
})