
import React, { useState } from 'react';
import { 
  useDiplomacy, 
  FactionId, 
  DiplomaticStatus 
} from '@/contexts/DiplomacyContext';
import { Button } from '@/components/ui/button';
import { Shield, Swords, GlassWater, HandshakeIcon, Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiplomaticAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: 'available' | 'unavailable' | 'already_active';
  tooltip: string;
  relationChange: number;
  resultingStatus?: DiplomaticStatus;
  treatyType?: string;
}

const DiplomaticActionsPanel: React.FC = () => {
  const { diplomacyState, updateRelation, addTreaty } = useDiplomacy();
  const { toast } = useToast();
  const { selectedFactionId, factions, playerRelations } = diplomacyState;
  const [isExecutingAction, setIsExecutingAction] = useState(false);

  if (!selectedFactionId || !factions[selectedFactionId]) {
    return (
      <div className="bg-space-dark/70 border border-space-buttons-border rounded-md p-5 flex items-center justify-center h-full">
        <p className="font-pixel text-space-ui-subtext">Vyberte frakci pro zobrazení diplomatických akcí</p>
      </div>
    );
  }

  const faction = factions[selectedFactionId];
  const relation = playerRelations[selectedFactionId];

  // Generate available diplomatic actions based on current relationship
  const generateActions = (): DiplomaticAction[] => {
    const actions: DiplomaticAction[] = [];
    const hasTradeTreaty = relation.treaties.some(t => t.type === 'trade_agreement');
    const hasNonAggressionPact = relation.treaties.some(t => t.type === 'non_aggression_pact');
    const hasDefensiveAlliance = relation.treaties.some(t => t.type === 'defensive_alliance');

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
      treatyType: 'trade_agreement'
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
      treatyType: 'non_aggression_pact'
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
      treatyType: 'defensive_alliance'
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
      resultingStatus: DiplomaticStatus.War
    });

    return actions;
  };

  const actions = generateActions();

  const handleAction = (action: DiplomaticAction) => {
    if (action.status !== 'available' || !selectedFactionId) return;
    
    setIsExecutingAction(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      // Update relation status
      if (action.resultingStatus) {
        updateRelation(selectedFactionId, action.resultingStatus, action.relationChange);
      }
      
      // Add treaty if applicable
      if (action.treatyType) {
        addTreaty(selectedFactionId, {
          type: action.treatyType,
          startTurn: 1, // Current turn
          duration: -1, // Indefinite
          iconAsset: '/placeholder.svg'
        });
      }
      
      toast({
        title: "Diplomatická akce",
        description: `${action.label} s frakcí ${faction.name} byla úspěšná.`,
      });
      
      setIsExecutingAction(false);
    }, 1000);
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
    </div>
  );
};

export default DiplomaticActionsPanel;
