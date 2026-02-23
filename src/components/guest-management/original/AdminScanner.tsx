'use client';

import React, { useState } from 'react';
import { Guest } from '../../../types/original-nuptial';
import { guestService } from '../../../lib/nuptial-api';
import { Button } from './Button';
import { ScanLine, Check, UserCheck, Users, X, UserMinus } from 'lucide-react';
import dynamic from 'next/dynamic';

const QRCodeScanner = dynamic(() => import('./QRCodeScanner').then(mod => mod.QRCodeScanner), { 
    ssr: false,
    loading: () => <div className="aspect-[3/4] bg-stone-100 animate-pulse rounded-xl flex items-center justify-center text-[10px] text-stone-400 font-black uppercase tracking-widest">Waking Scanner...</div>
});

interface AdminScannerProps {
    guests: Guest[];
    onGuestUpdated?: () => void;
}

export const AdminScanner: React.FC<AdminScannerProps> = ({ guests, onGuestUpdated }) => {
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [scannedGuest, setScannedGuest] = useState<Guest | null>(null);
    const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'processing' | 'complete'>('idle');
    const isProcessingRef = React.useRef(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (scanStatus === 'idle' || scanStatus === 'scanning') {
            isProcessingRef.current = false;
        }
    }, [scanStatus]);

    const handleScan = React.useCallback(async (data: string) => {
        if (data && !isProcessingRef.current) {
            isProcessingRef.current = true;
            setScannedData(data);
            setScanStatus('processing');

            let guest: Guest | undefined;
            try {
                const parsed = JSON.parse(data);
                const guestId = parsed.id || parsed._id;
                if (guestId) {
                    guest = guests.find(g => (g._id === guestId || g.id === guestId));
                }
            } catch (e) {}

            if (!guest) guest = guests.find(g => g.qrCodeValue === data);
            if (!guest) guest = guests.find(g => (g._id === data || g.id === data));

            setScannedGuest(guest || null);
            setScanStatus('complete');
        }
    }, [guests]);

    const handleManualCheckIn = async () => {
        const inviteCode = inputRef.current?.value.trim();
        if (!inviteCode) {
            alert("Please enter an invite code");
            return;
        }
        setScanStatus('processing');
        const guest = guests.find(g => g.accessCode === inviteCode);
        setScannedGuest(guest || null);
        setScannedData(`Manual check-in: ${guest?.name || inviteCode}`);
        setScanStatus('complete');
    };

    const handleCheckIn = async () => {
        if (!scannedGuest) return;
        try {
            const id = scannedGuest._id || scannedGuest.id;
            if (!id) throw new Error("Guest has no ID");
            await guestService.updateStatus(id, 'checked-in');
            setScannedGuest({ ...scannedGuest, status: 'checked-in' });
            if (onGuestUpdated) onGuestUpdated();
            alert(`${scannedGuest.name} checked in!`);
        } catch (e) {
            alert("Failed to check in guest.");
        }
    };

    const handleCheckOut = async () => {
        if (!scannedGuest) return;
        try {
            const id = scannedGuest._id || scannedGuest.id;
            if (!id) throw new Error("Guest has no ID");
            await guestService.updateStatus(id, 'invited');
            setScannedGuest({ ...scannedGuest, status: 'invited' });
            if (onGuestUpdated) onGuestUpdated();
            alert(`${scannedGuest.name} checked out!`);
        } catch (e) {
            alert("Failed to check out guest.");
        }
    };

    return (
        <div className="flex flex-col items-center">
            {scanStatus === 'idle' && (
                <div className="w-full max-w-md space-y-4">
                    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-center font-bold mb-4">Scan Guest QR</h3>
                        <Button onClick={() => setScanStatus('scanning')} className="w-full py-3">
                            <ScanLine size={20} className="mr-2" /> Start Scanning
                        </Button>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="flex gap-2">
                            <input ref={inputRef} className="bg-white text-black border border-gray-200 p-2 rounded flex-1 text-sm text-center" placeholder="Enter 5-digit code" />
                            <Button size="sm" variant="secondary" onClick={handleManualCheckIn}>Check</Button>
                        </div>
                    </div>
                </div>
            )}

            {scanStatus === 'scanning' && (
                <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-md border">
                    <QRCodeScanner onScan={handleScan} isScanning={true} />
                    <Button onClick={() => setScanStatus('idle')} variant="ghost" className="w-full mt-4">Cancel</Button>
                </div>
            )}

            {scanStatus === 'processing' && (
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border">
                    <div className="mx-auto bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
                    </div>
                    <h2 className="text-xl font-bold">Processing...</h2>
                </div>
            )}

            {scanStatus === 'complete' && (
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border">
                    {scannedGuest ? (
                        <>
                            <div className={`mx-auto ${scannedGuest.status === 'checked-in' ? 'bg-yellow-100' : 'bg-green-100'} w-20 h-20 rounded-full flex items-center justify-center mb-4`}>
                                {scannedGuest.status === 'checked-in' ? <UserCheck className="text-yellow-600" size={40} /> : <Check className="text-green-600" size={40} />}
                            </div>
                            <h2 className="text-2xl font-bold">{scannedGuest.name}</h2>
                            <p className="text-sm text-gray-500 mb-4">{scannedGuest.category}</p>
                            <div className="bg-wedding-50 p-4 rounded-xl border border-dashed border-wedding-300 mb-6 font-bold text-wedding-900">
                                Party of {scannedGuest.partySize || 1}
                            </div>
                            <div className="flex gap-4">
                                {scannedGuest.status !== 'checked-in' ? (
                                    <Button onClick={handleCheckIn} className="flex-1 bg-green-600">Check In</Button>
                                ) : (
                                    <Button onClick={handleCheckOut} className="flex-1 bg-yellow-600">Check Out</Button>
                                )}
                                <Button onClick={() => setScanStatus('idle')} variant="ghost" className="flex-1">Next</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mx-auto bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mb-4"><X className="text-red-600" size={40} /></div>
                            <h2 className="text-2xl font-bold mb-4">Invalid Code</h2>
                            <Button onClick={() => setScanStatus('idle')} className="w-full">Try Again</Button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
