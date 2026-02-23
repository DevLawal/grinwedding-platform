'use client';

import React from 'react';
import { Notification } from '../../../types/original-nuptial';
import { Button } from './Button';
import { Bell, Trash, MessageCircle, Heart } from 'lucide-react';

interface GuestNotificationsProps {
    notifications: Notification[];
    onNotificationClick: (notif: Notification) => void;
    onClearAll: () => void;
    isClearingNotifications: boolean;
}

export const GuestNotifications: React.FC<GuestNotificationsProps> = ({
    notifications, onNotificationClick, onClearAll, isClearingNotifications
}) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold font-serif text-wedding-900">Notifications</h2>
                {notifications.length > 0 && <Button variant="ghost" size="sm" onClick={onClearAll} isLoading={isClearingNotifications}><Trash size={14} className="mr-1" /> Clear All</Button>}
            </div>

            <div className="space-y-3">
                {notifications.map(notif => (
                    <div key={notif._id || notif.id} onClick={() => onNotificationClick(notif)} className={`bg-white p-3 rounded-xl border border-wedding-100 flex gap-4 cursor-pointer hover:bg-wedding-50 transition-colors ${notif.read ? 'opacity-60' : ''}`}>
                        <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                            {notif.photoUrl && <img src={notif.photoUrl} alt="Photo" className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <p className="text-sm">
                                <span className="font-bold">{notif.fromUserName || 'Someone'}</span>
                                {notif.type === 'reaction' ? ' reacted to your photo' : ' commented on your photo'}
                            </p>
                            <span className="text-[10px] text-gray-400 mt-1">{new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        {!notif.read && <div className="w-2 h-2 bg-red-500 rounded-full self-center"></div>}
                    </div>
                ))}
                {notifications.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <Bell size={48} className="mx-auto mb-2 opacity-20" />
                        <p>No notifications yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
