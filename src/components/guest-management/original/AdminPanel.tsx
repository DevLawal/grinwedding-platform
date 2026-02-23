'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Guest, Photo } from '../../../types/original-nuptial';
import { guestService, photoService } from '../../../lib/nuptial-api';
import { Button } from './Button';
import {
    Users, ScanLine, Image as ImageIcon, LogOut, LayoutGrid
} from 'lucide-react';
import { GuestManager } from './GuestManager';
import { AdminScanner } from './AdminScanner';
import { PhotoModeration } from './PhotoModeration';
import { AdminGallery } from './AdminGallery';

interface AdminPanelProps {
    onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<'guests' | 'scanner' | 'moderation' | 'gallery'>('guests');
    const [guests, setGuests] = useState<Guest[]>([]);

    // Moderation State
    const [pendingPhotos, setPendingPhotos] = useState<Photo[]>([]);

    // Live Gallery State
    const [approvedPhotos, setApprovedPhotos] = useState<Photo[]>([]);

    const loadGuests = useCallback(() => {
        guestService.getAll().then(setGuests).catch(console.error);
    }, []);

    const loadPendingPhotos = useCallback(() => {
        photoService.getAll('pending').then(setPendingPhotos).catch(console.error);
    }, []);

    const loadApprovedPhotos = useCallback(() => {
        photoService.getAll('approved').then(setApprovedPhotos).catch(console.error);
    }, []);

    const loadAll = useCallback(() => {
        loadGuests();
        loadPendingPhotos();
        loadApprovedPhotos();
    }, [loadGuests, loadPendingPhotos, loadApprovedPhotos]);

    // Initial load
    useEffect(() => {
        loadAll();

        // Polling fallback until sockets are ready (every 10s)
        const interval = setInterval(loadAll, 10000);
        return () => clearInterval(interval);
    }, [loadAll]);

    // Specific refresh handlers
    const handleGuestChange = () => {
        loadGuests();
    };

    const handlePhotoModerationChange = () => {
        loadPendingPhotos();
        loadApprovedPhotos();
    };

    const handleGalleryChange = () => {
        loadApprovedPhotos();
        loadPendingPhotos();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-10 w-full">
                <h1 className="text-xl font-serif font-bold text-wedding-900">Admin Dashboard</h1>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                    <LogOut size={18} className="mr-2" /> Logout
                </Button>
            </header>

            {/* Tabs */}
            <nav className="flex bg-white border-b border-gray-200 overflow-x-auto w-full">
                <button
                    onClick={() => setActiveTab('guests')}
                    className={`flex-1 py-4 text-center font-medium min-w-[100px] ${activeTab === 'guests' ? 'text-wedding-600 border-b-2 border-wedding-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Users className="inline-block mr-2 mb-1" size={18} /> Guests
                </button>
                <button
                    onClick={() => setActiveTab('scanner')}
                    className={`flex-1 py-4 text-center font-medium min-w-[100px] ${activeTab === 'scanner' ? 'text-wedding-600 border-b-2 border-wedding-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <ScanLine className="inline-block mr-2 mb-1" size={18} /> Scanner
                </button>
                <button
                    onClick={() => setActiveTab('moderation')}
                    className={`flex-1 py-4 text-center font-medium min-w-[100px] ${activeTab === 'moderation'
                        ? 'text-wedding-600 border-b-2 border-wedding-600'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <div className="relative">
                            <ImageIcon className="relative inline-block mb-1" size={18} />

                            {/* Badge */}
                            {pendingPhotos.length > 0 && (
                                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {pendingPhotos.length}
                                </span>
                            )}
                        </div>
                        <span>Moderate</span>
                    </div>
                </button>

                <button
                    onClick={() => setActiveTab('gallery')}
                    className={`flex-1 py-4 text-center font-medium min-w-[100px] ${activeTab === 'gallery' ? 'text-wedding-600 border-b-2 border-wedding-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <LayoutGrid className="inline-block mr-2 mb-1" size={18} /> Feed
                </button>
            </nav>

            {/* Content */}
            <main className="flex-1 p-6 max-w-5xl mx-auto w-full">

                {/* Guest Tab */}
                {activeTab === 'guests' && (
                    <GuestManager guests={guests} onGuestAdded={handleGuestChange} />
                )}

                {/* Scanner Tab */}
                {activeTab === 'scanner' && (
                    <AdminScanner guests={guests} onGuestUpdated={handleGuestChange} />
                )}

                {/* Moderation Tab */}
                {activeTab === 'moderation' && (
                    <PhotoModeration pendingPhotos={pendingPhotos} onActionComplete={handlePhotoModerationChange} />
                )}

                {/* Live Feed (Approved) Tab */}
                {activeTab === 'gallery' && (
                    <AdminGallery approvedPhotos={approvedPhotos} onPhotoUpdated={handleGalleryChange} />
                )}

            </main>
        </div>
    );
};
