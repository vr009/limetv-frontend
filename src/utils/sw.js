importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
import {CacheFirst} from 'workbox-strategies';
// import {skipWaiting, clientsClaim} from 'workbox-core';

workbox.skipWaiting;
workbox.clientsClaim;

// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
workbox.core.setCacheNameDetails({
  prefix: 'LimeTV',
  suffix: 'v1',
  precache: 'precache-cache',
  runtime: 'runtime-cache',
});

// workbox.precaching.precacheAndRoute([
//   {url: '/login', revision: null},
// ]);

workbox.routing.registerRoute(
    new RegExp(/(?:png|jpg|jpeg|svg|html|js|css|)/),
    new CacheFirst({
      cacheName: 'LimeTV',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
          maxEntries: 30,
          purgeOnQuotaError: true,
        }),
      ],
    }),
);
