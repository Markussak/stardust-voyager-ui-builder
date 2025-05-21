
import React, { useState } from 'react';
import { 
  useDiplomacy, 
  DiplomaticStatus 
} from '@/contexts/DiplomacyContext';
import { Button } from '@/components/ui/button';
import { Shield, Swords, GlassWater, HandshakeIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Treaty } from '@/types/diplomacy';
import { DiplomaticActionType } from '@/types/factions';
import { getFactionById } from '@/data/factions';

interface DiplomaticAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: 'available' | 'unavailable' | 'already_active';
  tooltip: string;
  relationChange: number;
  resultingStatus?: DiplomaticStatus;
  treatyType?: string;
  actionType?: DiplomaticActionType;
}

const DiplomaticActionsPanel: React.FC = () => {
  const { diplomacyState, updateRelation, addTreaty } = useDiplomacy();
  const { toast } = useToast();
  const [isExecutingAction, setIsExecutingAction] = useState(false);

  if (!diplomacyState || !diplomacyState.selectedFactionId || !diplomacyState.factions || !diplomacyState.factions[diplomacyState.selectedFactionId]) {
    return (
      <div className="bg-space-dark/70 border border-space-buttons-border rounded-md p-5 flex items-center justify-center h-full">
        <p className="font-pixel text-space-ui-subtext">Vyberte frakci pro zobrazení diplomatických akcí</p>
      </div>
    );
  }

  const faction = diplomacyState.factions[diplomacyState.selectedFactionId];
  const relation = diplomacyState.playerRelations?.[diplomacyState.selectedFactionId];
  const extendedFaction = getFactionById(faction.id as any);

  if (!relation) {
    return (
      <div className="bg-space-dark/70 border border-space-buttons-border rounded-md p-5 flex items-center justify-center h-full">
        <p className="font-pixel text-space-ui-subtext">Vztah s touto frakcí nebyl nalezen</p>
      </div>
    );
  }

  // Generate available diplomatic actions based on current relationship and faction preferences
  const generateActions = (): DiplomaticAction[] => {
    const actions: DiplomaticAction[] = [];
    
    // Make sure treaties exists and is an array before using array methods
    const treaties = relation.treaties || [];
    const hasTradeTreaty = treaties.some(t => t.type === 'trade_agreement');
    const hasNonAggressionPact = treaties.some(t => t.type === 'non_aggression_pact');
    const hasDefensiveAlliance = treaties.some(t => t.type === 'defensive_alliance');

    // Trade Agreement
    actions.push({
      id: 'trade_agreement',
      label: 'Obchodní dohoda',
      icon: <GlassWater className="mr-2" size={18} />,
      status: hasTradeTreaty 
        ? 'already_active' 
        : relation.relationValue >= 30 && relation.status !== DiplomaticStatus.War && relation.status !== DiplomaticStatus.Hostile
          ? 'available' 
          : 'unavailable',
      tooltip: hasTradeTreaty 
        ? 'Obchodní dohoda již existuje' 
        : relation.relationValue < 30 
          ? 'Vyžaduje vztah alespoň +30' 
          : 'Nabídnout obchodní dohodu',
      relationChange: 15,
      resultingStatus: DiplomaticStatus.Friendly_TradeAgreement,
      treatyType: 'trade_agreement',
      actionType: DiplomaticActionType.OfferTradeAgreement
    });

    // Non-Aggression Pact
    actions.push({
      id: 'non_aggression_pact',
      label: 'Pakt o neútočení',
      icon: <Shield className="mr-2" size={18} />,
      status: hasNonAggressionPact 
        ? 'already_active' 
        : relation.relationValue >= 10 && relation.status !== DiplomaticStatus.War
          ? 'available' 
          : 'unavailable',
      tooltip: hasNonAggressionPact 
        ? 'Pakt o neútočení již existuje' 
        : relation.relationValue < 10 
          ? 'Vyžaduje vztah alespoň +10' 
          : 'Nabídnout pakt o neútočení',
      relationChange: 10,
      resultingStatus: DiplomaticStatus.Amity_NonAggressionPact,
      treatyType: 'non_aggression_pact',
      actionType: DiplomaticActionType.OfferNonAggressionPact
    });

    // Defensive Alliance
    actions.push({
      id: 'defensive_alliance',
      label: 'Obranné spojenectví',
      icon: <HandshakeIcon className="mr-2" size={18} />,
      status: hasDefensiveAlliance 
        ? 'already_active' 
        : relation.relationValue >= 60
          ? 'available' 
          : 'unavailable',
      tooltip: hasDefensiveAlliance 
        ? 'Obranné spojenectví již existuje' 
        : relation.relationValue < 60 
          ? 'Vyžaduje vztah alespoň +60' 
          : 'Nabídnout obranné spojenectví',
      relationChange: 20,
      resultingStatus: DiplomaticStatus.Ally_DefensivePact,
      treatyType: 'defensive_alliance',
      actionType: DiplomaticActionType.OfferDefensiveAlliance
    });

    // Declare War (always available except if already at war)
    actions.push({
      id: 'declare_war',
      label: 'Vyhlásit válku',
      icon: <Swords className="mr-2" size={18} />,
      status: relation.status === DiplomaticStatus.War ? 'already_active' : 'available',
      tooltip: relation.status === DiplomaticStatus.War 
        ? 'Už jste ve válce' 
        : 'Vyhlásit válku této frakci',
      relationChange: -100,
      resultingStatus: DiplomaticStatus.War,
      actionType: DiplomaticActionType.DeclareWar
    });

    // If we have extended faction data, check if the action is preferred by this faction
    if (extendedFaction) {
      actions.forEach(action => {
        if (action.actionType && extendedFaction.diplomacyAI.preferredTreatyTypes.includes(action.actionType)) {
          // This faction prefers this type of treaty, so it might be easier to get them to agree
          const improvedTooltip = `${action.tooltip} (Tato frakce preferuje tento typ dohody)`;
          action.tooltip = improvedTooltip;
        }
      });
    }

    return actions;
  };

  const actions = generateActions();

  const handleAction = (action: DiplomaticAction) => {
    if (action.status !== 'available' || !diplomacyState?.selectedFactionId) return;
    
    setIsExecutingAction(true);
    
    // Get response likelihood based on faction characteristics
    let responseDelay = 1000;
    let successProbability = 0.8; // Default 80% chance of success
    
    if (extendedFaction) {
      // Adjust probability based on faction's ethos and action
      if (action.id === 'trade_agreement') {
        // Trade-oriented factions are more likely to accept trade agreements
        if (extendedFaction.diplomacyAI.baseEthos === 'Xenophilic_Trader') {
          successProbability = 0.9;
        } else if (extendedFaction.diplomacyAI.baseEthos === 'Xenophobic_Isolationist') {
          successProbability = 0.5;
        }
      } else if (action.id === 'defensive_alliance') {
        // Militaristic factions value alliances more
        if (extendedFaction.diplomacyAI.baseEthos === 'Militaristic_Expansionist') {
          successProbability = 0.85;
        }
      }
      
      // Factor in faction generosity
      successProbability *= (0.5 + extendedFaction.diplomacyAI.tradeOffer_GenerosityFactor);
      
      // If the action is preferred by the faction, increase probability
      if (action.actionType && extendedFaction.diplomacyAI.preferredTreatyTypes.includes(action.actionType)) {
        successProbability += 0.1;
      }
      
      // Limit between 0.1 and 0.95
      successProbability = Math.min(Math.max(successProbability, 0.1), 0.95);
      
      // Adjust response delay based on relationship profile
      if (extendedFaction.diplomacyAI.reactionToPlayerActions_Profile === 'Unpredictable') {
        responseDelay = Math.random() * 2000 + 500; // Random delay between 500-2500ms
      }
    }
    
    // Simulate AI response with the calculated probability
    setTimeout(() => {
      const success = Math.random() < successProbability;
      
      if (success) {
        // Update relation status
        if (action.resultingStatus) {
          updateRelation(diplomacyState.selectedFactionId!, action.resultingStatus, action.relationChange);
        }
        
        // Add treaty if applicable
        if (action.treatyType) {
          const newTreaty: Treaty = {
            id: `${action.treatyType}_${Date.now()}`,
            type: action.treatyType,
            name: action.label,
            description: action.tooltip,
            startDate: Date.now(),
            effects: []
          };
          
          addTreaty(diplomacyState.selectedFactionId!, newTreaty);
        }
        
        toast({
          title: "Diplomatická akce úspěšná",
          description: `${action.label} s frakcí ${faction.name} byla úspěšná.`,
        });
      } else {
        // The diplomatic action was rejected
        toast({
          title: "Diplomatická akce odmítnuta",
          description: `Frakce ${faction.name} odmítla vaši nabídku na ${action.label.toLowerCase()}.`,
          variant: "destructive"
        });
        
        // Small negative relation impact from rejection
        if (action.id !== 'declare_war') { // War declaration doesn't get rejected
          updateRelation(diplomacyState.selectedFactionId!, relation.status, -5);
        }
      }
      
      setIsExecutingAction(false);
    }, responseDelay);
  };

  return (
    <div className="bg-space-dark/70 border border-space-buttons-border rounded-md p-5">
      <h2 className="font-pixel text-space-ui-text text-lg mb-4">Diplomatické Možnosti</h2>
      
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Button 
            key={action.id}
            variant={action.id === 'declare_war' ? 'destructive' : 'outline'}
            disabled={action.status !== 'available' || isExecutingAction}
            onClick={() => handleAction(action)}
            className={`
              justify-start border-space-buttons-border text-space-ui-text
              ${action.status === 'already_active' ? 'bg-space-buttons/30' : ''}
            `}
            title={action.tooltip}
          >
            {action.icon}
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {action.label}
            </span>
          </Button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-space-dark/50 rounded">
        <h3 className="font-pixel text-space-ui-text text-sm mb-2">Diplomatický status</h3>
        <p className="text-sm text-space-ui-subtext mb-1">
          {relation.status === DiplomaticStatus.War && "Ve válce - Nepřátelské jednotky na vás budou útočit na místě"}
          {relation.status === DiplomaticStatus.Hostile && "Nepřátelské - Tato frakce vás považuje za hrozbu"}
          {relation.status === DiplomaticStatus.Neutral && "Neutrální - Tato frakce vás toleruje"}
          {relation.status === DiplomaticStatus.Amity_NonAggressionPact && "Přátelské - Uzavřeli jste pakt o neútočení"}
          {relation.status === DiplomaticStatus.Friendly_TradeAgreement && "Přátelské - Máte obchodní dohodu"}
          {relation.status === DiplomaticStatus.Ally_DefensivePact && "Spojenecké - Máte vzájemnou obrannou dohodu"}
        </p>
      </div>
      
      {/* Display faction preferences if available */}
      {extendedFaction && (
        <div className="mt-4 p-3 bg-space-dark/50 rounded">
          <h3 className="font-pixel text-space-ui-text text-sm mb-2">Diplomatický profil</h3>
          <p className="text-sm text-space-ui-subtext">
            {extendedFaction.diplomacyAI.reactionToPlayerActions_Profile === 'Forgiving' && "Tato frakce je ochotná odpouštět menší přestupky."}
            {extendedFaction.diplomacyAI.reactionToPlayerActions_Profile === 'Neutral' && "Tato frakce reaguje na vaše akce standardním způsobem."}
            {extendedFaction.diplomacyAI.reactionToPlayerActions_Profile === 'Unforgiving' && "Tato frakce si pamatuje vaše přestupky a jen těžko odpouští."}
            {extendedFaction.diplomacyAI.reactionToPlayerActions_Profile === 'Opportunistic' && "Tato frakce jedná pouze tehdy, když z toho má prospěch."}
            {extendedFaction.diplomacyAI.reactionToPlayerActions_Profile === 'Unpredictable' && "Reakce této frakce jsou těžko předvídatelné."}
          </p>
        </div>
      )}
    </div>
  );
};

export default DiplomaticActionsPanel;
