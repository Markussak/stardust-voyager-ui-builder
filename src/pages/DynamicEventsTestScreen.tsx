
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpaceBackground from '@/components/game/SpaceBackground';
import { useDynamicEvents } from '@/contexts/DynamicEventsContext';
import { useProceduralLore } from '@/contexts/ProceduralLoreContext';
import { NewsTickerHUD, NewsTerminal } from '@/components/events/GalacticNewsNetwork';
import EventInteractionDialog from '@/components/events/EventInteractionDialog';
import { ActiveDynamicEvent } from '@/types/events';
import { toast } from 'sonner';

const DynamicEventsTestScreen: React.FC = () => {
    const navigate = useNavigate();
    const { triggerEvent, activeEvents } = useDynamicEvents();
    const { generateLoreForContext, generatedLoreFragments } = useProceduralLore();
    const [selectedEvent, setSelectedEvent] = useState<ActiveDynamicEvent | null>(null);
    
    const handleTriggerEvent = (eventId: string) => {
        const success = triggerEvent(eventId);
        if (success) {
            toast.success(`Událost spuštěna: ${eventId}`);
        } else {
            toast.error(`Událost nelze spustit: ${eventId}`);
        }
    };
    
    const handleGenerateLore = (triggerType: string) => {
        // Create some mock context data for testing
        const contextData = {
            entityId: `planet_${Math.floor(Math.random() * 1000)}`,
            name: "Proxima IV",
            type: "Terrestrial",
            dominant_species: "Neznámé bytosti",
            knownFactions: [
                { name: "Solární Konfederace", type: "Demokratická" },
                { name: "Krallské Impérium", type: "Autoritářská" }
            ]
        };
        
        const fragment = generateLoreForContext(triggerType, contextData);
        if (fragment) {
            toast.success(`Nový fragment lore byl vygenerován: ${fragment.title}`);
        } else {
            toast.error(`Nelze vygenerovat lore pro typ: ${triggerType}`);
        }
    };
    
    return (
        <div className="h-screen w-screen overflow-hidden bg-space-dark relative">
            {/* Background */}
            <SpaceBackground />
            
            {/* Close button */}
            <Button 
                variant="outline" 
                className="absolute top-4 right-4 z-30 border-space-buttons-border bg-space-dark/80"
                onClick={() => navigate(-1)}
            >
                <X size={20} />
            </Button>
            
            {/* Overlay with title */}
            <div className="absolute inset-0 bg-gradient-to-b from-space-dark/80 to-transparent z-10 pointer-events-none">
                <h1 className="font-pixel text-3xl text-space-ui-text text-center mt-8">TESTOVÁNÍ DYNAMICKÝCH UDÁLOSTÍ</h1>
            </div>
            
            {/* Main content */}
            <div className="relative z-20 w-11/12 h-[85%] mx-auto mt-20 grid grid-cols-12 gap-4">
                <div className="col-span-6 bg-space-dark/70 border border-space-buttons-border rounded p-4">
                    <h2 className="font-pixel text-xl text-space-ui-text mb-4">Generování Událostí</h2>
                    
                    <div className="space-y-2 mb-6">
                        <Button 
                            variant="outline" 
                            className="w-full border-blue-900"
                            onClick={() => handleTriggerEvent('economic_boom_alpha_sector')}
                        >
                            Spustit Ekonomický Boom (Alfa Sektor)
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            className="w-full border-red-900"
                            onClick={() => handleTriggerEvent('war_solcon_krall_start')}
                        >
                            Spustit Válku (SolKon vs. Krall)
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            className="w-full border-purple-900"
                            onClick={() => handleTriggerEvent('cosmic_storm_beta_sector')}
                        >
                            Spustit Kosmickou Bouři (Beta Sektor)
                        </Button>
                    </div>
                    
                    <h3 className="font-pixel text-space-ui-text mb-2">Aktivní Události:</h3>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                        {activeEvents.length === 0 ? (
                            <p className="text-space-ui-subtext text-sm italic">Žádné aktivní události</p>
                        ) : (
                            activeEvents.map(event => (
                                <div 
                                    key={event.definition.eventId}
                                    className="p-2 border border-space-buttons-border rounded-sm text-sm cursor-pointer hover:bg-space-buttons/20 transition-colors"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <div className="font-pixel">{event.definition.defaultEventName}</div>
                                    <div className="text-xs text-space-ui-subtext">
                                        Start: {event.startTimestamp} | Typ: {event.definition.eventType}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                
                <div className="col-span-6 bg-space-dark/70 border border-space-buttons-border rounded p-4">
                    <h2 className="font-pixel text-xl text-space-ui-text mb-4">Generování Lore</h2>
                    
                    <div className="space-y-2 mb-6">
                        <Button 
                            variant="outline" 
                            className="w-full border-green-900"
                            onClick={() => handleGenerateLore('AnomalyDiscovery')}
                        >
                            Generovat Lore: Objev Anomálie
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            className="w-full border-yellow-900"
                            onClick={() => handleGenerateLore('DerelictExplored_DataCoreFound')}
                        >
                            Generovat Lore: Nalezen Datajádro Opuštěné Lodi
                        </Button>
                    </div>
                    
                    <h3 className="font-pixel text-space-ui-text mb-2">Vygenerované Fragmenty:</h3>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                        {generatedLoreFragments.length === 0 ? (
                            <p className="text-space-ui-subtext text-sm italic">Žádné fragmenty lore</p>
                        ) : (
                            generatedLoreFragments.map(fragment => (
                                <div 
                                    key={fragment.id}
                                    className={`p-2 border rounded-sm text-sm ${fragment.isRead ? 'border-space-border text-space-ui-subtext' : 'border-yellow-900 text-space-ui-text'}`}
                                >
                                    <div className="font-pixel">{fragment.title}</div>
                                    <div className="text-xs text-space-ui-subtext">
                                        Typ: {fragment.subjectType}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            
            {/* NewsTickerHUD for displaying news */}
            <NewsTickerHUD />
            
            {/* NewsTerminal dialog (shown when opened) */}
            <NewsTerminal />
            
            {/* Event interaction dialog */}
            {selectedEvent && (
                <EventInteractionDialog 
                    event={selectedEvent} 
                    onClose={() => setSelectedEvent(null)} 
                />
            )}
        </div>
    );
};

export default DynamicEventsTestScreen;
