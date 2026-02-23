export interface Guest {
    _id?: string;
    id?: string;
    name: string;
    email?: string;
    qrCodeValue: string;
    accessCode: string;
    status: 'invited' | 'checked-in' | 'rsvped-yes' | 'rsvped-no';
    checkInTime?: string | number;
    partySize?: number;
    category?: string;
}

export interface Comment {
    _id?: string;
    id?: string;
    photoId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    text: string;
    timestamp: string | number;
    parentCommentId?: string;
    replies?: Comment[];
    reactions?: CommentReaction;
    isEdited?: boolean;
}

export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

export interface Reaction {
    guestId: string;
    type: ReactionType;
}

export interface Photo {
    _id?: string;
    id?: string;
    url: string;
    caption: string;
    uploadedBy: string;
    uploaderId: string;
    timestamp: string | number;
    status: 'pending' | 'approved' | 'rejected';
    reactions?: { [userId: string]: ReactionType };
    comments?: Comment[];
}

export interface CommentReaction {
    [userId: string]: ReactionType;
}

export interface Notification {
    _id?: string;
    id?: string;
    recipientId: string;
    type: 'status_update' | 'reaction' | 'comment' | 'reply';
    photoId: string;
    photoUrl: string;
    timestamp: string | number;
    read: boolean;
    status?: 'approved' | 'rejected';
    fromUserId?: string;
    fromUserName?: string;
    reactionType?: ReactionType;
    text?: string;
}

export type ViewState = 'brand_home' | 'landing' | 'guest' | 'admin';

export interface AdminState {
    isAuthenticated: boolean;
    activeTab: 'guests' | 'scanner' | 'moderation' | 'gallery';
}

export interface GuestState {
    isAuthenticated: boolean;
    activeTab: 'gallery' | 'upload' | 'notifications';
    currentGuest?: Guest;
}
