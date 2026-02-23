'use client';

import React, { useState, useRef } from 'react';
import { Guest, Photo, ReactionType } from '../../../types/original-nuptial';
import { CommentItem } from './CommentItem';
import { Button } from './Button';
import { CheckCircle, Circle, MessageCircle, Send, Smile, Heart } from 'lucide-react';

const REACTIONS: { type: ReactionType; label: string; icon: string }[] = [
    { type: 'like', label: 'Like', icon: '👍' },
    { type: 'love', label: 'Love', icon: '❤️' },
    { type: 'haha', label: 'Haha', icon: '😂' },
    { type: 'wow', label: 'Wow', icon: '😮' },
];

interface PhotoCardProps {
    photo: Photo;
    guest: Guest;
    isSelectionMode: boolean;
    isSelected: boolean;
    onToggleSelection: (id: string) => void;
    onPhotoClick: (photo: Photo) => void;
    onReaction: (photo: Photo, type: ReactionType) => Promise<void>;
    onCommentAdd: (photoId: string, text: string, replyToId?: string) => Promise<void>;
    onCommentReaction: (photoId: string, commentId: string, type: ReactionType) => Promise<void>;
    onCommentEdit: (photoId: string, commentId: string, newText: string) => Promise<void>;
    onCommentDelete: (photoId: string, commentId: string) => Promise<void>;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
    photo, guest, isSelectionMode, isSelected, onToggleSelection, onPhotoClick, onReaction, onCommentAdd, onCommentReaction, onCommentEdit, onCommentDelete
}) => {
    const [commentText, setCommentText] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const commentInputRef = useRef<HTMLInputElement>(null);

    const guestId = guest._id || guest.id || '';
    const userReaction = photo.reactions?.[guestId];
    const photoId = photo._id || photo.id || '';

    const handleAddComment = async () => {
        if (!commentText.trim() || isCommenting) return;
        setIsCommenting(true);
        try {
            await onCommentAdd(photoId, commentText.trim());
            setCommentText('');
            setIsExpanded(true);
        } finally {
            setIsCommenting(false);
        }
    };

    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${isSelectionMode && isSelected ? 'ring-2 ring-wedding-500 border-wedding-500' : ''}`} onClick={() => !isSelectionMode && onPhotoClick(photo)}>
            <div className="p-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-wedding-100 flex items-center justify-center font-bold text-wedding-700 text-xs">{photo.uploadedBy.charAt(0)}</div>
                <div>
                    <p className="text-sm font-bold">{photo.uploadedBy}</p>
                    <p className="text-[10px] text-gray-400">{new Date(photo.timestamp).toLocaleTimeString()}</p>
                </div>
            </div>

            <div className="relative aspect-square bg-gray-50">
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                {isSelectionMode && (
                    <div className="absolute top-2 right-2" onClick={(e) => { e.stopPropagation(); onToggleSelection(photoId); }}>
                        {isSelected ? <CheckCircle size={24} className="text-wedding-600 fill-white" /> : <Circle size={24} className="text-white/70" />}
                    </div>
                )}
            </div>

            <div className="p-3">
                {photo.caption && <p className="text-sm mb-2">{photo.caption}</p>}
                
                <div className="flex gap-2 mb-3">
                    {REACTIONS.map(r => (
                        <button key={r.type} onClick={(e) => { e.stopPropagation(); onReaction(photo, r.type) }} className={`p-1.5 rounded-full transition-transform hover:scale-110 ${userReaction === r.type ? 'bg-wedding-100' : 'opacity-60'}`}>
                            {r.icon}
                        </button>
                    ))}
                    <button onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded) }} className="p-1.5 opacity-60"><MessageCircle size={20} /></button>
                </div>

                {isExpanded && (
                    <div className="space-y-3 mb-3 border-t pt-3" onClick={(e) => e.stopPropagation()}>
                        {photo.comments?.filter(c => !c.parentCommentId).map(comment => (
                            <CommentItem key={comment._id || comment.id} comment={comment} guest={guest} photoId={photoId} onReply={() => {}} onReact={onCommentReaction} onEdit={onCommentEdit} onDelete={onCommentDelete} />
                        ))}
                    </div>
                )}

                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <input ref={commentInputRef} type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Say something..." className="flex-1 text-sm border rounded-full px-4 py-1.5 focus:ring-1 focus:ring-wedding-500 outline-none" />
                    <Button size="sm" onClick={handleAddComment} isLoading={isCommenting} className="rounded-full px-3"><Send size={14} /></Button>
                </div>
            </div>
        </div>
    );
};
