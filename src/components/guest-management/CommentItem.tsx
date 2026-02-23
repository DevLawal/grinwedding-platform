'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Guest, Comment, ReactionType } from '@/types/guest-management';
import { MoreVertical, Edit, Trash2, ThumbsUp, ChevronUp, ChevronDown } from 'lucide-react';

const REACTIONS: { type: ReactionType; label: string; icon: string }[] = [
    { type: 'like', label: 'Like', icon: '👍' },
    { type: 'love', label: 'Love', icon: '❤️' },
    { type: 'haha', label: 'Haha', icon: '😂' },
    { type: 'wow', label: 'Wow', icon: '😮' },
    { type: 'sad', label: 'Sad', icon: '😢' },
    { type: 'angry', label: 'Angry', icon: '😡' },
];

export const CommentItem: React.FC<{
    comment: Comment;
    guest: Guest;
    photoId: string;
    onReply: (commentId: string, userName: string) => void;
    onReact: (commentId: string, type: ReactionType) => void;
    onEdit: (commentId: string, newText: string) => void;
    onDelete: (commentId: string) => void;
    isReplyingTo?: string;
    isReply?: boolean;
}> = ({ comment, guest, photoId, onReply, onReact, onEdit, onDelete, isReplyingTo, isReply = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);
    const [showReactions, setShowReactions] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const isCommentAuthor = (comment.userId === guest._id || comment.userId === guest.id);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSaveEdit = () => {
        if (editText.trim() && editText !== comment.text) {
            onEdit(comment._id || comment.id || '', editText.trim());
        }
        setIsEditing(false);
    };

    const guestId = guest._id || guest.id || '';
    const userReaction = comment.reactions?.[guestId];
    const reactionCount = comment.reactions ? Object.keys(comment.reactions).length : 0;
    const replyCount = comment.replies?.length || 0;

    return (
        <div className={`relative group ${isReplyingTo === comment.id ? 'bg-purple/5 rounded-2xl p-3' : ''} ${isReply ? 'ml-6 mt-3' : 'mb-4'}`}>
            <div className="flex gap-3">
                <div className="flex-shrink-0">
                    <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 text-[10px] font-black border border-stone-200">
                        {comment.userName.charAt(0).toUpperCase()}
                    </div>
                </div>

                <div className="flex-1">
                    <div className={`bg-stone-50 rounded-2xl rounded-tl-none px-4 py-2.5 border border-stone-100 ${isReply ? 'border-l-2 border-purple/30' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-[11px] text-slate-800 uppercase tracking-tight">{comment.userName}</span>
                            {comment.isEdited && (
                                <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">(edited)</span>
                            )}
                        </div>

                        {isEditing ? (
                            <div className="space-y-3 py-1">
                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="w-full text-[12px] bg-white border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple/30 resize-none font-medium text-slate-700"
                                    rows={2}
                                    autoFocus
                                />
                                <div className="flex gap-2">
                                    <button onClick={handleSaveEdit} className="text-[9px] font-black uppercase tracking-widest bg-purple text-white px-3 py-1.5 rounded-lg shadow-sm">Save</button>
                                    <button onClick={() => {
                                        setIsEditing(false);
                                        setEditText(comment.text);
                                    }} className="text-[9px] font-black uppercase tracking-widest text-stone-400 px-3 py-1.5 rounded-lg border border-stone-200">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-[12px] text-slate-600 font-medium leading-relaxed">{comment.text}</p>
                        )}

                        <div className="flex items-center gap-4 mt-2">
                            <button
                                onClick={() => onReact(comment._id || comment.id || '', 'like')}
                                className={`text-[9px] font-black uppercase tracking-widest ${userReaction ? 'text-purple' : 'text-stone-400 hover:text-stone-600'}`}
                            >
                                {userReaction === 'like' ? 'Liked' : 'Like'}
                            </button>

                            {!isReply && (
                                <button
                                    onClick={() => onReply(comment._id || comment.id || '', comment.userName)}
                                    className="text-[9px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-600"
                                >
                                    Reply
                                </button>
                            )}

                            <span className="text-[9px] text-stone-300 font-bold">
                                {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>

                            {reactionCount > 0 && (
                                <div
                                    className="relative flex items-center gap-1 text-[10px] bg-white border border-stone-100 rounded-full px-1.5 py-0.5 shadow-sm"
                                    onMouseEnter={() => setShowReactions(true)}
                                    onMouseLeave={() => setShowReactions(false)}
                                >
                                    <ThumbsUp size={10} className="text-purple" />
                                    <span className="font-bold text-slate-700">{reactionCount}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {isCommentAuthor && (
                        <div className="relative mt-1 ml-1" ref={menuRef}>
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-stone-300 hover:text-stone-500 transition-opacity"
                            >
                                <MoreVertical size={14} />
                            </button>

                            {showMenu && (
                                <div className="absolute top-0 left-6 bg-white shadow-xl border border-stone-100 rounded-xl py-1 z-20 min-w-[100px] animate-in slide-in-from-left-2 duration-150">
                                    <button
                                        onClick={() => {
                                            setIsEditing(true);
                                            setShowMenu(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-700 hover:bg-stone-50 flex items-center gap-2"
                                    >
                                        <Edit size={12} /> Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('Delete this comment?')) {
                                                onDelete(comment._id || comment.id || '');
                                            }
                                            setShowMenu(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 flex items-center gap-2"
                                    >
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {!isReply && replyCount > 0 && (
                <div className="mt-2 ml-10">
                    <button
                        onClick={() => setShowReplies(!showReplies)}
                        className="text-[9px] font-black uppercase tracking-widest text-purple flex items-center gap-1 hover:gap-1.5 transition-all"
                    >
                        {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        {showReplies ? 'Hide' : `View ${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`}
                    </button>
                </div>
            )}

            {!isReply && showReplies && comment.replies && comment.replies.length > 0 && (
                <div className="mt-1">
                    {comment.replies.map(reply => (
                        <CommentItem
                            key={reply._id || reply.id}
                            comment={reply}
                            guest={guest}
                            photoId={photoId}
                            onReply={onReply}
                            onReact={onReact}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            isReply={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
