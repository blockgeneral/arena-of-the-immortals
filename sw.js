const FILES = ["./","manifest.webmanifest","icons/icon-192.png","assets/zen-antique-latin-400-normal-BA1dK512.woff2","assets/alegreya-sans-latin-400-normal-DtLlO8BS.woff2","assets/alegreya-sans-latin-500-normal-DS713u5J.woff2","assets/alegreya-sans-latin-700-normal-DEbcy2sF.woff2","assets/alegreya-sans-latin-800-normal-CpHsWMQ0.woff2","assets/Knight-Da1lgcRZ.glbz","assets/Mage-7d_Zc7Lt.glbz","assets/Barbarian-y3mX4lQZ.glbz","assets/Rogue-DuQV4Dt5.glbz","assets/Rogue_Hooded-BS0hLHPt.glbz","assets/index-S_JSx6_R.css","assets/index-BKVPsxZt.js"];
const CACHE = 'aoi-2026-11-20T09:32';
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).catch(() => undefined).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) => e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith('aoi-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('./', copy)); return res; }).catch(() => caches.match('./')));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return res; })));
});
