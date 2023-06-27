import {Workbox} from 'workbox-window';
import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute, NavigationRoute} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';
//import {setDefaultHandler, setCatchHandler} from 'workbox-routing';
//import {StaleWhileRevalidate} from 'workbox-strategies';
import {warmStrategyCache} from 'workbox-recipes';
import {CacheFirst} from 'workbox-strategies';
import {BackgroundSyncPlugin} from 'workbox-background-sync';

// This can be any strategy, CacheFirst used as an example.
const strategy = new CacheFirst();
const urls = [
  '/index.html',
];

warmStrategyCache({urls, strategy});

if (Workbox) {
  console.log(`Yay! Workbox is loaded 😁`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}



// Hardcode the fallback cache name and the offline
// HTML fallback's URL for failed responses
const FALLBACK_CACHE_NAME = 'offline-fallback';
const FALLBACK_HTML = '/index.html';

// Cache the fallback HTML during installation.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(FALLBACK_CACHE_NAME).then((cache) => cache.add(FALLBACK_HTML)),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Apply a network-only strategy to navigation requests.
// If offline, or if more than five seconds pass before there's a
// network response, fall back to the cached offline HTML.
const networkWithFallbackStrategy = new NetworkOnly({
  networkTimeoutSeconds: 5,
  plugins: [
    {
      handlerDidError: async () => {
        return await caches.match(FALLBACK_HTML, {
          cacheName: FALLBACK_CACHE_NAME,
        });
      },
    },
  ],
});

// Register the route to handle all navigations.
registerRoute(new NavigationRoute(networkWithFallbackStrategy));
precacheAndRoute(self.__WB_MANIFEST);

//
const showNotification = () => {
  self.registration.showNotification('myQueueName', {
    body: 'Dados atualizados com sucesso!',
  });
};


//BackgroundSync
const bgSyncPlugin = new BackgroundSyncPlugin('myQueueName', {
  maxRetentionTime: 2 * 24 * 60, // Retry for max of 48 Hours (specified in minutes)
  callbacks: {
    queueDidReplay: showNotification
  }
});

const statusPlugin = {
  fetchDidSucceed: ({response}) => {
    if (response.status >= 500) {
      // Throwing anything here will trigger fetchDidFail.
      throw new Error('Server error.');
    }
    // If it's not 5xx, use the response as-is.
    return response;
  },
};


registerRoute(
  new RegExp('/api/sync'),
  new NetworkOnly({
    plugins: [
      bgSyncPlugin,
      statusPlugin
    ],
  }),
  'POST',
  console.log("Rota registrada com sucesso.")
);


