
export interface Vector2D {
  x: number;
  y: number;
}

export enum ResearchNodeState {
  Locked_PrerequisitesNotMet = "Locked_PrerequisitesNotMet",
  Locked_ResourcesNotAvailable = "Locked_ResourcesNotAvailable",
  AvailableToResearch = "AvailableToResearch",
  CurrentlyResearching = "CurrentlyResearching",
  Researched = "Researched"
}

export interface ResearchCost {
  resourceId: 'ResearchPoints_General' | 'ResearchPoints_Propulsion' | 'Credits' | string;
  quantity: number;
  iconAsset?: string;
}

export interface TechnologyUnlock {
  type: 'NewBlueprint_ShipModule' | 'NewBlueprint_Ship' | 'NewBlueprint_Consumable' |
        'StatUpgrade_Global' | 'StatUpgrade_ShipClass' | 'StatUpgrade_WeaponType' |
        'NewAbility_Player' | 'NewAbility_Ship' | 'NewGameplayMechanic' | 'NewResearchCategory';
  targetId?: string;
  blueprintId?: string;
  statModification?: {
    statKey: string;
    changeAbsolute?: number;
    changePercent?: number;
    descriptionKey: string;
    defaultDescription: string;
  };
  descriptionKey: string;
  defaultDescription: string;
  iconAsset?: string;
}

export interface ResearchTechnologyDefinition {
  techId: string;
  techNameKey: string;
  defaultTechName: string;
  techDescriptionKey: string;
  defaultTechDescription: string;
  iconAsset: string;
  categoryKey: string;
  tier: number;
  researchCosts: ResearchCost[];
  researchTime_Units?: number;
  prerequisites_TechIds: string[];
  unlocks: TechnologyUnlock[];
  nodePosition_InTree: Vector2D;
  isKeyTechnology?: boolean;
  isRepeatable?: boolean;
  maxRepeatLevel?: number;
  loreLink_CodexKey?: string;
}

export interface ResearchCategoryDefinition {
  categoryKey: string;
  displayNameKey: string;
  defaultDisplayName: string;
  iconAsset: string;
  descriptionKey?: string;
  defaultDescription?: string;
  colorTheme?: string;
  unlockCondition_TechId?: string;
}

export interface ResearchPointDefinition {
  id: string;
  displayNameKey: string;
  defaultDisplayName: string;
  iconAsset: string;
  currentValue: number;
  generationInfoKey?: string;
  defaultGenerationInfo?: string;
}

export interface ResearchState {
  availableTechnologies: string[];
  researchedTechnologies: string[];
  currentlyResearching?: {
    techId: string;
    progressPercent: number;
    timeRemaining_Units?: number;
  };
  researchQueue: string[];
  researchPoints: Record<string, number>;
  selectedTechId?: string;
  visibleCategories: string[];
  activeCategoryFilter?: string;
  viewPosition: Vector2D;
  zoomLevel: number;
}
