export interface Event {
    _id: string;
    name: string;
    signature: string;
    date: string;
    location: string;
    rsvpCode: string;
}

export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

export interface Comment {
    _id?: string;
    id?: string;
    userId: string;
    userName: string;
    text: string;
    timestamp: string;
    isEdited?: boolean;
    parentCommentId?: string;
    reactions?: { [userId: string]: ReactionType };
    replies?: Comment[];
}

export interface Photo {
    _id?: string;
    id?: string;
    eventId: string;
    url: string;
    caption?: string;
    uploadedBy: string;
    uploaderId: string;
    timestamp: string;
    status: 'pending' | 'approved' | 'rejected';
    reactions?: { [userId: string]: ReactionType };
    comments?: Comment[];
}

export interface Guest {
    _id?: string;
    id?: string;
    eventId: string;
    name: string;
    email?: string;
    qrCodeValue: string;
    accessCode: string;
    status: 'invited' | 'checked-in' | 'rsvped-yes' | 'rsvped-no';
    checkInTime?: string;
    partySize?: number;
    category?: string;
}

export type GuestViewState = 'landing' | 'guest' | 'admin';

export interface AdminState {
    isAuthenticated: boolean;
    activeTab: 'guests' | 'scanner' | 'moderation' | 'gallery';
}

export interface GuestState {
    isAuthenticated: boolean;
    activeTab: 'gallery' | 'upload' | 'notifications' | 'rsvp';
    currentGuest?: Guest;
}
