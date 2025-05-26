// src/types/mechanics_visuals_p45.ts

import { Vector2D, AnimationParams, ColorPalette } from './visuals_core'; // Adjust path as needed

// --- From Prompt 45, Section 0 ---

// Base ItemIconDefinition (as potentially defined in newGameSetup.ts or visuals_core.ts)
// Redefining here for clarity if not centrally located and imported.
export interface ItemIconDefinition {
    iconAsset: string; // Path to the icon asset
    size?: Vector2D; // Optional display size for the icon
    tooltipTitleKey_cz?: string;
    defaultTooltipTitle_cz?: string;
    tooltipDescriptionKey_cz?: string;
    defaultTooltipDescription_cz?: string;
}

export interface VisualModuleRepresentation { // For ship editor
    moduleId: string;
    baseSprite_AssetPath: string; // "assets/images/ship_modules/{moduleId}/sprite_topdown.png"
    dimensionsPx_InEditor: Vector2D;
    attachmentPoints_Visual?: Vector2D[];
    activeState_Animation?: AnimationParams;
    damagedState_Sprite_OverlayAsset?: string;
    factionOrRace_Style_Variant_AssetPath_Template?: string; // "assets/images/ship_modules/{moduleId}/style_{raceId}_{variant}.png"
}

export interface ResearchNode_EnhancedVisuals { // For research tree
    techId: string; // Should match ResearchTechnologyDefinition.id
    backgroundAsset_ByCategory_And_Tier?: string; // Pozadí uzlu dle kategorie a úrovně
    icon_Detailed_AssetPath: string; // Detailnější ikona technologie (např. 64x64px)
    connectionLine_Style_Advanced?: {
        type: 'EnergyFlow_Animated' | 'DataStream_Pulsating' | 'Solid_TechPipe' | string;
        color_ByState: Record<'unlocked' | 'available' | 'unavailable' | string, string>; // Barva dle stavu
        animation?: AnimationParams;
    };
    unlockPreview_Visual_Popup?: { // Malý náhled, co technologie odemkne
        assetType: 'ShipClassIcon' | 'ModuleIcon' | 'AbilityIcon' | string;
        assetKey: string; // ID of the ship class, module, or ability
    };
}

export interface TradeGood_VisualDetail extends ItemIconDefinition { // For trade and inventory
    // Inherits iconAsset, size, tooltip keys from ItemIconDefinition
    worldSprite_IfDroppable_AssetPath?: string; // Sprite předmětu, pokud ho lze vyhodit do vesmíru
    description_FlavorText_cz: string; // Krátký popis pro atmosféru
    typicalOrigin_RacesOrFactions_cz?: string[]; // Kdo to typicky vyrábí/prodává
    commonUses_cz?: string[]; // K čemu se to typicky používá
    // This would be linked to a BaseItemData or TradeableItemData for other stats like value, weight etc.
}

export interface InventorySlot_Enhanced { // For inventory screen
    slotId: string; // e.g., "cargo_01", "module_weapon_01"
    gridPosition: Vector2D; // Pozice v mřížce inventáře
    containedItem?: {
        itemInstanceId: string; // Unique ID for this specific instance of the item
        baseItemId: string; // Odkaz na TradeGood_VisualDetail, CraftingComponent_Visual, ShipModuleData etc.
        quantity: number;
        // visualRepresentation_InSlot_AssetPath: string; // This is often the iconAsset from the base item.
                                                        // Duplicating it here might be redundant if baseItem data is fetched.
                                                        // However, if a slot can alter an item's appearance, it might be needed.
                                                        // For now, assume icon comes from baseItemId's definition.
    };
    isUnlocked: boolean;
    slotHighlight_CanDropHere_Color?: string; // Hex color
    slotHighlight_CannotDropHere_Color?: string; // Hex color
    slotType?: 'GeneralCargo' | 'WeaponModule' | 'SystemModule' | 'Consumable' | string; // Optional slot type
}

export interface CraftingComponent_Visual extends ItemIconDefinition {
    // Inherits iconAsset, size, tooltip keys from ItemIconDefinition
    // Similar to TradeGood_VisualDetail, but for crafting components
    materialType_cz: string; // např. "Kovová slitina", "Elektronický obvod", "Exotický krystal"
    rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Exotic';
    description_FlavorText_cz?: string;
    // Linked to a BaseItemData for stack size, etc.
}
