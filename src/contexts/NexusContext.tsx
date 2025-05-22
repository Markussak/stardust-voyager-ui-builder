
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { 
  NexusContextType, 
  NexusFragmentData, 
  NexusFragmentId,
  NexusFragmentAbility,
  PlayerFinalChoice_Nexus,
  NexusStoryPhase
} from '../types/nexus';
import { nexusFragments } from '../data/nexusFragments';
import { useDynamicEvents } from './DynamicEventsContext';

// Default story phases - in a real implementation this would be loaded from JSON
const defaultStoryPhases: NexusStoryPhase[] = [
  {
    phaseId: "Phase1_Discovery",
    phaseNameKey: "story.nexus.phase1.name",
    defaultPhaseName: "Fáze 1: První Ozvěny",
    descriptionKey: "story.nexus.phase1.desc",
    defaultDescription: "Hráč narazí na první neobvyklé signály nebo artefakt, který naznačuje existenci Nexusu. Začíná pátrání po prvním fragmentu.",
    triggerCondition_ToStartPhase: "GameStart_AfterTutorialComplete",
    keyMissions_Ids: ["nexus_quest_01_investigate_signal"],
    keyEvents_Or_Choices: [
      {
        eventId_Or_ChoiceId: "discovery_first_nexus_fragment",
        descriptionKey: "event.nexus.first_fragment_found",
        defaultDescription: "Nalezení prvního fragmentu Nexusu odemyká základní pochopení jeho moci.",
        impact_OnStoryProgression: "Odemkne první schopnost Nexusu a přitáhne pozornost Kultu Nexusu a Solární Konfederace."
      }
    ],
    factionInvolvement_Summary: {
      "CultOfTheNexus": "Kult Nexu projeví okamžitý a intenzivní zájem. Mohou hráče kontaktovat s nabídkou spolupráce nebo s varováním.",
      "SolarConfederacy": "Vědecké oddělení Konfederace zaznamená anomální energetické signatury spojené s fragmentem a zahájí vlastní, opatrné vyšetřování."
    }
  },
  {
    phaseId: "Phase2_FragmentHunt",
    phaseNameKey: "story.nexus.phase2.name",
    defaultPhaseName: "Fáze 2: Honba za Střípky",
    descriptionKey: "story.nexus.phase2.desc",
    defaultDescription: "Hráč aktivně pátrá po dalších fragmentech Nexusu, čelí konkurenci ostatních frakcí, řeší hádanky v prastarých ruinách a odhaluje více o rozmanitých schopnostech fragmentů.",
    triggerCondition_ToStartPhase: "MissionComplete_nexus_quest_01_investigate_signal",
    keyMissions_Ids: ["nexus_quest_02_decode_fragment", "nexus_quest_03_ancient_ruins_alpha", "nexus_quest_04_krall_interference"],
    keyEvents_Or_Choices: [
      {
        eventId_Or_ChoiceId: "choice_share_fragment_data_with_faction_SC",
        descriptionKey: "choice.nexus.share_data_sc",
        defaultDescription: "Hráč má možnost sdílet získaná data o fragmentu Nexusu se Solární Konfederací. To může zlepšit vztahy a získat jejich podporu, ale také zvýšit jejich kontrolu nad výzkumem.",
        impact_OnStoryProgression: "Ovlivní vztahy s Konfederací a Kultem Nexu, může odemknout specifické mise nebo technologické bonusy od Konfederace."
      }
    ],
    factionInvolvement_Summary: {
      "KrallEmpire": "Aktivně se snaží získat fragmenty pro vojenské účely, považují je za mocné zbraně.",
      "FreeTradersSyndicate": "Vidí ve fragmentech a souvisejících technologiích obrovský obchodní potenciál, pokusí se s nimi obchodovat nebo je propašovat.",
      "Guardians_AncientAI": "Mohou se začít nenápadně objevovat, sledovat hráčovy aktivity a aktivity ostatních frakcí."
    }
  }
];

// Create context with default values
const NexusContext = createContext<NexusContextType>({
  discoveredFragments: [],
  currentStoryPhase: null,
  nexusAbilities: [],
  hasDiscoveredFragment: () => false,
  unlockFragment: () => {},
  activateAbility: () => false,
  makeStoryChoice: () => {},
  viewNexusLore: () => {},
  makeFinalChoice: () => {},
  playerChoices: {}
});

export const useNexus = () => {
  const context = useContext(NexusContext);
  if (!context) {
    throw new Error('useNexus must be used within a NexusContextProvider');
  }
  return context;
};

export const NexusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { triggerEvent } = useDynamicEvents();
  const [discoveredFragments, setDiscoveredFragments] = useState<NexusFragmentData[]>([]);
  const [currentStoryPhase, setCurrentStoryPhase] = useState<NexusStoryPhase | null>(defaultStoryPhases[0]);
  const [playerChoices, setPlayerChoices] = useState<Record<string, string>>({});
  
  // Get the available abilities from discovered fragments
  const nexusAbilities = discoveredFragments
    .filter(fragment => fragment.associatedNexusAbility)
    .map(fragment => fragment.associatedNexusAbility as NexusFragmentAbility);

  // Check if player has discovered a specific fragment
  const hasDiscoveredFragment = (fragmentId: NexusFragmentId): boolean => {
    return discoveredFragments.some(f => f.fragmentId === fragmentId);
  };

  // Unlock a fragment
  const unlockFragment = (fragmentId: NexusFragmentId) => {
    if (hasDiscoveredFragment(fragmentId)) {
      return;
    }
    
    const fragmentToAdd = nexusFragments.find(f => f.fragmentId === fragmentId);
    if (!fragmentToAdd) {
      console.error(`Fragment with ID ${fragmentId} not found`);
      return;
    }
    
    // Add to discovered fragments
    setDiscoveredFragments(prev => [...prev, fragmentToAdd]);
    
    // Trigger discovery event
    triggerEvent(`discovery_nexus_fragment_${fragmentId}`);
    
    // Notify the player
    toast.success(`Nový Fragment Nexusu objeven: ${fragmentToAdd.defaultFragmentName}`, {
      description: "Fragment byl přidán do vaší sbírky a jeho schopnosti jsou nyní dostupné.",
      duration: 6000
    });
    
    // Check if we should advance story phase
    if (discoveredFragments.length + 1 >= 4 && currentStoryPhase?.phaseId === "Phase2_FragmentHunt") {
      advanceToNextStoryPhase();
    }
  };

  // Activate an ability
  const activateAbility = (abilityId: string): boolean => {
    const ability = nexusAbilities.find(a => a.abilityId === abilityId);
    if (!ability) {
      console.error(`Ability with ID ${abilityId} not found or not unlocked`);
      return false;
    }
    
    // Here we would check cooldowns, energy costs, etc.
    // For now we just show a notification
    
    toast.info(`Aktivována schopnost Nexusu: ${ability.defaultAbilityName}`, {
      description: ability.defaultDescription,
      duration: 3000
    });
    
    // In a full implementation, this would apply the ability's effects
    console.log(`Activated Nexus ability: ${abilityId}`);
    
    return true;
  };

  // Make a story choice
  const makeStoryChoice = (choiceId: string) => {
    setPlayerChoices(prev => ({ ...prev, [choiceId]: new Date().toISOString() }));
    
    // In a full implementation, this would have consequences
    console.log(`Made story choice: ${choiceId}`);
    
    // Trigger related events
    triggerEvent(`player_choice_${choiceId}`);
  };

  // View lore for a fragment
  const viewNexusLore = (fragmentId: NexusFragmentId | null) => {
    // In a full implementation, this would open the codex to the right entry
    if (fragmentId) {
      const fragment = nexusFragments.find(f => f.fragmentId === fragmentId);
      console.log(`Viewing lore for fragment: ${fragment?.defaultFragmentName}`);
    }
  };

  // Make the final choice
  const makeFinalChoice = (choice: PlayerFinalChoice_Nexus) => {
    setPlayerChoices(prev => ({ ...prev, 'FINAL_NEXUS_CHOICE': choice }));
    
    // In a full implementation, this would lead to one of the endings
    console.log(`Made final choice: ${choice}`);
    
    // Trigger ending event
    triggerEvent(`nexus_ending_${choice}`);
  };

  // Advance to the next story phase
  const advanceToNextStoryPhase = () => {
    if (!currentStoryPhase) return;
    
    const currentIndex = defaultStoryPhases.findIndex(phase => phase.phaseId === currentStoryPhase.phaseId);
    if (currentIndex < 0 || currentIndex >= defaultStoryPhases.length - 1) return;
    
    const nextPhase = defaultStoryPhases[currentIndex + 1];
    setCurrentStoryPhase(nextPhase);
    
    // Notify the player
    toast.info(`Nová fáze příběhu: ${nextPhase.defaultPhaseName}`, {
      description: nextPhase.defaultDescription,
      duration: 6000
    });
    
    // Trigger phase change event
    triggerEvent(`nexus_phase_change_to_${nextPhase.phaseId}`);
  };

  // Context values
  const value = {
    discoveredFragments,
    currentStoryPhase,
    nexusAbilities,
    hasDiscoveredFragment,
    unlockFragment,
    activateAbility,
    makeStoryChoice,
    viewNexusLore,
    makeFinalChoice,
    playerChoices
  };

  return (
    <NexusContext.Provider value={value}>
      {children}
    </NexusContext.Provider>
  );
};
