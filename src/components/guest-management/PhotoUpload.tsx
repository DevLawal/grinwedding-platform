'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Guest } from '@/types/guest-management';
import { guestManagementService } from '@/lib/guest-management';
import { Camera, X, Upload, Sparkles } from 'lucide-react';

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
                    else reject(new Error("Canvas to Blob failed"));
                }, 'image/jpeg', 0.8);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
    });
};

interface PhotoUploadProps {
    guest: Guest;
    onUploadSuccess: () => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ guest, onUploadSuccess }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImageBlob, setSelectedImageBlob] = useState<Blob | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const resizedBlob = await resizeImage(file);
                setSelectedImageBlob(resizedBlob);
                setPreviewUrl(URL.createObjectURL(resizedBlob));
                setUploadStatus('idle');
                setCaption('');
                setErrorMessage('');
            } catch (e) {
                console.error("Error resizing image", e);
                setUploadStatus('error');
                setErrorMessage("Could not process image.");
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedImageBlob || !guest._id) return;
        setIsUploading(true);
        setErrorMessage('');
        try {
            const formData = new FormData();
            formData.append('photo', new File([selectedImageBlob], "upload.jpg", { type: "image/jpeg" }));
            formData.append('caption', caption.trim());
            formData.append('uploadedBy', guest.name);
            formData.append('uploaderId', guest._id);
            formData.append('eventId', guest.eventId);

            await guestManagementService.uploadPhoto(formData);
            setUploadStatus('success');

            setTimeout(() => {
                setSelectedImageBlob(null);
                setPreviewUrl(null);
                setCaption('');
                setUploadStatus('idle');
                onUploadSuccess();
            }, 2000);
        } catch (err: any) {
            console.error(err);
            setUploadStatus('error');
            setErrorMessage(err.message || "Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col h-full justify-center">
            {!previewUrl ? (
                <div
                    className="border-2 border-dashed border-stone-200 rounded-3xl p-12 text-center bg-white cursor-pointer hover:border-purple/30 hover:bg-stone-50 transition-all group"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="bg-stone-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-stone-100 shadow-sm">
                        <Camera size={40} className="text-stone-400 group-hover:text-purple transition-colors" />
                    </div>
                    <h3 className="text-xl font-serif text-slate-800 mb-2">Capture the Moment</h3>
                    <p className="text-sm text-stone-400 font-medium">Take a photo or upload from gallery</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            ) : (
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200">
                    <div className="relative bg-stone-100 aspect-square sm:aspect-video flex items-center justify-center">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                        <button
                            onClick={() => {
                                setSelectedImageBlob(null);
                                setPreviewUrl(null);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-md text-slate-800 p-2.5 rounded-full hover:bg-white transition-all"
                            disabled={isUploading}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="p-8">
                        {uploadStatus === 'idle' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-3 ml-1">
                                        Add a caption <span className="opacity-50">(optional)</span>
                                    </label>
                                    <textarea
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        placeholder="Tell us about this memory..."
                                        className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-purple/50 transition-all resize-none h-28 font-medium"
                                    />
                                </div>

                                <button
                                    onClick={handleUpload}
                                    className="w-full py-4 bg-purple text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-purple/90 transition-all disabled:opacity-50 shadow-lg shadow-purple/20 flex items-center justify-center gap-2"
                                    disabled={isUploading}
                                >
                                    {isUploading ? 'Sending...' : <><Upload size={18} /> Upload to Gallery</>}
                                </button>
                            </div>
                        )}

                        {uploadStatus === 'success' && (
                            <div className="text-center py-6 text-green-600 animate-in fade-in zoom-in duration-300">
                                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                                    <Sparkles size={32} className="text-green-500" />
                                </div>
                                <p className="font-serif italic text-lg text-slate-800">Sent for Approval!</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-2">Your photo will appear soon</p>
                            </div>
                        )}

                        {uploadStatus === 'error' && (
                            <div className="text-center py-4">
                                <p className="text-red-500 font-bold mb-2 uppercase tracking-widest text-[10px]">Upload Failed</p>
                                <p className="text-sm text-stone-500 mb-4">{errorMessage}</p>
                                <button 
                                    onClick={() => setUploadStatus('idle')} 
                                    className="text-xs font-bold uppercase tracking-widest text-purple border-b border-purple/30 pb-0.5"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
