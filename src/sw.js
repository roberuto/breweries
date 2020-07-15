import { DEBUG } from './config';

const { assets } = global.serviceWorkerOption;

const STATIC_CACHE_NAME = 'breweries-static-v2';
const DYNAMIC_CACHE_NAME = 'breweries-dynamic-v2';

const urlsToCache = [...assets, '/'].filter((asset) => asset !== '/_redirects');

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);

async function onInstall(event) {
  if (DEBUG) {
    console.log('[Service Worker] Installing Service Worker');
  }

  event.waitUntil(precache());
}

async function precache() {
  if (DEBUG) {
    console.log('[Service Worker] Precaching App Shell');
  }

  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(urlsToCache);
  return self.skipWaiting();
}

async function onActivate(event) {
  if (DEBUG) {
    console.log('[Service Worker] Activate Service Worker');
  }

  event.waitUntil(handleActivate());
}

async function handleActivate() {
  await clients.claim();
  await clearCache();
}

async function clearCache() {
  if (DEBUG) {
    console.log('[Service Worker] Clear old cache');
  }

  const cacheNames = await caches.keys();
  const oldCachesNames = cacheNames.filter(
    (cacheName) => cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME,
  );

  await Promise.all(
    oldCachesNames.map((cacheName) => {
      return caches.delete(cacheName);
    }),
  );
}

async function onFetch(event) {
  event.respondWith(cacheFirst(event.request));
}

async function cacheFirst(request) {
  const cacheResponse = await caches.match(request);

  if (cacheResponse) {
    return cacheResponse;
  } else {
    try {
      const response = await fetch(request);

      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      await cache.put(request.url, response.clone());

      return response;
    } catch (e) {
      if (DEBUG) {
        console.log(`[Service Worker] request ${request.url} not available`);
      }
    }
  }
}
