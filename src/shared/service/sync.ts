import {db} from '@/shared/db/db';

export async function syncUnsyncedRooms() {
    const rooms = await db.rooms.where({synced: false}).toArray();
    const images = await db.images.where({synced: false}).toArray();

    for (const room of rooms) {
        try {
            const res = await fetch('/api/sync-room', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(room),
            });
            if (res.ok && room.id) {
                await db.rooms.update(room.id, { synced: true });
            }
        } catch (e) {
            console.error('❌ Room sync failed', room.id, e);
        }
    }

    for (const img of images) {
        try {
            const form = new FormData();
            form.append('image', img.imageBlob);
            form.append('roomId', img.roomId.toString());
            const res = await fetch('/api/sync-image', { method: 'POST', body: form });
            if (res.ok && img.id) {
                await db.images.update(img.id, { synced: true });
            }
        } catch (e) {
            console.error('❌ Image sync failed', img.id, e);
        }
    }
}
