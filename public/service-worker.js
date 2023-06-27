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
precacheAndRoute([{"revision":"f8ff16dbca083a2fc383cb924f75b1eb","url":"css/brands.min.css"},{"revision":"60ca9c222a3adafc02d24d9e194b4dfd","url":"css/fontawesome.min.css"},{"revision":"de680b39b7b157cf6a78fbbb177ba8e5","url":"css/regular.min.css"},{"revision":"e06740767b428ec5b656e49ab89dd27f","url":"css/solid.min.css"},{"revision":"1ba2ae710d927f13d483fd5d1e548c9b","url":"favicon.ico"},{"revision":"f8895718b646ae3b7be91ba579c5d553","url":"img/icon/icon-192x192.png"},{"revision":"7cbe3772ebf6b3c92616950ededcc9d9","url":"img/icons/favicon-16x16.png"},{"revision":"1ba2ae710d927f13d483fd5d1e548c9b","url":"img/icons/favicon.svg"},{"revision":"1e25d5d2cdc527293069271a4914a3ec","url":"index.html"},{"revision":"56cc7be40859ecc2391f710d98e20070","url":"manifest.json"},{"revision":"f8895718b646ae3b7be91ba579c5d553","url":"static/icon-192x192.png"},{"revision":"be4f066a0adb9fb36e6d901ad040eb5d","url":"static/icon-256x256.png"},{"revision":"eb0f1e1bf1481b4a50e15e99295ca1b0","url":"static/icon-384x384.png"},{"revision":"343ad3acbdcbccda99849aa5551a0da9","url":"static/icon-512x512.png"},{"revision":"f8895718b646ae3b7be91ba579c5d553","url":"static/img/icon/icon-192x192.png"},{"revision":"7cbe3772ebf6b3c92616950ededcc9d9","url":"static/logo-pmmt.png"},{"revision":"94227daa6303fd42918ce3af431ef7e8","url":"webfonts/fa-brands-400.ttf"},{"revision":"83a42241ada98e0f959353ca0c3ee027","url":"webfonts/fa-brands-400.woff2"},{"revision":"47fa5e12e9fc4e8325a6e1a0735b38f6","url":"webfonts/fa-regular-400.ttf"},{"revision":"3f505ed834ca9466cf7efc2806b86604","url":"webfonts/fa-regular-400.woff2"},{"revision":"e8132d053030afa547e23b5163ef8301","url":"webfonts/fa-solid-900.ttf"},{"revision":"44f8148f80e6c3d60fa6425b0cbb862a","url":"webfonts/fa-solid-900.woff2"},{"revision":"91fc9b0078b939bddcde338550684848","url":"webfonts/fa-v4compatibility.ttf"},{"revision":"60cd2d66cb03cd2521862a12f970dbe9","url":"webfonts/fa-v4compatibility.woff2"}]);

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


