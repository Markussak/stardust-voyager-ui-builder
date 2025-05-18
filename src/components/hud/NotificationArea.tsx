
import React, { useState, useEffect } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'critical' | 'questUpdate' | 'itemPickup';
  timestamp: number;
}

// For demonstration purposes
const demoNotifications: Notification[] = [
  {
    id: '1',
    message: 'System scan completed',
    type: 'info',
    timestamp: Date.now()
  }
];

const NotificationArea = () => {
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  
  // Color mapping according to notification type
  const getColor = (type: Notification['type']) => {
    switch(type) {
      case 'warning': return 'text-yellow-300';
      case 'critical': return 'text-red-400 animate-pulse';
      case 'questUpdate': return 'text-green-400';
      case 'itemPickup': return 'text-blue-200';
      default: return 'text-white';
    }
  };
  
  // Remove notifications after they expire
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setNotifications(prev => 
        prev.filter(notification => now - notification.timestamp < 5000)
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-96 max-h-32 overflow-hidden">
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`px-3 py-1.5 mb-1 bg-black bg-opacity-60 rounded-md animate-fade-in ${getColor(notification.type)}`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationArea;
