const preCacheName = "pre-cache-pra",
  // llistats d'arxius estatics per a afegir a la cache (css, scripts, imatges,....)
  preCacheFiles = [
    "/",
    "/index.html",
    "css/main.css",
    "js/app.js",
    "/favicon.ico",
    "https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  ];

self.addEventListener("install", event => {
  console.log("installing precached files");
  caches.open(preCacheName).then(function (cache) {
    return cache.addAll(preCacheFiles);
  })
});

self.addEventListener("activate", event => {
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (!response) {
        //fall back to the network fetch
        return fetch(event.request);
      }
      return response;
    })
  )
});

