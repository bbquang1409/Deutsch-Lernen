// Bump this number whenever you change the list below or want to force a reset.
const CACHE = 'deutsch-lernen-v3';
const ASSETS = [
  './',
  './index.html',
  './grammatik.html',
  './wortschatz.html',
  './dashboard.html',
  './my-results.html',
  './manifest.json',
  './icon-192.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first: always try fresh files, fall back to cache only when offline.
// Only same-origin GET requests; big game files and Google/Apps Script calls pass through untouched.
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (url.pathname.includes('/Game/')) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok && ASSETS.some(a => a === './' ? url.pathname.endsWith('/') : url.pathname.endsWith(a.slice(1)))) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
