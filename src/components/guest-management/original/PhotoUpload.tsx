'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Guest } from '../../../types/original-nuptial';
import { photoService } from '../../../lib/nuptial-api';
import { Button } from './Button';
import { Camera, X, Upload } from 'lucide-react';

const resizeImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_DIM = 1080;
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > MAX_DIM) {
                        height *= MAX_DIM / width;
                        width = MAX_DIM;
                    }
                } else {
                    if (height > MAX_DIM) {
                        width *= MAX_DIM / height;
                        height = MAX_DIM;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error("Failed to resize"));
                }, 'image/jpeg', 0.8);
            };
        };
    });
};

interface PhotoUploadProps {
    guest: Guest;
    onUploadSuccess: () => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ guest, onUploadSuccess }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedBlob, setSelectedBlob] = useState<Blob | null>(null);
    const [caption, setCaption] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const resized = await resizeImage(file);
            setSelectedBlob(resized);
            setPreviewUrl(URL.createObjectURL(resized));
            setStatus('idle');
        }
    };

    const handleUpload = async () => {
        if (!selectedBlob) return;
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('photo', selectedBlob, 'upload.jpg');
            formData.append('caption', caption);
            formData.append('uploadedBy', guest.name);
            formData.append('uploaderId', guest._id || guest.id || '');
            
            await photoService.upload(formData);
            setStatus('success');
            setTimeout(() => {
                setPreviewUrl(null);
                onUploadSuccess();
            }, 1500);
        } catch (e) {
            setStatus('error');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            {!previewUrl ? (
                <div onClick={() => fileInputRef.current?.click()} className="w-full max-w-sm border-2 border-dashed border-wedding-300 rounded-2xl p-10 text-center bg-white cursor-pointer hover:bg-wedding-50">
                    <div className="w-16 h-16 bg-wedding-100 rounded-full flex items-center justify-center mx-auto mb-4"><Camera className="text-wedding-600" /></div>
                    <p className="font-bold text-wedding-900">Take or Upload Photo</p>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFile} />
                </div>
            ) : (
                <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative aspect-square">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button onClick={() => setPreviewUrl(null)} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full"><X size={16} /></button>
                    </div>
                    <div className="p-4 space-y-4">
                        <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Add a caption..." className="w-full border rounded-lg p-3 text-sm focus:ring-1 focus:ring-wedding-500 outline-none h-20 resize-none" />
                        <Button onClick={handleUpload} isLoading={isUploading} className="w-full py-3">{status === 'success' ? 'Uploaded!' : 'Upload Now'}</Button>
                    </div>
                </div>
            )}
        </div>
    );
};
