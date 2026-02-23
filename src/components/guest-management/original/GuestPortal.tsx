'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Guest, Photo, ReactionType, Notification } from '../../../types/original-nuptial';
import { photoService, notificationService } from '../../../lib/nuptial-api';
import { Button } from './Button';
import { LogOut, Image as ImageIcon, Camera, Download, Bell } from 'lucide-react';

import { PhotoCard } from './PhotoCard';
import { PhotoUpload } from './PhotoUpload';
import { GuestNotifications } from './GuestNotifications';
import { PhotoViewer } from './PhotoViewer';

interface GuestPortalProps {
    guest: Guest;
    onLogout: () => void;
}

export const GuestPortal: React.FC<GuestPortalProps> = ({ guest, onLogout }) => {
    const [activeTab, setActiveTab] = useState<'gallery' | 'upload' | 'notifications'>('gallery');
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [viewingPhoto, setViewingPhoto] = useState<Photo | null>(null);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const guestId = guest._id || guest.id || '';

    const loadPhotos = useCallback(() => {
        photoService.getAll('approved').then(setPhotos).catch(console.error);
    }, []);

    const loadNotifications = useCallback(() => {
        notificationService.getUserNotifications(guestId).then(setNotifications).catch(console.error);
    }, [guestId]);

    const loadAll = useCallback(() => {
        loadPhotos();
        loadNotifications();
    }, [loadPhotos, loadNotifications]);

    useEffect(() => {
        loadAll();
        const interval = setInterval(loadAll, 10000);
        return () => clearInterval(interval);
    }, [loadAll]);

    const handleReaction = async (photo: Photo, type: ReactionType) => {
        await photoService.react(photo._id || photo.id || '', guestId, type, guest.name);
        loadPhotos();
    };

    const handleAddComment = async (photoId: string, text: string) => {
        await photoService.comment(photoId, { userId: guestId, userName: guest.name, text });
        loadPhotos();
    };

    const toggleSelection = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const handlePhotoClick = (photo: Photo) => {
        if (isSelectionMode) toggleSelection(photo._id || photo.id || '');
        else setViewingPhoto(photo);
    };

    return (
        <div className="min-h-screen bg-wedding-50 flex flex-col pb-20">
            <header className="bg-white shadow-sm px-4 py-3 sticky top-0 z-10 flex justify-between items-center w-full">
                <div>
                    <h1 className="text-base font-bold text-wedding-800">Hi, {guest.name}</h1>
                </div>
                <div className="flex gap-2">
                    {activeTab === 'gallery' && (
                        <Button variant="ghost" size="sm" onClick={() => { setIsSelectionMode(!isSelectionMode); setSelectedIds(new Set()); }}>
                            {isSelectionMode ? 'Cancel' : 'Select'}
                        </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={onLogout}><LogOut size={18} /></Button>
                </div>
            </header>

            <main className="flex-1 max-w-lg mx-auto w-full p-4">
                {activeTab === 'gallery' && (
                    <div className="flex flex-col gap-6">
                        {photos.map(photo => (
                            <PhotoCard
                                key={photo._id || photo.id}
                                photo={photo}
                                guest={guest}
                                isSelectionMode={isSelectionMode}
                                isSelected={selectedIds.has(photo._id || photo.id || '')}
                                onToggleSelection={toggleSelection}
                                onPhotoClick={handlePhotoClick}
                                onReaction={handleReaction}
                                onCommentAdd={handleAddComment}
                                onCommentReaction={async () => {}}
                                onCommentEdit={async () => {}}
                                onCommentDelete={async () => {}}
                            />
                        ))}
                    </div>
                )}
                {activeTab === 'upload' && <PhotoUpload guest={guest} onUploadSuccess={() => setActiveTab('gallery')} />}
                {activeTab === 'notifications' && <GuestNotifications notifications={notifications} onNotificationClick={(n) => {}} onClearAll={() => {}} isClearingNotifications={false} />}
            </main>

            {viewingPhoto && (
                <PhotoViewer
                    photo={viewingPhoto}
                    guest={guest}
                    totalPhotos={photos.length}
                    currentIndex={photos.findIndex(p => (p._id || p.id) === (viewingPhoto._id || viewingPhoto.id))}
                    onClose={() => setViewingPhoto(null)}
                    onDownload={async () => {}}
                    onReaction={handleReaction}
                    onNext={() => {}}
                    onPrevious={() => {}}
                />
            )}

            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 shadow-lg z-20">
                <button onClick={() => setActiveTab('gallery')} className={`flex flex-col items-center p-2 min-w-[64px] ${activeTab === 'gallery' ? 'text-wedding-600' : 'text-gray-400'}`}><ImageIcon size={24} /><span className="text-[10px] mt-1">Gallery</span></button>
                <div className="relative -top-6">
                    <button onClick={() => setActiveTab('upload')} className="w-14 h-14 bg-wedding-600 text-white rounded-full flex items-center justify-center shadow-xl ring-4 ring-wedding-50"><Camera size={28} /></button>
                </div>
                <button onClick={() => setActiveTab('notifications')} className={`flex flex-col items-center p-2 min-w-[64px] ${activeTab === 'notifications' ? 'text-wedding-600' : 'text-gray-400'}`}><Bell size={24} /><span className="text-[10px] mt-1">Alerts</span></button>
            </nav>
        </div>
    );
};
