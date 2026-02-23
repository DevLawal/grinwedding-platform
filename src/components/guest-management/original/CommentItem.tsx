'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Guest, Comment, ReactionType } from '../../../types/original-nuptial';
import { Button } from './Button';
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
    const isCommentAuthor = comment.userId === guest._id || comment.userId === guest.id;

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
        <div className={`relative group ${isReplyingTo === (comment._id || comment.id) ? 'bg-wedding-50 rounded-lg p-2' : ''} ${isReply ? 'ml-8 mt-2' : ''}`}>
            <div className="flex gap-3">
                <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-wedding-100 flex items-center justify-center text-wedding-700 text-sm font-bold">
                        {comment.userName.charAt(0)}
                    </div>
                </div>

                <div className="flex-1">
                    <div className={`bg-gray-100 rounded-2xl rounded-tl-none px-3 py-2 ${isReply ? 'border-l-2 border-wedding-300' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-gray-800">{comment.userName}</span>
                            {comment.isEdited && <span className="text-xs text-gray-400">(edited)</span>}
                        </div>

                        {isEditing ? (
                            <div className="space-y-2">
                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-wedding-500 resize-none"
                                    rows={2}
                                />
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-700">{comment.text}</p>
                        )}

                        <div className="flex items-center gap-4 mt-2">
                            <button onClick={() => onReact(comment._id || comment.id || '', 'like')} className={`text-xs font-medium ${userReaction ? 'text-wedding-600' : 'text-gray-500'}`}>
                                {userReaction === 'like' ? 'Liked' : 'Like'}
                            </button>
                            {!isReply && <button onClick={() => onReply(comment._id || comment.id || '', comment.userName)} className="text-xs font-medium text-gray-500">Reply</button>}
                            <span className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>

                    {isCommentAuthor && (
                        <div className="relative" ref={menuRef}>
                            <button onClick={() => setShowMenu(!showMenu)} className="opacity-0 group-hover:opacity-100 absolute top-0 right-0 p-1 text-gray-400">
                                <MoreVertical size={16} />
                            </button>
                            {showMenu && (
                                <div className="absolute top-6 right-0 bg-white shadow-lg rounded-lg py-1 z-10 min-w-[100px]">
                                    <button onClick={() => { setIsEditing(true); setShowMenu(false); }} className="w-full text-left px-3 py-2 text-sm flex items-center gap-2"><Edit size={14} /> Edit</button>
                                    <button onClick={() => { onDelete(comment._id || comment.id || ''); setShowMenu(false); }} className="w-full text-left px-3 py-2 text-sm text-red-600 flex items-center gap-2"><Trash2 size={14} /> Delete</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {!isReply && replyCount > 0 && (
                <button onClick={() => setShowReplies(!showReplies)} className="mt-2 ml-11 text-xs font-medium text-wedding-600 flex items-center gap-1">
                    {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    {showReplies ? 'Hide' : 'View'} {replyCount} replies
                </button>
            )}

            {!isReply && showReplies && comment.replies && (
                <div className="mt-2 ml-8 space-y-2 border-l-2 border-gray-200 pl-3">
                    {comment.replies.map(reply => (
                        <CommentItem key={reply._id || reply.id} comment={reply} guest={guest} photoId={photoId} onReply={onReply} onReact={onReact} onEdit={onEdit} onDelete={onDelete} isReply={true} />
                    ))}
                </div>
            )}
        </div>
    );
};
