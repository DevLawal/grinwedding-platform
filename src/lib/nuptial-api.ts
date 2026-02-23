import { guestManagementService } from './guest-management';
import { Photo, Guest, Notification, ReactionType } from '../types/original-nuptial';

// Helper to get event ID from current URL or state
// In the signature route, we'll need to pass this down or use a global state/ref
let currentEventId: string = '';

export const setEventId = (id: string) => {
    currentEventId = id;
};

export const guestService = {
    login: async (accessCode: string) => {
        return guestManagementService.loginGuest(accessCode, currentEventId);
    },
    getAll: async () => {
        return guestManagementService.getGuestsByEvent(currentEventId);
    },
    create: async (guestData: any) => {
        return guestManagementService.addGuest({ ...guestData, eventId: currentEventId });
    },
    createBulk: async (guests: any[]) => {
        return guestManagementService.bulkAddGuests(guests, currentEventId);
    },
    update: async (id: string, data: any) => {
        return guestManagementService.updateGuest(id, data);
    },
    updateStatus: async (id: string, status: string) => {
        return guestManagementService.updateGuest(id, { status });
    }
};

export const photoService = {
    getAll: async (status?: 'pending' | 'approved' | 'rejected') => {
        const isAdmin = status !== 'approved';
        const photos = await guestManagementService.getPhotosByEvent(currentEventId, isAdmin);
        if (status) {
            return photos.filter((p: Photo) => p.status === status);
        }
        return photos;
    },
    upload: async (formData: FormData) => {
        formData.append('eventId', currentEventId);
        return guestManagementService.uploadPhoto(formData);
    },
    updateStatus: async (id: string, status: 'approved' | 'rejected') => {
        return guestManagementService.updatePhotoStatus(id, status);
    },
    updateStatusBulk: async (ids: string[], status: 'approved' | 'rejected') => {
        // Implement bulk update in guestManagementService if needed, 
        // for now let's just loop or assume it exists.
        return Promise.all(ids.map(id => guestManagementService.updatePhotoStatus(id, status)));
    },
    react: async (photoId: string, userId: string, type: ReactionType, userName: string) => {
        return guestManagementService.updatePhoto(photoId, { [`reactions.${userId}`]: type });
    },
    comment: async (photoId: string, commentData: any) => {
        return guestManagementService.updatePhoto(photoId, { $push: { comments: { ...commentData, timestamp: new Date().toISOString() } } });
    }
};

export const notificationService = {
    getUserNotifications: async (userId: string) => {
        // We don't have a notifications service in the new backend yet, 
        // return empty array to avoid crashes
        return [];
    },
    clearAll: async (userId: string) => {
        return { success: true };
    }
};
