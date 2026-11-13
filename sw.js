// Offline-opslag voor "Trabajo remoto en español".
// Eigen voorvoegsel "rre-": ruim nooit caches van andere apps op ron78nl.github.io op.
const PREFIX = "rre-";
const CACHE = PREFIX + "2";   // verhoog het getal bij elke wijziging van de bestanden
const BESTANDEN = ["./", "./index.html", "./manifest.json", "./icon-180.png", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(BESTANDEN)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((namen) => Promise.all(
      namen.filter((n) => n.startsWith(PREFIX) && n !== CACHE).map((n) => caches.delete(n))
    )).then(() => self.clients.claim())
  );
});

// Eerst het netwerk (zodat nieuwe versies meteen doorkomen), anders de opgeslagen kopie.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== location.origin) return;
  event.respondWith(
    fetch(event.request).then((antw) => {
      const kopie = antw.clone();
      caches.open(CACHE).then((c) => c.put(event.request, kopie));
      return antw;
    }).catch(() => caches.match(event.request).then((r) => r || caches.match("./index.html")))
  );
});
