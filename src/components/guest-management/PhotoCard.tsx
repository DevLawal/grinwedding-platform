'use client';

import React, { useState, useRef } from 'react';
import { Guest, Photo, ReactionType } from '@/types/guest-management';
import { CommentItem } from './CommentItem';
import {
    CheckCircle, Circle, MessageCircle, Send, Smile, Reply, Heart, Clock
} from 'lucide-react';

const REACTIONS: { type: ReactionType; label: string; icon: string }[] = [
    { type: 'like', label: 'Like', icon: '👍' },
    { type: 'love', label: 'Love', icon: '❤️' },
    { type: 'haha', label: 'Haha', icon: '😂' },
    { type: 'wow', label: 'Wow', icon: '😮' },
    { type: 'sad', label: 'Sad', icon: '😢' },
    { type: 'angry', label: 'Angry', icon: '😡' },
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
    photo,
    guest,
    isSelectionMode,
    isSelected,
    onToggleSelection,
    onPhotoClick,
    onReaction,
    onCommentAdd,
    onCommentReaction,
    onCommentEdit,
    onCommentDelete
}) => {
    const [commentText, setCommentText] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyingToName, setReplyingToName] = useState<string>('');
    const [isExpanded, setIsExpanded] = useState(false);
    const commentInputRef = useRef<HTMLInputElement>(null);

    const guestId = guest._id || guest.id || '';
    const photoId = photo._id || photo.id || '';
    const userReaction = photo.reactions?.[guestId];

    const mainComments = photo.comments?.filter(comment => !comment.parentCommentId) || [];
    const totalCommentCount = (photo.comments?.length || 0) + 
        (photo.comments?.reduce((acc, c) => acc + (c.replies?.length || 0), 0) || 0);

    const handleAddComment = async () => {
        if (!commentText.trim() || isCommenting) return;
        setIsCommenting(true);
        try {
            await onCommentAdd(photoId, commentText.trim(), replyingTo || undefined);
            setCommentText('');
            setReplyingTo(null);
            setReplyingToName('');
            setIsExpanded(true);
        } finally {
            setIsCommenting(false);
        }
    };

    const handleCommentReply = (commentId: string, userName: string) => {
        setReplyingTo(commentId);
        setReplyingToName(userName);
        commentInputRef.current?.focus();
    };

    const getReactionSummary = () => {
        if (!photo.reactions || Object.keys(photo.reactions).length === 0) return null;
        const counts: Record<string, number> = {};
        Object.values(photo.reactions).forEach(r => { counts[r] = (counts[r] || 0) + 1; });
        const topReactions = Object.entries(counts)
            .sort((a, b) => b[1] - a[1]).slice(0, 3)
            .map(([type]) => REACTIONS.find(r => r.type === type)?.icon);

        return (
            <div className="flex items-center gap-2 bg-stone-50 border border-stone-100 px-3 py-1 rounded-full shadow-sm">
                <span className="flex -space-x-1.5">
                    {topReactions.map((icon, i) => (
                        <span key={i} className="text-[12px] filter drop-shadow-sm">{icon}</span>
                    ))}
                </span>
                <span className="text-[10px] font-black text-slate-700">{Object.keys(photo.reactions).length}</span>
            </div>
        );
    };

    return (
        <div className={`bg-white rounded-[32px] overflow-hidden border border-stone-200 shadow-sm transition-all ${isSelectionMode && isSelected ? 'ring-4 ring-purple shadow-xl' : 'hover:shadow-md'}`}>
            <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-black border border-stone-200">
                        {photo.uploadedBy.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-tight text-slate-800">{photo.uploadedBy}</p>
                        <div className="flex items-center gap-1.5 text-stone-300">
                            <Clock size={10} />
                            <p className="text-[9px] font-bold uppercase tracking-widest">
                                {new Date(photo.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative aspect-square sm:aspect-[4/5] bg-stone-50 group cursor-pointer" onClick={() => onPhotoClick(photo)}>
                <img src={photo.url} alt={photo.caption} loading="lazy" className="w-full h-full object-cover" />
                {isSelectionMode && (
                    <div className="absolute top-4 right-4" onClick={(e) => { e.stopPropagation(); onToggleSelection(photoId); }}>
                        {isSelected ? <CheckCircle className="text-purple bg-white rounded-full shadow-lg" size={28} fill="white" /> : <Circle className="text-white drop-shadow-lg" size={28} />}
                    </div>
                )}
            </div>

            <div className="p-6">
                {photo.caption && <p className="text-[13px] font-medium text-slate-700 mb-5 leading-relaxed">{photo.caption}</p>}

                {mainComments.length > 0 && !isExpanded && (
                    <div className="mb-5 space-y-2">
                        {mainComments.slice(0, 1).map(comment => (
                            <div key={comment._id || comment.id} className="flex items-start gap-2">
                                <span className="font-black text-[10px] uppercase text-slate-800 tracking-tight">{comment.userName}</span>
                                <span className="text-[11px] text-stone-500 font-medium truncate flex-1">{comment.text}</span>
                            </div>
                        ))}
                        {totalCommentCount > 1 && (
                            <button onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }} className="text-[10px] font-black uppercase tracking-widest text-purple/60 hover:text-purple transition-colors">
                                View all {totalCommentCount} comments
                            </button>
                        )}
                    </div>
                )}

                {isExpanded && (
                    <div className="mb-6 space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                        {mainComments.map(comment => (
                            <CommentItem
                                key={comment._id || comment.id}
                                comment={comment}
                                guest={guest}
                                photoId={photoId}
                                onReply={handleCommentReply}
                                onReact={(cid, t) => onCommentReaction(photoId, cid, t)}
                                onEdit={(cid, t) => onCommentEdit(photoId, cid, t)}
                                onDelete={(cid) => onCommentDelete(photoId, cid)}
                            />
                        ))}
                        <button onClick={() => setIsExpanded(false)} className="w-full text-center text-[10px] font-black uppercase tracking-widest text-stone-300 py-2">Collapse</button>
                    </div>
                )}

                <div className="space-y-4">
                    {replyingTo && (
                        <div className="flex items-center justify-between bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-100">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500">
                                <Reply size={12} className="text-purple" />
                                <span>Replying to {replyingToName}</span>
                            </div>
                            <button onClick={() => { setReplyingTo(null); setReplyingToName(''); }} className="text-[9px] font-black uppercase tracking-widest text-red-400">Cancel</button>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                ref={commentInputRef}
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder={replyingTo ? `Write a reply...` : "Add a comment..."}
                                className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-5 py-3.5 text-[12px] focus:outline-none focus:border-purple/30 transition-all font-medium placeholder:text-stone-300"
                                onKeyPress={(e) => { if (e.key === 'Enter') handleAddComment(); }}
                            />
                        </div>
                        <button
                            onClick={handleAddComment}
                            disabled={!commentText.trim() || isCommenting}
                            className="bg-purple text-white p-3 rounded-2xl shadow-lg shadow-purple/10 disabled:opacity-30 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
                        >
                            <Send size={18} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between border-t border-stone-100 pt-5">
                        <div className="flex items-center gap-1">
                            {REACTIONS.slice(0, 3).map(r => (
                                <button
                                    key={r.type}
                                    onClick={() => onReaction(photo, r.type)}
                                    className={`p-2 rounded-full border transition-all ${userReaction === r.type ? 'bg-purple/10 border-purple/20 scale-110' : 'bg-stone-50 border-stone-100 hover:scale-110'}`}
                                >
                                    <span className="text-base">{r.icon}</span>
                                </button>
                            ))}
                            <button onClick={() => { setIsExpanded(!isExpanded); if (!isExpanded) setTimeout(() => commentInputRef.current?.focus(), 100); }} className={`p-2.5 rounded-full border transition-all ${isExpanded ? 'bg-purple/10 border-purple/20' : 'bg-stone-50 border-stone-100'}`}>
                                <MessageCircle size={18} className={isExpanded ? 'text-purple' : 'text-stone-400'} />
                            </button>
                        </div>
                        {getReactionSummary()}
                    </div>
                </div>
            </div>
        </div>
    );
};
