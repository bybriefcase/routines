// Service worker: caches the app shell so the app opens offline.
// To ship an update, bump CACHE (e.g. routines-v4): old caches are deleted on activate.
const CACHE = 'routines-v4';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  // add() one by one so a missing file doesn't stop the whole install
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((url) => c.add(url).catch(() => {})))));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()));
});

// Network first, cache as fallback: updates show up as soon as you're online, and the app still opens offline.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request)));
});
