'use client';

import React from 'react';
import { Photo } from '../../../types/original-nuptial';
import { photoService } from '../../../lib/nuptial-api';
import { Button } from './Button';
import { Trash2, Heart, MessageCircle } from 'lucide-react';

interface AdminGalleryProps {
    approvedPhotos: Photo[];
    onPhotoUpdated?: () => void;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({ approvedPhotos, onPhotoUpdated }) => {
    const handleRevoke = async (photoId: string) => {
        if (!window.confirm("Are you sure you want to revoke this photo? It will be removed from the public gallery.")) return;
        try {
            await photoService.updateStatus(photoId, 'rejected');
            if (onPhotoUpdated) onPhotoUpdated();
        } catch (e) {
            alert("Failed to revoke photo");
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {approvedPhotos.map(photo => {
                const pid = photo._id || photo.id || '';
                const reactionsCount = photo.reactions ? Object.keys(photo.reactions).length : 0;
                const commentsCount = photo.comments ? photo.comments.length : 0;

                return (
                    <div key={pid} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img src={photo.url} alt="Gallery" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                            <div className="flex justify-between items-center text-white text-xs mb-2">
                                <span className="flex items-center gap-1"><Heart size={12} fill="white" /> {reactionsCount}</span>
                                <span className="flex items-center gap-1"><MessageCircle size={12} fill="white" /> {commentsCount}</span>
                            </div>
                            <Button
                                variant="danger"
                                size="sm"
                                className="w-full py-1 text-xs"
                                onClick={() => handleRevoke(pid)}
                            >
                                <Trash2 size={12} className="mr-1" /> Revoke
                            </Button>
                        </div>
                    </div>
                )
            })}
            {approvedPhotos.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-400 border border-dashed rounded-xl bg-white">
                    No approved photos in the feed yet.
                </div>
            )}
        </div>
    );
};
