'use client';

import React, { useState } from 'react';
import { Photo } from '../../../types/original-nuptial';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoViewerProps {
    photo: Photo;
    guest: any;
    totalPhotos: number;
    currentIndex: number;
    onClose: () => void;
    onDownload: (photo: Photo) => Promise<void>;
    onReaction: (photo: Photo, type: any) => Promise<void>;
    onNext: () => void;
    onPrevious: () => void;
}

export const PhotoViewer: React.FC<PhotoViewerProps> = ({
    photo, totalPhotos, currentIndex, onClose, onDownload, onNext, onPrevious
}) => {
    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
            <button onClick={onClose} className="absolute top-4 right-4 text-white z-10 p-2"><X size={24} /></button>
            <button onClick={() => onDownload(photo)} className="absolute top-4 right-16 text-white z-10 p-2"><Download size={24} /></button>

            <div className="relative w-full h-full flex items-center justify-center p-4">
                <button onClick={(e) => { e.stopPropagation(); onPrevious(); }} className="absolute left-4 p-4 text-white/50 hover:text-white transition-colors"><ChevronLeft size={48} /></button>
                <img src={photo.url} alt="Viewer" className="max-w-full max-h-full object-contain shadow-2xl" />
                <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 p-4 text-white/50 hover:text-white transition-colors"><ChevronRight size={48} /></button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-1 rounded-full text-sm">
                {currentIndex + 1} / {totalPhotos}
            </div>
        </div>
    );
};
