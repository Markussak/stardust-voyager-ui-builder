import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
    DynamicEventsContextType, 
    DynamicEventDefinition, 
    ActiveDynamicEvent,
    DynamicEventSystemConfig
} from '../types/events';
import { useGame } from './GameContext';
import { sampleDynamicEvents } from '../data/dynamicEvents';

// Configuration for the dynamic events system
const defaultEventSystemConfig: DynamicEventSystemConfig = {
    id: "MainDynamicEventSystem",
    eventCheckFrequency_GameTurns: 24, // Jednou za herní den (pokud 1 tah = 1 hodina)
    maxActiveGlobalEvents: 5, // Maximální počet souběžných globálních událostí
    maxActiveLocalEvents_PerSystem: 2, // Maximální počet lokálních událostí v jednom systému
    eventDatabase_Path: "assets/data/events/dynamic_events_cz.json",
    galacticNewsNetwork_UI: {
        displayLocation: "Station_NewsTerminal_Interactive",
        hudTicker_Enabled: true,
        hudTicker_MaxMessages: 3,
        hudTicker_ScrollSpeed: 2,
        newsTerminal_Style: {},
        messageStyle: {
            fontFamily: "PixelOperator8",
            fontSizePx: 14,
            color_Headline: "#FFD700",
            color_Body: "#E0E0E0",
            color_FactionSource_Template: "USE_FACTION_PRIMARY_COLOR",
            icon_EventType_AssetPathPrefix: "assets/images/icons/gnn/event_type_"
        },
        soundEffect_NewMessage: "sfx/ui/gnn_new_message_incoming_transmission.wav"
    },
    playerNotification_ForDirectImpactEvents: {
        enabled: true,
        notificationType: "PopupDialog_WithChoices"
    }
};

// Create context with default values
const DynamicEventsContext = createContext<DynamicEventsContextType>({
    activeEvents: [],
    eventHistory: [],
    newsMessages: [],
    triggerEvent: () => false,
    handlePlayerChoice: () => {},
    markNewsMessageAsRead: () => {},
    openNewsTerminal: () => {},
    isNewsTerminalOpen: false,
    closeNewsTerminal: () => {},
    config: defaultEventSystemConfig
});

export const useDynamicEvents = () => {
    const context = useContext(DynamicEventsContext);
    if (!context) {
        throw new Error('useDynamicEvents must be used within a DynamicEventsProvider');
    }
    return context;
};

export const DynamicEventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isGameStarted, gameState } = useGame();
    const [config] = useState<DynamicEventSystemConfig>(defaultEventSystemConfig);
    const [activeEvents, setActiveEvents] = useState<ActiveDynamicEvent[]>([]);
    const [eventHistory, setEventHistory] = useState<ActiveDynamicEvent[]>([]);
    const [newsMessages, setNewsMessages] = useState<{
        id: string;
        title: string;
        content: string;
        sourceIcon?: string;
        timestamp: number;
        read: boolean;
        priority: number;
    }[]>([]);
    const [isNewsTerminalOpen, setIsNewsTerminalOpen] = useState(false);
    const [gameTime, setGameTime] = useState(0);
    
    // For demo, we'll use the sampleEvents directly
    const [eventDefinitions] = useState<DynamicEventDefinition[]>(sampleDynamicEvents);

    // Update game time (in a real game, this would be tied to the game's time system)
    useEffect(() => {
        if (!isGameStarted) return;
        
        const interval = setInterval(() => {
            setGameTime(prev => prev + 1);
        }, 10000); // Each 10 seconds of real time = 1 game hour for testing
        
        return () => clearInterval(interval);
    }, [isGameStarted]);

    // Check for random events based on time
    useEffect(() => {
        if (!isGameStarted || gameTime === 0) return;
        
        // Only check on intervals defined by eventCheckFrequency_GameTurns
        if (gameTime % config.eventCheckFrequency_GameTurns !== 0) return;
        
        // Get events that could be triggered randomly by time
        const possibleTimeEvents = eventDefinitions.filter(event => 
            event.triggerConditions.some(condition => 
                condition.type === 'TimeElapsed_Random' && 
                !activeEvents.some(active => active.definition.eventId === event.eventId) &&
                !eventHistory.some(historic => 
                    historic.definition.eventId === event.eventId && 
                    historic.definition.isUnique_OneTimeEvent === true
                )
            )
        );
        
        // For each possible event, check if it should trigger
        possibleTimeEvents.forEach(eventDef => {
            const timeCondition = eventDef.triggerConditions.find(c => c.type === 'TimeElapsed_Random');
            if (!timeCondition || !timeCondition.parameters) return;
            
            const { minTime_Days, maxTime_Days } = timeCondition.parameters;
            const probabilityFactor = timeCondition.probabilityFactor || 0.1;
            
            // Convert to game hours
            const minTime = minTime_Days * 24;
            const maxTime = maxTime_Days * 24;
            
            // If we're within the time range, roll for event chance
            if (gameTime >= minTime && gameTime <= maxTime) {
                const roll = Math.random();
                if (roll <= probabilityFactor) {
                    triggerEvent(eventDef.eventId);
                }
            }
        });
    }, [gameTime, isGameStarted, eventDefinitions, activeEvents, eventHistory, config.eventCheckFrequency_GameTurns]);

    // Process active events to see if any should end
    useEffect(() => {
        if (!isGameStarted || activeEvents.length === 0) return;
        
        const updatedActiveEvents = [...activeEvents];
        const eventsToRemove: string[] = [];
        
        updatedActiveEvents.forEach(event => {
            // Check for time-based duration events
            if (typeof event.definition.duration_GameTurns_Or_SpecificCondition === 'number') {
                const duration = event.definition.duration_GameTurns_Or_SpecificCondition as number;
                if (gameTime >= event.startTimestamp + duration) {
                    eventsToRemove.push(event.definition.eventId);
                    
                    // Add to history
                    setEventHistory(prev => [...prev, {
                        ...event,
                        endTimestamp: gameTime
                    }]);
                }
            }
            
            // Other event end conditions would be checked here
        });
        
        if (eventsToRemove.length > 0) {
            setActiveEvents(prev => prev.filter(ev => !eventsToRemove.includes(ev.definition.eventId)));
        }
    }, [gameTime, isGameStarted, activeEvents]);

    // Function to trigger an event by ID
    const triggerEvent = (eventId: string, parameters?: any): boolean => {
        const eventDefinition = eventDefinitions.find(e => e.eventId === eventId);
        if (!eventDefinition) {
            console.error(`Event with ID ${eventId} not found`);
            return false;
        }
        
        // Check if this is a unique event that has already occurred
        if (eventDefinition.isUnique_OneTimeEvent && 
            eventHistory.some(e => e.definition.eventId === eventId)) {
            console.log(`Event ${eventId} is unique and has already occurred`);
            return false;
        }
        
        // Check if we already have too many active global events
        if (activeEvents.length >= config.maxActiveGlobalEvents) {
            console.log(`Cannot trigger event ${eventId}, maximum active events reached`);
            return false;
        }
        
        // Create new active event
        const newActiveEvent: ActiveDynamicEvent = {
            definition: eventDefinition,
            startTimestamp: gameTime,
            impactsApplied: false,
            impactsReverted: false,
            relatedEntities: parameters?.relatedEntities || []
        };
        
        // Add to active events
        setActiveEvents(prev => [...prev, newActiveEvent]);
        
        // Create news message
        const newsId = `news_${eventId}_${Date.now()}`;
        const newsMessage = {
            id: newsId,
            title: eventDefinition.defaultEventName,
            content: eventDefinition.defaultEventDescription_Short,
            sourceIcon: `${config.galacticNewsNetwork_UI.icon_EventType_AssetPathPrefix}${getIconNameForEventType(eventDefinition.eventType)}.png`,
            timestamp: Date.now(),
            read: false,
            priority: getEventPriority(eventDefinition.eventType)
        };
        
        setNewsMessages(prev => [...prev, newsMessage]);
        
        // Show notification to player
        toast.info(newsMessage.title, {
            description: newsMessage.content,
            duration: 8000
        });
        
        console.log(`Event triggered: ${eventDefinition.defaultEventName}`);
        return true;
    };
    
    // Helper to determine icon name based on event type
    const getIconNameForEventType = (eventType: string): string => {
        if (eventType.includes('War')) return 'war';
        if (eventType.includes('Economic')) return 'economy';
        if (eventType.includes('Scientific')) return 'discovery';
        if (eventType.includes('NaturalDisaster')) return 'hazard';
        if (eventType.includes('Political')) return 'political';
        if (eventType.includes('Pirate')) return 'pirate';
        return 'general';
    };
    
    // Helper to determine event priority (for sorting news)
    const getEventPriority = (eventType: string): number => {
        if (eventType.includes('War')) return 10;
        if (eventType.includes('NaturalDisaster')) return 8;
        if (eventType.includes('UnknownEntity')) return 9;
        if (eventType.includes('PirateLord')) return 7;
        if (eventType.includes('Political')) return 6;
        return 5; // Default priority
    };

    // Handle player choice for an event
    const handlePlayerChoice = (eventId: string, choiceId: string) => {
        const activeEvent = activeEvents.find(e => e.definition.eventId === eventId);
        if (!activeEvent) {
            console.error(`Cannot find active event ${eventId} for player choice`);
            return;
        }
        
        const choice = activeEvent.definition.playerInteraction_Options?.find(
            o => o.choiceId === choiceId
        );
        
        if (!choice) {
            console.error(`Cannot find choice ${choiceId} for event ${eventId}`);
            return;
        }
        
        // Apply choice impacts
        // This would interact with other game systems in a full implementation
        console.log(`Applied choice ${choiceId} for event ${eventId}`);
        
        // Update active event to record the player's choice
        setActiveEvents(prev => prev.map(e => 
            e.definition.eventId === eventId ? { ...e, playerChoiceMade: choiceId } : e
        ));
        
        // Provide feedback to the player about their choice
        toast.success(`Rozhodnutí přijato: ${choice.defaultChoiceText}`, {
            duration: 5000
        });
    };

    // Mark a news message as read
    const markNewsMessageAsRead = (messageId: string) => {
        setNewsMessages(prev => 
            prev.map(msg => msg.id === messageId ? { ...msg, read: true } : msg)
        );
    };

    // Open the news terminal
    const openNewsTerminal = () => {
        setIsNewsTerminalOpen(true);
    };

    // Close the news terminal
    const closeNewsTerminal = () => {
        setIsNewsTerminalOpen(false);
    };

    const value = {
        activeEvents,
        eventHistory,
        newsMessages,
        triggerEvent,
        handlePlayerChoice,
        markNewsMessageAsRead,
        openNewsTerminal,
        isNewsTerminalOpen,
        closeNewsTerminal,
        config
    };

    return (
        <DynamicEventsContext.Provider value={value}>
            {children}
        </DynamicEventsContext.Provider>
    );
};
