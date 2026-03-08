
const CACHE = "nibble-notes-v1";
const urls = ["/","/index.html","/styles.css","/app.js","/manifest.json"];

self.addEventListener("install", e=>{
e.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(urls)));
});

self.addEventListener("fetch", e=>{
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
