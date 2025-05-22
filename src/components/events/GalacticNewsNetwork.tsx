
import React from 'react';
import { useDynamicEvents } from '@/contexts/DynamicEventsContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X, BellRing } from 'lucide-react';

// Component to display news in ticker style on HUD
export const NewsTickerHUD: React.FC = () => {
    const { newsMessages, markNewsMessageAsRead, openNewsTerminal } = useDynamicEvents();
    
    // Filter to only show unread messages for ticker
    const unreadMessages = newsMessages
        .filter(msg => !msg.read)
        .sort((a, b) => b.priority - a.priority || b.timestamp - a.timestamp)
        .slice(0, 3); // Limit to 3 most recent/important
    
    if (unreadMessages.length === 0) return null;
    
    return (
        <div className="fixed bottom-20 left-4 z-30 max-w-md">
            <div className="bg-space-dark/80 backdrop-blur-sm border border-space-border rounded-md overflow-hidden">
                <div className="flex items-center justify-between bg-space-buttons p-2">
                    <div className="flex items-center">
                        <BellRing size={16} className="text-yellow-400 mr-2" />
                        <h3 className="text-sm font-pixel text-white">Galaktické Zprávy</h3>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={openNewsTerminal}
                    >
                        <span className="text-xs text-blue-400 underline">Zobrazit Vše</span>
                    </Button>
                </div>
                
                <div className="p-2">
                    {unreadMessages.map(message => (
                        <div 
                            key={message.id} 
                            className="p-2 mb-1 border-b border-space-buttons-border last:border-b-0 animate-fade-in"
                            onClick={() => markNewsMessageAsRead(message.id)}
                        >
                            <h4 className="text-sm font-pixel text-yellow-400">{message.title}</h4>
                            <p className="text-xs text-space-ui-text line-clamp-2">{message.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Component for the full news terminal dialog
export const NewsTerminal: React.FC = () => {
    const { 
        newsMessages, 
        markNewsMessageAsRead, 
        isNewsTerminalOpen, 
        closeNewsTerminal 
    } = useDynamicEvents();
    
    if (!isNewsTerminalOpen) return null;
    
    // Sort messages by timestamp (newest first)
    const sortedMessages = [...newsMessages].sort((a, b) => b.timestamp - a.timestamp);
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
            <div className="bg-space-dark border border-space-buttons-border rounded-lg w-3/4 max-w-4xl h-3/4 overflow-hidden">
                <div className="flex items-center justify-between bg-space-buttons p-4 border-b border-space-buttons-border">
                    <div className="flex items-center">
                        <BellRing size={20} className="text-yellow-400 mr-2" />
                        <h2 className="text-xl font-pixel text-white">Galaktické Zprávy - GNN</h2>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={closeNewsTerminal}
                    >
                        <X size={20} />
                    </Button>
                </div>
                
                <ScrollArea className="h-[calc(100%-4rem)]">
                    <div className="p-4">
                        {sortedMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40">
                                <p className="text-space-ui-subtext">Žádné zprávy k zobrazení</p>
                            </div>
                        ) : (
                            sortedMessages.map(message => (
                                <div 
                                    key={message.id} 
                                    className={`p-4 mb-4 rounded-md border ${message.read ? 'border-space-border bg-space-dark/50' : 'border-space-buttons-border bg-space-dark/80'}`}
                                    onClick={() => markNewsMessageAsRead(message.id)}
                                >
                                    <div className="flex items-center mb-2">
                                        {message.sourceIcon && (
                                            <div className="w-8 h-8 mr-3 flex-shrink-0">
                                                {/* In a real game, this would be the actual icon: */}
                                                {/*<img src={message.sourceIcon} alt="" className="w-full h-full" />*/}
                                                <div className="w-full h-full bg-blue-900 rounded-full flex items-center justify-center">
                                                    <span className="text-xs">GNN</span>
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <h3 className={`font-pixel ${message.read ? 'text-yellow-600' : 'text-yellow-400'}`}>{message.title}</h3>
                                            <span className="text-xs text-space-ui-subtext">
                                                {new Date(message.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <p className={`text-sm ${message.read ? 'text-space-ui-subtext' : 'text-space-ui-text'}`}>
                                        {message.content}
                                    </p>
                                    {!message.read && (
                                        <div className="mt-2 text-right">
                                            <span className="text-xs text-blue-400">Klikni pro označení jako přečtené</span>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};
