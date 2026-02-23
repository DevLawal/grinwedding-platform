'use client';

import React, { useState } from 'react';
import { Photo } from '../../../types/original-nuptial';
import { photoService } from '../../../lib/nuptial-api';
import { Button } from './Button';
import { Check, X, CheckSquare, Square, Trash2 } from 'lucide-react';

interface PhotoModerationProps {
    pendingPhotos: Photo[];
    onActionComplete?: () => void;
}

export const PhotoModeration: React.FC<PhotoModerationProps> = ({ pendingPhotos, onActionComplete }) => {
    const [selectedPendingIds, setSelectedPendingIds] = useState<Set<string>>(new Set());

    const handleModerate = async (photoId: string, status: 'approved' | 'rejected') => {
        try {
            await photoService.updateStatus(photoId, status);
            setSelectedPendingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(photoId);
                return newSet;
            });
            if (onActionComplete) onActionComplete();
        } catch (e) {
            alert("Failed to update status");
        }
    };

    const toggleSelectPending = (photoId: string) => {
        setSelectedPendingIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(photoId)) newSet.delete(photoId);
            else newSet.add(photoId);
            return newSet;
        });
    };

    const toggleSelectAll = () => {
        if (selectedPendingIds.size === pendingPhotos.length) setSelectedPendingIds(new Set());
        else {
            const allIds = pendingPhotos.map(p => p._id || p.id || '').filter(id => id !== '');
            setSelectedPendingIds(new Set(allIds));
        }
    };

    const handleBulkAction = async (status: 'approved' | 'rejected') => {
        if (selectedPendingIds.size === 0) return;
        try {
            await photoService.updateStatusBulk(Array.from(selectedPendingIds), status);
            setSelectedPendingIds(new Set());
            if (onActionComplete) onActionComplete();
        } catch (e) {
            alert("Bulk action failed");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Pending ({pendingPhotos.length})</h2>
                {pendingPhotos.length > 0 && (
                    <div className="flex gap-2">
                        <Button variant="primary" size="sm" onClick={() => handleBulkAction('approved')} disabled={selectedPendingIds.size === 0} className="bg-green-600">
                            Approve ({selectedPendingIds.size})
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleBulkAction('rejected')} disabled={selectedPendingIds.size === 0}>
                            Reject Selected
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingPhotos.map(photo => {
                    const pid = photo._id || photo.id || '';
                    return (
                        <div key={pid} className={`bg-white rounded-xl shadow-sm overflow-hidden border ${selectedPendingIds.has(pid) ? 'border-wedding-500 ring-2 ring-wedding-500' : 'border-gray-200'}`}>
                            <div className="relative aspect-square cursor-pointer" onClick={() => toggleSelectPending(pid)}>
                                <img src={photo.url} alt="Upload" className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2">
                                    {selectedPendingIds.has(pid) ? <CheckSquare size={24} className="text-wedding-600 fill-white" /> : <Square size={24} className="text-white/70" />}
                                </div>
                            </div>
                            <div className="p-4 flex gap-2">
                                <Button variant="primary" size="sm" className="flex-1 bg-green-600" onClick={() => handleModerate(pid, 'approved')}>Approve</Button>
                                <Button variant="danger" size="sm" className="flex-1" onClick={() => handleModerate(pid, 'rejected')}>Reject</Button>
                            </div>
                        </div>
                    )
                })}
                {pendingPhotos.length === 0 && <div className="col-span-full py-20 text-center text-gray-400 border border-dashed rounded-xl">All caught up!</div>}
            </div>
        </div>
    );
};
