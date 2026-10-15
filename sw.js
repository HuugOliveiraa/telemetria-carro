// Service worker da Telemetria: deixa o app abrir mesmo sem internet.
// Ao publicar uma versão nova do index.html, troque o número abaixo (v1 -> v2...).
const CACHE = 'telemetria-v1';
const APP_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('telemetria-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const scope = new URL(self.registration.scope);

  if (req.mode === 'navigate') {
    if (!url.pathname.startsWith(scope.pathname)) return;
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  const mine = url.origin === self.location.origin && url.pathname.startsWith(scope.pathname);
  if (!mine && !isFont) return;

  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req).then(cached => {
        const network = fetch(req)
          .then(res => { if (res.ok || res.type === 'opaque') cache.put(req, res.clone()); return res; })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});
