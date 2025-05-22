
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActiveDynamicEvent, EventPlayerChoice } from '@/types/events';
import { useDynamicEvents } from '@/contexts/DynamicEventsContext';

interface EventInteractionDialogProps {
    event: ActiveDynamicEvent;
    onClose: () => void;
}

const EventInteractionDialog: React.FC<EventInteractionDialogProps> = ({ event, onClose }) => {
    const { handlePlayerChoice } = useDynamicEvents();
    
    // Only show for events that have player choices
    if (!event.definition.playerInteraction_Options || event.playerChoiceMade) {
        return null;
    }
    
    const handleChoice = (choice: EventPlayerChoice) => {
        handlePlayerChoice(event.definition.eventId, choice.choiceId);
        onClose();
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
            <div className="bg-space-dark border border-space-buttons-border rounded-lg w-3/4 max-w-2xl overflow-hidden">
                <div className="flex items-center justify-between bg-space-buttons p-4 border-b border-space-buttons-border">
                    <h2 className="text-xl font-pixel text-white">{event.definition.defaultEventName}</h2>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={onClose}
                    >
                        <X size={20} />
                    </Button>
                </div>
                
                <div className="p-6">
                    <p className="text-space-ui-text mb-6">
                        {event.definition.defaultEventDescription_Short}
                    </p>
                    
                    <h3 className="font-pixel text-space-ui-text mb-3">Vyberte svou reakci:</h3>
                    
                    <div className="space-y-3">
                        {event.definition.playerInteraction_Options.map((choice) => (
                            <Button 
                                key={choice.choiceId}
                                variant="outline"
                                className="w-full text-left justify-start p-4 h-auto font-normal border-space-buttons-border hover:bg-space-buttons/20 transition-colors"
                                onClick={() => handleChoice(choice)}
                            >
                                <span className="block">
                                    <span className="block font-pixel mb-1">{choice.defaultChoiceText}</span>
                                    
                                    {/* This would show effects in a real implementation */}
                                    {choice.action_Effect_Impacts.length > 0 && choice.action_Effect_Impacts[0].defaultDescription_Impact && (
                                        <span className="block text-xs text-space-ui-subtext">
                                            {choice.action_Effect_Impacts[0].defaultDescription_Impact}
                                            {choice.action_Effect_Impacts.length > 1 ? ` (+${choice.action_Effect_Impacts.length - 1} další dopady)` : ''}
                                        </span>
                                    )}
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventInteractionDialog;
