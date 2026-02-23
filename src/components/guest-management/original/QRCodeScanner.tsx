'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';

interface QRCodeScannerProps {
    onScan: (data: string) => void;
    isScanning: boolean;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan, isScanning }) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isScanning && !scannerRef.current) {
            const config = {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                rememberLastUsedCamera: true,
                showTorchButtonIfSupported: true,
            };

            const scanner = new Html5QrcodeScanner(
                'qr-reader',
                config,
                /* verbose= */ false
            );

            scanner.render(
                (decodedText) => {
                    onScan(decodedText);
                    // scanner.clear(); // Optionally clear after success
                },
                (errorMessage) => {
                    // console.error(errorMessage);
                }
            );

            scannerRef.current = scanner;
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
                scannerRef.current = null;
            }
        };
    }, [isScanning, onScan]);

    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden rounded-xl border-2 border-wedding-200 bg-black shadow-inner">
            <div id="qr-reader" className="w-full"></div>
            {error && <div className="p-2 text-xs text-red-500 bg-red-50 text-center">{error}</div>}
        </div>
    );
};
