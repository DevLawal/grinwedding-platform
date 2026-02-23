'use client';

import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import JSZip from 'jszip';
import { Guest } from '@/types/guest-management';
import { guestManagementService } from '@/lib/guest-management';
import {
    Users, Upload, UserPlus, Eye, EyeOff, Lock, Unlock, FolderDown, Download, Search, CheckCircle, Clock
} from 'lucide-react';

interface GuestManagerProps {
    eventId: string;
    onUpdate?: () => void;
}

export const GuestManager: React.FC<GuestManagerProps> = ({ eventId, onUpdate }) => {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [newGuestName, setNewGuestName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingZip, setIsGeneratingZip] = useState(false);

    const [showAccessCodes, setShowAccessCodes] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchGuests = async () => {
        if (!eventId) return;
        try {
            const data = await guestManagementService.getGuestsByEvent(eventId);
            setGuests(data);
        } catch (err) {
            console.error("Failed to fetch guests", err);
        }
    };

    React.useEffect(() => {
        fetchGuests();
    }, [eventId]);

    const totalGuests = guests.reduce((sum, guest) => sum + (guest.partySize || 1), 0);

    const filteredGuests = guests.filter(guest =>
        guest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generateRandomAccessCode = () => {
        return Math.floor(10000 + Math.random() * 90000).toString();
    };

    const handleAddGuest = async () => {
        if (!newGuestName.trim() || !eventId) return;
        setIsLoading(true);
        try {
            const accessCode = generateRandomAccessCode();
            const newGuestPayload: Partial<Guest> = {
                eventId,
                name: newGuestName,
                accessCode,
                status: 'invited',
                partySize: 1,
                category: 'General',
                qrCodeValue: `pending-${accessCode}` 
            };

            const createdGuest = await guestManagementService.addGuest(newGuestPayload);
            const realId = createdGuest._id;
            
            if (realId) {
                const qrPayload = JSON.stringify({
                    id: realId,
                    name: createdGuest.name,
                    type: 'nuptial-invite'
                });
                await guestManagementService.updateGuest(realId, { qrCodeValue: qrPayload });
            }

            setNewGuestName('');
            fetchGuests();
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error("Failed to add guest", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleCheckIn = async (guest: Guest) => {
        if (!guest._id) return;
        const newStatus = guest.status === 'checked-in' ? 'invited' : 'checked-in';
        try {
            await guestManagementService.updateGuest(guest._id, { 
                status: newStatus,
                checkInTime: newStatus === 'checked-in' ? new Date().toISOString() : undefined
            });
            fetchGuests();
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const parseCSVLine = (text: string) => {
        const result = [];
        let cell = '';
        let quote = false;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '"') {
                quote = !quote;
            } else if (char === ',' && !quote) {
                result.push(cell.trim());
                cell = '';
            } else {
                cell += char;
            }
        }
        result.push(cell.trim());
        return result.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"'));
    };

    const handleBatchUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !eventId) return;

        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const text = event.target?.result as string;
                const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');

                if (lines.length === 0) return;

                const newGuests: any[] = [];
                const headerLine = lines[0];
                const headers = parseCSVLine(headerLine).map(h => h.toLowerCase());

                let nameIndex = headers.findIndex(h => h.includes('name') || h.includes('guest'));
                let countIndex = headers.findIndex(h => h.includes('invite') || h.includes('number') || h.includes('pax') || h.includes('count'));
                let categoryIndex = headers.findIndex(h => h.includes('list') || h.includes('category') || h.includes('side') || h.includes('type'));

                let startIndex = 1;
                if (nameIndex === -1) {
                    nameIndex = 0;
                    countIndex = 1;
                    categoryIndex = 2;
                    startIndex = 0;
                }

                for (let i = startIndex; i < lines.length; i++) {
                    const row = parseCSVLine(lines[i]);
                    let name = row[nameIndex];
                    if (!name) continue;
                    name = name.replace(/^[\d\.\-\)\s]+/, '').replace(/\s+\d+$/, '').trim();
                    if (!name) continue;

                    let partySize = 1;
                    if (countIndex !== -1 && row[countIndex]) {
                        const parsedCount = parseInt(row[countIndex].replace(/[^0-9]/g, ''), 10);
                        if (!isNaN(parsedCount) && parsedCount > 0) partySize = parsedCount;
                    }

                    const accessCode = generateRandomAccessCode();
                    newGuests.push({
                        name,
                        qrCodeValue: `pending-${accessCode}`,
                        accessCode,
                        status: 'invited',
                        partySize,
                        category: categoryIndex !== -1 ? row[categoryIndex] : 'General'
                    });
                }

                if (newGuests.length > 0) {
                    await guestManagementService.bulkAddGuests(newGuests, eventId);
                    fetchGuests();
                    if (onUpdate) onUpdate();
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        };
        reader.readAsText(file);
    };

    const downloadQR = (guest: Guest) => {
        const guestId = guest._id || '';
        const svg = document.getElementById(`qr-${guestId}`);
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                if (ctx) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                }
                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = `${guest.name.replace(/\s+/g, '_')}-Invite.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            };
            img.src = "data:image/svg+xml;base64," + btoa(svgData);
        }
    };

    const handleBulkDownloadQR = async () => {
        setIsGeneratingZip(true);
        const zip = new JSZip();
        const folder = zip.folder("grin_wedding_qrs");

        try {
            const promises = filteredGuests.map(async (guest) => {
                const guestId = guest._id || '';
                const svg = document.getElementById(`qr-${guestId}`);
                if (svg) {
                    const blob = await new Promise<Blob | null>((resolve) => {
                        const svgData = new XMLSerializer().serializeToString(svg);
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        const img = new Image();
                        img.onload = () => {
                            canvas.width = img.width * 2;
                            canvas.height = img.height * 2;
                            if (ctx) {
                                ctx.fillStyle = "white";
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            }
                            canvas.toBlob(resolve, 'image/png');
                        };
                        img.onerror = () => resolve(null);
                        img.src = "data:image/svg+xml;base64," + btoa(svgData);
                    });

                    if (blob && folder) {
                        const safeName = guest.name.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
                        folder.file(`${safeName}.png`, blob);
                    }
                }
            });

            await Promise.all(promises);
            const content = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(content);
            const a = document.createElement("a");
            a.href = url;
            a.download = `guest_qrs.zip`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error(e);
        } finally {
            setIsGeneratingZip(false);
        }
    };

    return (
        <div className="space-y-6 text-left">
            {/* Add Guest Section */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 flex items-center gap-2">
                        <UserPlus size={18} className="text-purple" />
                        Add New Guest
                    </h3>
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[10px] font-bold uppercase tracking-widest text-purple border border-purple/20 px-3 py-1.5 rounded-lg hover:bg-purple/5 transition-all flex items-center gap-2"
                    >
                        <Upload size={14} /> Import CSV
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={handleBatchUpload} />
                </div>

                <div className="flex gap-3">
                    <input
                        type="text"
                        value={newGuestName}
                        onChange={(e) => setNewGuestName(e.target.value)}
                        placeholder="Guest Full Name"
                        className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple/50 transition-all font-medium"
                    />
                    <button 
                        onClick={handleAddGuest}
                        disabled={isLoading || !newGuestName.trim()}
                        className="bg-purple text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-purple/90 transition-all disabled:opacity-50"
                    >
                        {isLoading ? '...' : 'Add'}
                    </button>
                </div>
            </div>

            {/* Stats & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-stone-100/50 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-4">
                    <div className="relative max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter guests..."
                            className="bg-white border border-stone-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-purple/50 w-full"
                        />
                    </div>
                    <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest flex items-center gap-3">
                        <span className="flex items-center gap-1.5"><Users size={12} /> {totalGuests} Pax</span>
                        <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-green-500" /> {guests.filter(g => g.status === 'checked-in').length} In</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button 
                        onClick={() => setShowAccessCodes(!showAccessCodes)}
                        className="p-2 border border-stone-200 rounded-lg hover:bg-white transition-all text-stone-600"
                        title={showAccessCodes ? "Hide Codes" : "Show Codes"}
                    >
                        {showAccessCodes ? <Unlock size={16} /> : <Lock size={16} />}
                    </button>
                    <button 
                        onClick={handleBulkDownloadQR}
                        className="p-2 bg-purple text-white rounded-lg hover:bg-purple/90 transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4"
                        disabled={isGeneratingZip}
                    >
                        <FolderDown size={16} /> {isGeneratingZip ? 'Working...' : 'Export QRs'}
                    </button>
                </div>
            </div>

            {/* Guest List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGuests.slice().reverse().map(guest => (
                    <div key={guest._id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex gap-4 hover:border-purple/20 transition-all group">
                        <div className="bg-stone-50 p-2 rounded-xl border border-stone-100 flex-shrink-0">
                            <QRCode
                                id={`qr-${guest._id}`}
                                value={guest.qrCodeValue || 'pending'}
                                size={64}
                                level="M"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-slate-800 truncate block">{guest.name}</span>
                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${guest.status === 'checked-in' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                                    {guest.status === 'checked-in' ? 'Checked In' : 'Pending'}
                                </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        PIN: <span className="text-purple font-mono tracking-normal">{showAccessCodes ? guest.accessCode : '•••••'}</span>
                                    </p>
                                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        <Users size={10} /> Party of {guest.partySize}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleToggleCheckIn(guest)}
                                        className={`p-2 rounded-lg transition-all ${guest.status === 'checked-in' ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                                        title={guest.status === 'checked-in' ? "Reset Check-in" : "Check In Guest"}
                                    >
                                        <CheckCircle size={16} />
                                    </button>
                                    <button 
                                        onClick={() => downloadQR(guest)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-stone-400 hover:text-purple"
                                    >
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
