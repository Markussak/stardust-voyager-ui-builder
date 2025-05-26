// src/types/gameplay_mechanics_extended.ts

// --- From Prompt 40, Section 0 (New or extended types for Gameplay Mechanics) ---

// Assuming DiplomaticActionType might be a base string enum or type from a previous prompt (e.g. diplomacy.ts)
// For now, we define DiplomaticAction_Advanced directly. If a base exists, it should extend it.
export enum DiplomaticAction_Advanced {
    // Existing basic actions would be here or in a base enum
    OfferTradeAgreement = "OfferTradeAgreement", // Example existing
    DeclareWar = "DeclareWar", // Example existing

    // New actions from Prompt 40
    FormFederation_Request = "FormFederation_Request",
    JoinFederation_Request = "JoinFederation_Request",
    LeaveFederation = "LeaveFederation",
    ProposeFederationLaw = "ProposeFederationLaw",
    VoteOnFederationLaw = "VoteOnFederationLaw",
    Espionage_InfiltrateFaction = "Espionage_InfiltrateFaction",
    Espionage_StealTechnology = "Espionage_StealTechnology",
    Espionage_SabotageStation = "Espionage_SabotageStation",
    Espionage_GatherIntel = "Espionage_GatherIntel",
    OfferMilitarySupport_InWar = "OfferMilitarySupport_InWar",
    RequestMilitarySupport_InWar = "RequestMilitarySupport_InWar",
    IssueUltimatum = "IssueUltimatum",
    MediatePeace_BetweenFactions = "MediatePeace_BetweenFactions"
}

export interface ShipEditor_AdvancedFeature {
    featureId: string; // e.g., "AdvancedComponentTuning", "CustomPaintJob_PixelEditor"
    featureNameKey_cz: string;
    defaultFeatureName_cz: string;
    description_cz: string;
    // Add specific properties if a feature has unique data, e.g.:
    // tuningCostFactor?: number; for "AdvancedComponentTuning"
    // editorUIType?: 'SimpleColorPicker' | 'FullPixelEditor'; for "CustomPaintJob_PixelEditor"
}

export interface TradeSystem_AdvancedFeature {
    featureId: string; // e.g., "Smuggling_System", "FactionSpecific_TradeContracts"
    featureNameKey_cz: string;
    defaultFeatureName_cz: string;
    description_cz: string;
    // Add specific properties, e.g.:
    // contrabandList_Path?: string; for "Smuggling_System"
    // requiredReputationLevel?: number; for "FactionSpecific_TradeContracts"
}

export interface ResearchSystem_AdvancedFeature {
    featureId: string; // e.g., "ReverseEngineering_AlienTech", "Breakthrough_Technologies_Rare"
    featureNameKey_cz: string;
    defaultFeatureName_cz: string;
    description_cz: string;
    // Add specific properties, e.g.:
    // successChanceFactor?: number; for "ReverseEngineering_AlienTech"
    // techPool_Path_Breakthroughs?: string; for "Breakthrough_Technologies_Rare"
}
