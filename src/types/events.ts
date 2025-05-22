
import { FactionId } from './diplomacy';
import { Vector2D } from './game';

// Dynamic Event Trigger Types
export enum DynamicEventTriggerType {
    TimeElapsed_Random = "TimeElapsed_Random", // Náhodně po uplynutí času
    TimeElapsed_Cyclical = "TimeElapsed_Cyclical", // Pravidelné události (např. volby)
    PlayerAction_Major = "PlayerAction_Major", // Významná akce hráče (zničení stanice, objev)
    PlayerAction_ReputationChange = "PlayerAction_ReputationChange", // Změna reputace s frakcí
    FactionAction_WarDeclaration = "FactionAction_WarDeclaration", // Akce AI frakce
    FactionAction_EconomicShift = "FactionAction_EconomicShift",
    AnomalyDiscovery = "AnomalyDiscovery",
    ResourceDepletion_System = "ResourceDepletion_System", // Vyčerpání zdrojů v systému
    NexusFragment_Interaction = "NexusFragment_Interaction" // Interakce s fragmentem Nexu
}

// Dynamic Event Types
export enum DynamicEventType {
    GalacticWar_Start = "GalacticWar_Start", // Začátek galaktické války
    GalacticWar_BattleOutcome = "GalacticWar_BattleOutcome", // Výsledek bitvy
    GalacticWar_TreatySigned = "GalacticWar_TreatySigned", // Mírová smlouva/příměří
    Economic_Boom_Sector = "Economic_Boom_Sector", // Ekonomický rozmach v sektoru
    Economic_Recession_Faction = "Economic_Recession_Faction", // Recese frakce
    Economic_ResourceDiscovery_RichVein = "Economic_ResourceDiscovery_RichVein", // Objev bohatého ložiska
    Economic_TradeRoute_Established = "Economic_TradeRoute_Established", // Vznik obchodní trasy
    Economic_TradeRoute_Disrupted = "Economic_TradeRoute_Disrupted", // Přerušení obchodní trasy
    Scientific_Breakthrough_Faction = "Scientific_Breakthrough_Faction", // Vědecký průlom frakce
    Scientific_AncientTech_Found = "Scientific_AncientTech_Found", // Nález prastaré technologie
    Scientific_LabAccident_Hazard = "Scientific_LabAccident_Hazard", // Nehoda v laboratoři
    NaturalDisaster_Supernova_Distant = "NaturalDisaster_Supernova_Distant", // Výbuch vzdálené supernovy
    NaturalDisaster_AsteroidSwarm_ImpactRisk = "NaturalDisaster_AsteroidSwarm_ImpactRisk", // Roj asteroidů s rizikem dopadu
    NaturalDisaster_CosmicStorm_NavigationHazard = "NaturalDisaster_CosmicStorm_NavigationHazard", // Kosmická bouře
    Political_FactionLeader_Change = "Political_FactionLeader_Change", // Změna vůdce frakce
    Political_Faction_Split_NewFaction = "Political_Faction_Split_NewFaction", // Rozdělení frakce, vznik nové
    Political_Alliance_Formed_Or_Broken = "Political_Alliance_Formed_Or_Broken", // Vznik/zánik aliance
    PirateActivity_Increased_Sector = "PirateActivity_Increased_Sector", // Zvýšená aktivita pirátů v sektoru
    PirateLord_Emergence = "PirateLord_Emergence", // Objevení mocného pirátského vůdce
    UnknownEntity_Attack_System = "UnknownEntity_Attack_System", // Útok neznámých entit
    RefugeeFleet_Arrival = "RefugeeFleet_Arrival" // Přílet uprchlické flotily
}

// Event Effect Types
export type EventEffectType = 
    'ReputationChange' | 
    'EconomicShift_ResourcePrice' | 
    'SpawnUnits_Hostile' | 
    'SpawnUnits_Friendly' | 
    'ChangeSystemSecurityLevel' | 
    'InitiateWar_BetweenFactions' | 
    'OfferQuestToPlayer' | 
    'UnlockTechnology_ForFaction' | 
    'DamageStationOrFleet' | 
    'CreatePlanetaryAnomaly' | 
    'ModifyTradeRoute_Availability';

// Event Target Types
export type EventTargetType = 'Player' | 'Faction' | 'System' | 'Sector' | 'Global_Economy' | 'SpecificResource';

// Dynamic Event Impact
export interface EventImpact {
    target: EventTargetType;
    targetId?: string; // ID frakce, systému, suroviny atd.
    effectType: EventEffectType;
    parameters: any; // např. { factionId: "SolarConfederacy", changeAmount: -20 }, { resourceId: "IronOre", priceMultiplierChange: 0.3 }
    duration_TemporaryEffect_GameTurns?: number; // Doba trvání dočasného efektu
    descriptionKey_Impact?: string; 
    defaultDescription_Impact?: string; // Popis dopadu v ČEŠTINĚ
}

// Player Choice for Dynamic Event
export interface EventPlayerChoice {
    choiceId: string;
    choiceTextKey: string; 
    defaultChoiceText: string; // Volba v ČEŠTINĚ
    action_Effect_Impacts: EventImpact[]; // Jaké dopady má tato hráčova volba
    requiredPlayerSkill_Or_Item_Or_Reputation?: any; // např. { skillId: "Communications_Diplomacy", level: 3 }
    soundEffect_OnChoice?: string;
}

// Dynamic Event Definition
export interface DynamicEventDefinition {
    eventId: string; // Unikátní ID události (např. "war_confederacy_vs_krall_start")
    eventType: DynamicEventType;
    eventNameKey: string; 
    defaultEventName: string; // Název události v ČEŠTINĚ (pro GNN)
    eventDescriptionKey_Short: string; 
    defaultEventDescription_Short: string; // Krátký popis pro GNN v ČEŠTINĚ
    eventDescriptionKey_Detailed_Codex?: string; 
    defaultEventDescription_Detailed_Codex?: string; // Delší popis pro Knižnici v ČEŠTINĚ
    triggerConditions: Array<{
        type: DynamicEventTriggerType;
        parameters?: any; // např. { factionId: "KrallEmpire", timeElapsedMin_Days: 100, reputationThreshold_Below: -50 }
        probabilityFactor?: number; // 0-1, ovlivňuje šanci na spuštění, pokud je více podmínek
    }>;
    duration_GameTurns_Or_SpecificCondition?: number | string; // Jak dlouho událost trvá nebo podmínka ukončení
    impacts: EventImpact[];
    playerInteraction_Options?: EventPlayerChoice[];
    visualCue_GalaxyMap_IconAsset?: string; // Ikona události na galaktické mapě
    visualCue_SystemMap_Effect_AssetPath?: string; // Vizuální efekt v zasaženém systému
    soundEffect_Notification_MajorEvent: string; // Zvuk pro oznámení velké události
    associatedMission_Id_Template?: string; // Šablona ID mise, která se může spustit touto událostí
    codexEntry_ToUnlock_Id?: string; // Záznam v Knižnici, který se odemkne
    isUnique_OneTimeEvent?: boolean; // Zda se událost může stát jen jednou za hru
    isChainEvent_NextEventId?: string; // ID navazující události
    weight_ForRandomSelection?: number; // Váha pro náhodný výběr, pokud je více možných událostí
}

// Active Event in the game world
export interface ActiveDynamicEvent {
    definition: DynamicEventDefinition;
    startTimestamp: number; // Game time when event started
    endTimestamp?: number; // Game time when event will end (if duration-based)
    impactsApplied: boolean; // Whether the impacts have been applied
    impactsReverted: boolean; // Whether temporary impacts have been reverted
    playerChoiceMade?: string; // ID of choice player made (if any)
    relatedEntities?: string[]; // IDs of related entities (systems, factions, etc.)
    affectedSectors?: string[]; // IDs of affected sectors
}

// Dynamic Events System Configuration
export interface DynamicEventSystemConfig {
    id: string;
    eventCheckFrequency_GameTurns: number;
    maxActiveGlobalEvents: number;
    maxActiveLocalEvents_PerSystem: number;
    eventDatabase_Path: string;
    galacticNewsNetwork_UI: {
        displayLocation: string;
        hudTicker_Enabled: boolean;
        hudTicker_MaxMessages: number;
        hudTicker_ScrollSpeed: number;
        newsTerminal_Style: any;
        messageStyle: {
            fontFamily: string;
            fontSizePx: number;
            color_Headline: string;
            color_Body: string;
            color_FactionSource_Template: string;
            icon_EventType_AssetPathPrefix: string;
        };
        soundEffect_NewMessage: string;
    };
    playerNotification_ForDirectImpactEvents: {
        enabled: boolean;
        notificationType: string;
    };
}

// Procedural Lore Types
export enum LoreSubjectType {
    Faction_Minor_HistoryDetail = "Faction_Minor_HistoryDetail", // Detail z historie menší frakce
    Planet_UniqueFeature_Myth = "Planet_UniqueFeature_Myth", // Mýtus o unikátním rysu planety
    StarSystem_ExplorationLog = "StarSystem_ExplorationLog", // Záznam z průzkumného deníku o systému
    Anomaly_ScientificReport_Fragment = "Anomaly_ScientificReport_Fragment", // Fragment vědecké zprávy o anomálii
    Nexus_Whispers_CultBelief = "Nexus_Whispers_CultBelief", // Šepoty o Nexusu, víra kultistů
    DerelictShip_PersonalLog_FinalEntry = "DerelictShip_PersonalLog_FinalEntry", // Poslední záznam z osobního deníku na vraku
    AncientCivilization_ArchitecturalStyle = "AncientCivilization_ArchitecturalStyle" // Popis architektonického stylu prastaré civilizace
}

// Lore Placeholder Definition
export interface LorePlaceholder {
    key: string; // např. "{systemName}", "{factionAdjective}", "{discoveredArtifact}"
    sourceType: 'Context_CurrentSystem' | 'Context_CurrentPlanet' | 'Context_RandomKnownFaction' | 'Context_SpecificItem' | 'Random_FromList';
    sourceDataKey?: string; // např. "name", "primaryEthos.adjective_cz"
    randomList_Key?: string; // Klíč k seznamu náhodných slov/frází (např. "adjectives_mysterious_cz")
}

// Lore Template Definition
export interface LoreTemplate {
    templateId: string; // Unikátní ID šablony
    subjectType: LoreSubjectType;
    textStructure_KeyElements_cz: string[]; // Klíčové části textu v ČEŠTINĚ
    // Šablony textu s placeholdery, které se vyplní. Všechny texty v ČEŠTINĚ.
    textParagraphTemplates_cz: Array<{
        paragraphKey: string; // např. "introduction_ancient_ruins"
        variants: string[]; // Pole textových šablon pro tento odstavec
    }>;
    placeholders: LorePlaceholder[]; // Definice placeholderů použitých v šablonách
    unlockCondition_CodexEntry_Trigger: DynamicEventTriggerType | 'SpecificCodexEntryViewed'; // Kdy se tento lore fragment může generovat
    unlockCondition_Parameters?: any;
    visualStyle_InCodex?: 'AncientTablet_StoneTexture' | 'DataLog_DigitalScreen' | 'HandwrittenNote_Scratched';
    associatedIllustration_Tag?: string; // Tag pro výběr vhodné ilustrace z poolu
}

// Generated Lore Fragment
export interface GeneratedLoreFragment {
    id: string;
    templateId: string;
    subjectType: LoreSubjectType;
    title: string;
    content: string[];
    generationTimestamp: number;
    relatedEntityId?: string; // ID související entity (planeta, systém, artefakt...)
    isRead: boolean;
    visualStyle?: string;
    illustrationUrl?: string;
}

// Procedural Lore Generation System Configuration
export interface ProceduralLoreGenerationConfig {
    id: string;
    generationTrigger_Events: string[];
    loreTemplateDatabase_Path: string;
    maxLoreFragments_PerSubjectType_InCodex_PerPlaythrough: number;
    integration_With_CodexScreen_Id: string;
    soundEffect_NewLoreFragment_Discovered: string;
    randomWordLists_ForPlaceholders_Path: string;
}

// Context type for Events System
export interface DynamicEventsContextType {
    activeEvents: ActiveDynamicEvent[];
    eventHistory: ActiveDynamicEvent[];
    newsMessages: {
        id: string;
        title: string;
        content: string;
        sourceIcon?: string;
        timestamp: number;
        read: boolean;
        priority: number;
    }[];
    triggerEvent: (eventId: string, parameters?: any) => boolean;
    handlePlayerChoice: (eventId: string, choiceId: string) => void;
    markNewsMessageAsRead: (messageId: string) => void;
    openNewsTerminal: () => void;
    isNewsTerminalOpen: boolean;
    closeNewsTerminal: () => void;
    config: DynamicEventSystemConfig;
}

// Context type for Procedural Lore System
export interface ProceduralLoreContextType {
    generatedLoreFragments: GeneratedLoreFragment[];
    recentlyGeneratedLoreIds: string[];
    generateLoreForContext: (triggerEvent: string, contextData: any) => GeneratedLoreFragment | null;
    markLoreFragmentAsRead: (fragmentId: string) => void;
    config: ProceduralLoreGenerationConfig;
}
