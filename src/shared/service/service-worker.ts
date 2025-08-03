/// <reference lib="webworker" />

import { syncUnsyncedRooms } from '@/shared/service/sync';

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', () => {
    self.clients.claim();
});

self.addEventListener('sync', (event: Event) => {
    if ((event as SyncEvent).tag === 'sync-rooms') {
        (event as SyncEvent).waitUntil(syncUnsyncedRooms());
    }
});
