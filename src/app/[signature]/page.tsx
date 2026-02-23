'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ViewState, Guest, AdminState, GuestState } from '@/types/original-nuptial';
import { guestService, setEventId } from '@/lib/nuptial-api';
import { AdminPanel } from '@/components/guest-management/original/AdminPanel';
import { GuestPortal } from '@/components/guest-management/original/GuestPortal';
import { Button } from '@/components/guest-management/original/Button';
import { Heart, Lock, User, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { guestManagementService } from '@/lib/guest-management';

export default function WeddingPage() {
  const { signature } = useParams();
  const [view, setView] = useState<ViewState>('landing');
  const [adminState, setAdminState] = useState<AdminState>({ isAuthenticated: false, activeTab: 'guests' });
  const [guestState, setGuestState] = useState<GuestState>({ isAuthenticated: false, activeTab: 'gallery' });
  const [event, setEvent] = useState<any>(null);

  // Landing Page State
  const [accessCode, setAccessCode] = useState('');
  const [showInputCode, setShowInputCode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [landingError, setLandingError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Animation State
  const [showSplash, setShowSplash] = useState(false);
  const [pendingView, setPendingView] = useState<ViewState | null>(null);

  useEffect(() => {
    if (signature) {
      guestManagementService.getEventBySignature(signature as string)
        .then(data => {
            setEvent(data);
            setEventId(data._id); // Bridge to legacy API layer
        })
        .catch(console.error);
    }
  }, [signature]);

  useEffect(() => {
    if (showSplash && pendingView) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        setView(pendingView);
        setPendingView(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSplash, pendingView]);

  const triggerLoginTransition = (targetView: ViewState) => {
    setPendingView(targetView);
    setShowSplash(true);
  };

  const handleGuestLogin = async () => {
    if (accessCode.length < 5) {
      setLandingError('Please enter a 5-digit code.');
      return;
    }
    setIsLoading(true);
    setLandingError('');
    try {
      const guest = await guestService.login(accessCode);
      if (guest) {
        setGuestState({ isAuthenticated: true, activeTab: 'gallery', currentGuest: guest });
        triggerLoginTransition('guest');
      } else {
        setLandingError('Invalid Access Code. Please check with the wedding planner.');
      }
    } catch (e: any) {
      setLandingError(e.message || 'Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === event?.rsvpCode) {
      setAdminState({ isAuthenticated: true, activeTab: 'guests' });
      setLandingError('');
      triggerLoginTransition('admin');
    } else {
      setLandingError('Invalid Admin Password.');
    }
  };

  if (!event) {
    return (
        <div className="min-h-screen bg-wedding-50 flex items-center justify-center p-8">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <Heart className="text-wedding-200 fill-wedding-100" size={60} />
                <p className="text-wedding-400 font-serif italic">Loading Celebration...</p>
            </div>
        </div>
    );
  }

  // Splash Screen
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] bg-wedding-50 flex flex-col items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <div className="flex justify-center mb-6">
            <div className="relative animate-heartbeat">
              <Heart size={80} className="text-wedding-200 fill-wedding-100" />
              <Heart size={40} className="text-wedding-600 fill-wedding-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-wedding-900 leading-tight">
            {event.name.split('&')[0]}
            <span className="block text-wedding-500 text-2xl md:text-3xl my-2 italic font-light">&</span>
            {event.name.split('&')[1]}
          </h1>
          <div className="h-px w-24 bg-wedding-300 mx-auto my-6"></div>
          <p className="font-sans text-wedding-600 tracking-widest uppercase text-sm">Welcome to the Celebration</p>
        </div>
      </div>
    );
  }

  const renderWeddingLogin = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-wedding-50 relative">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md border border-wedding-100 relative overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-wedding-200 rounded-tl-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-wedding-200 rounded-br-3xl opacity-50 pointer-events-none"></div>

        <div className="text-center mb-10 mt-4">
          <p className="text-wedding-500 text-xs font-bold tracking-[0.2em] uppercase mb-3">Celebrating the union</p>
          <h1 className="text-4xl md:text-5xl font-serif text-wedding-900 leading-tight mb-2">
            {event.name.split('&')[0]}
            <br />
            <span className="text-2xl text-wedding-400 italic">weds</span>
            <br />
            {event.name.split('&')[1]}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4 text-wedding-600">
            <Heart size={16} fill="currentColor" />
            <span className="text-sm font-serif italic">Forever & Always</span>
            <Heart size={16} fill="currentColor" />
          </div>
        </div>

        <div className="space-y-8 relative z-20">
          <div className="bg-wedding-50 p-6 rounded-xl border border-wedding-100">
            <h2 className="text-lg font-bold text-wedding-800 mb-3 flex items-center justify-center">
              <User className="mr-2" size={20} />
              Guest Access
            </h2>
            <div className="flex flex-col gap-3">
              <div className="relative w-full">
                <input
                  type={showInputCode ? "text" : "password"}
                  maxLength={5}
                  placeholder="Enter 5-digit code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full bg-white text-black placeholder-gray-400 border border-wedding-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-wedding-500 focus:border-transparent outline-none text-center tracking-[0.2em] text-lg font-sans shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowInputCode(!showInputCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showInputCode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button onClick={handleGuestLogin} className="w-full justify-center" isLoading={isLoading}>Enter Portal</Button>
            </div>
          </div>

          <div className="border-t border-wedding-100 pt-6">
            <details className="group">
              <summary className="flex items-center justify-center text-xs font-semibold text-wedding-400 uppercase tracking-wider cursor-pointer list-none hover:text-wedding-600 transition-colors focus:outline-none">
                <Lock className="mr-2" size={14} />
                Admin / Staff Login
              </summary>
              <div className="flex flex-col gap-3 mt-4">
                <input
                  type="password"
                  placeholder="Admin Password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full bg-white text-black border border-wedding-300 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-wedding-500 outline-none"
                />
                <Button variant="secondary" onClick={handleAdminLogin} className="w-full justify-center">Login</Button>
              </div>
            </details>
          </div>

          {landingError && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">
              {landingError}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center space-y-1 relative z-20">
        <p className="text-wedding-400 text-xs font-serif italic">Grin Weddings</p>
        <p className="text-wedding-300 text-[10px] uppercase tracking-wider">powered by Alatechdigitals</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {view === 'landing' && renderWeddingLogin()}
      {view === 'admin' && adminState.isAuthenticated && (
        <AdminPanel onLogout={() => setView('landing')} />
      )}
      {view === 'guest' && guestState.isAuthenticated && guestState.currentGuest && (
        <GuestPortal
          guest={guestState.currentGuest}
          onLogout={() => setView('landing')}
        />
      )}
    </div>
  );
}
