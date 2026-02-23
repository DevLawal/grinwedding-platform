'use client';

import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
// @ts-ignore
import JSZip from 'jszip';
import { Guest } from '../../../types/original-nuptial';
import { guestService } from '../../../lib/nuptial-api';
import { Button } from './Button';
import {
    Users, Upload, UserPlus, Eye, EyeOff, Lock, Unlock, FolderDown, Download, Search
} from 'lucide-react';

interface GuestManagerProps {
    guests: Guest[];
    onGuestAdded?: () => void;
}

export const GuestManager: React.FC<GuestManagerProps> = ({ guests, onGuestAdded }) => {
    const [newGuestName, setNewGuestName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingZip, setIsGeneratingZip] = useState(false);

    const [showGuestData, setShowGuestData] = useState(true);
    const [showAccessCodes, setShowAccessCodes] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const totalGuests = guests.reduce((sum, guest) => sum + (guest.partySize || 1), 0);
    const totalInvites = guests.length;

    const filteredGuests = guests.filter(guest =>
        guest.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generateRandomAccessCode = () => {
        return Math.floor(10000 + Math.random() * 90000).toString();
    };

    const handleAddGuest = async () => {
        if (!newGuestName.trim()) return;
        setIsLoading(true);
        try {
            const newGuestPayload: Partial<Guest> = {
                name: newGuestName,
                accessCode: generateRandomAccessCode(),
                status: 'invited',
                partySize: 1,
                category: 'General',
                qrCodeValue: 'pending'
            };

            const createdGuest = await guestService.create(newGuestPayload);
            const realId = createdGuest._id || createdGuest.id;
            const qrPayload = JSON.stringify({
                id: realId,
                name: createdGuest.name,
                type: 'nuptial-invite'
            });

            if (realId) {
                await guestService.update(realId, { qrCodeValue: qrPayload });
            }

            setNewGuestName('');
            if (onGuestAdded) onGuestAdded();
        } catch (err) {
            console.error("Failed to add guest", err);
            alert("Failed to add guest");
        } finally {
            setIsLoading(false);
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
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const text = event.target?.result as string;
                const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '');

                if (lines.length === 0) {
                    alert("File is empty.");
                    setIsLoading(false);
                    return;
                }

                const newGuests: Partial<Guest>[] = [];
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

                    let category = 'General';
                    if (categoryIndex !== -1 && row[categoryIndex]) category = row[categoryIndex];

                    newGuests.push({
                        name,
                        qrCodeValue: 'pending-batch',
                        accessCode: generateRandomAccessCode(),
                        status: 'invited',
                        partySize,
                        category
                    });
                }

                if (newGuests.length > 0) {
                    await guestService.createBulk(newGuests);
                    alert(`Successfully imported ${newGuests.length} guests.`);
                    if (onGuestAdded) onGuestAdded();
                } else {
                    alert("No valid guests found in file.");
                }
            } catch (err) {
                console.error(err);
                alert("Failed to process file.");
            } finally {
                setIsLoading(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        };
        reader.readAsText(file);
    };

    const downloadQR = (guest: Guest) => {
        const guestId = guest._id || guest.id || '';
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
        if (!showGuestData) {
            alert("Please click 'Show List' to enable bulk download.");
            return;
        }

        setIsGeneratingZip(true);
        const zip = new JSZip();
        const folder = zip.folder("grin_weddings_guest_qrs");

        let count = 0;
        try {
            const promises = filteredGuests.map(async (guest) => {
                const guestId = guest._id || guest.id || '';
                const svg = document.getElementById(`qr-${guestId}`);
                if (svg) {
                    const blob = await new Promise<Blob | null>((resolve) => {
                        const svgData = new XMLSerializer().serializeToString(svg);
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        const img = new Image();
                        img.onload = () => {
                            const scale = 3;
                            canvas.width = img.width * scale;
                            canvas.height = img.height * scale;
                            if (ctx) {
                                ctx.fillStyle = "white";
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                ctx.imageSmoothingEnabled = false;
                                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                            }
                            canvas.toBlob(resolve, 'image/png');
                        };
                        img.onerror = () => resolve(null);
                        img.src = "data:image/svg+xml;base64," + btoa(svgData);
                    });

                    if (blob && folder) {
                        const safeName = guest.name.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
                        folder.file(`${safeName}_${guestId.substring(0, 4)}.png`, blob);
                        count++;
                    }
                }
            });

            await Promise.all(promises);

            if (count > 0) {
                const content = await zip.generateAsync({ type: "blob" });
                const url = URL.createObjectURL(content);
                const a = document.createElement("a");
                a.href = url;
                a.download = `grin_weddings_qrs_${new Date().toISOString().slice(0, 10)}.zip`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => URL.revokeObjectURL(url), 100);
            } else {
                alert("No QR codes found. Make sure guests are visible on the screen.");
            }
        } catch (e) {
            console.error("Bulk download failed", e);
            alert("Failed to generate zip file.");
        } finally {
            setIsGeneratingZip(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold flex items-center gap-2"><UserPlus size={20} /> Add Guests</h2>
                    <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
                        <Upload size={16} className="mr-2" /> Import CSV
                    </Button>
                    <input type="file" ref={fileInputRef} className="hidden" accept=".csv,.txt" onChange={handleBatchUpload} />
                </div>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newGuestName}
                        onChange={(e) => setNewGuestName(e.target.value)}
                        placeholder="Guest Name (e.g. John Doe)"
                        className="flex-1 bg-white text-black placeholder-gray-400 border border-wedding-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-wedding-500 outline-none"
                    />
                    <Button onClick={handleAddGuest} isLoading={isLoading}>Add</Button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50 p-2 rounded-lg">
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search guests..."
                        className="w-full bg-white text-black placeholder-gray-400 border border-wedding-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-wedding-500 outline-none"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center bg-white px-3 py-1.5 rounded-lg border border-wedding-200">
                        <Users size={14} className="text-wedding-600 mr-1.5" />
                        <span className="text-sm font-medium">{totalInvites} invites / {totalGuests} guests</span>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => setShowGuestData(!showGuestData)}>
                        {showGuestData ? 'Hide List' : 'Show List'}
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setShowAccessCodes(!showAccessCodes)} disabled={!showGuestData}>
                        {showAccessCodes ? 'Hide Codes' : 'Show Codes'}
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleBulkDownloadQR} disabled={!showGuestData || filteredGuests.length === 0} isLoading={isGeneratingZip}>
                        <FolderDown size={16} className="mr-2" /> Export QRs
                    </Button>
                </div>
            </div>

            {showGuestData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredGuests.slice().reverse().map(guest => (
                        <div key={guest._id || guest.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                            <div className="bg-white p-2 rounded border border-gray-100">
                                <QRCode id={`qr-${guest._id || guest.id}`} value={guest.qrCodeValue || 'pending'} size={80} level="L" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg text-gray-800">{guest.name}</h3>
                                    {guest.category && <span className="text-[10px] uppercase font-bold bg-gray-100 px-2 py-1 rounded">{guest.category}</span>}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Code: {showAccessCodes ? guest.accessCode : '•••••'}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={`text-xs px-2 py-1 rounded-full ${guest.status === 'checked-in' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {guest.status === 'checked-in' ? 'Checked In' : 'Invited'}
                                    </span>
                                    <button onClick={() => downloadQR(guest)} className="text-wedding-600 hover:text-wedding-800 text-xs flex items-center">
                                        <Download size={14} className="mr-1" /> Save QR
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
