// src/types/configs_p45.ts

import { 
    VisualModuleRepresentation, // For ShipEditor
    ResearchNode_EnhancedVisuals, // For ResearchSystem
    TradeGood_VisualDetail, // For TradeSystem
    InventorySlot_Enhanced, // For ShipInventory
    CraftingComponent_Visual // For CraftingScreen
} from './mechanics_visuals_p45'; // Adjust path as needed
// Assuming ItemId is defined globally or imported where needed by specific features
export type ItemId_Placeholder = string;


// --- From Prompt 45 ---

// Section 1: Vylepšený Editor Lodí (ShipEditorEnhancementsConfig)
export interface ShipEditorEnhancementsConfig {
    id: "ShipEditorEnhancements"; // Literal type
    visualModuleRepresentation_InEditor?: {
        enabled: boolean;
        moduleSprite_Source_Path_Template: string; // Path to JSON: Array of VisualModuleRepresentation
        displayOnShip_As_2DTopDown_Sprite: boolean;
        showAttachmentPoints_And_Connections_Visual: boolean;
        allowPlayer_ModuleRotation_IfApplicable: boolean;
        moduleState_VisualFeedback_cz?: {
            active_cz: string;
            inactive_no_power_cz: string;
            damaged_cz: string;
        };
    };
    raceSpecific_ModuleAndBlock_Designs?: {
        enabled: boolean;
        appliesTo_ModuleTypes: string[]; // Array of ModuleType IDs/keys
        visualVariant_Source_Path_Template: string; // "assets/images/ship_modules/{moduleId}/styles/{raceIdOrFactionId}_{variant}.png"
        loreReason_For_VisualDifference_cz: string;
        playerCanChoose_Style_IfCompatible_WithShipHull: boolean;
    };
    newlyAdded_BlocksAndModules_Integration?: {
        ensure_VisualConsistency_With_Editor: boolean;
        ensure_FunctionalIntegration_In_StatsPanel: boolean;
        ensure_SlotCompatibility_Is_Defined: boolean;
    };
    ui_Enhancements_EditorScreen?: {
        moduleTooltip_Shows_Detailed3DPixelArtPreview_IfAvailable: boolean;
        comparison_UI_For_Modules_SideBySide_WithVisuals: boolean;
        shipStats_ImpactPreview_BeforeApplyingChanges_cz: string; // Descriptive
    };
    soundEffects_ModulePlacement_RaceSpecific_Optional?: boolean;
}

// Section 2: Vylepšený Výzkum a Vývoj (ResearchSystemEnhancementsConfig)
export interface ResearchSystemEnhancementsConfig {
    id: "ResearchSystemEnhancements"; // Literal type
    researchTree_ContentExpansion?: {
        newTechnology_Categories_cz?: Array<{
            categoryKey: string;
            displayName_cz: string;
            iconAsset: string;
            description_cz: string;
        }>;
        moreTechnologyNodes_PerCategory_Count?: [number, number];
        interconnectedTechWeb_InsteadOf_StrictTree_Optional?: boolean;
        rareBreakthroughTechs_ProceduralGeneration_Enabled?: boolean;
    };
    researchNode_VisualRepresentation_Enhanced?: { // Uses ResearchNode_EnhancedVisuals
        detailedTechIcon_SizePx?: { x: number; y: number };
        iconStyle_Reflects_TechType_And_Tier_cz?: string; // Descriptive
        backgroundAsset_Node_Thematic_Template?: string;
        connectionLine_Animated_DataFlow_Enhanced?: {
            animation_Spritesheet_Path: string;
            color_Changes_With_ResearchProgress: boolean;
        };
        unlockPreview_Detailed_cz?: string; // Descriptive
    };
    researchScreen_Background_VisualEnhancement?: {
        newBackgroundImage_AssetPath: string;
        parallaxLayers_Count?: number;
        ambientParticleEffects_FloatingDataBits_Enabled?: boolean;
        colorTheme_Overall_MoreScientific_LessGenericUI_cz?: string; // Descriptive
        sound_Ambient_ResearchLab_Loop?: string;
    };
}

// Section 3: Vylepšený Obchod (TradeSystemEnhancementsConfig)
export interface TradeSystemEnhancementsConfig {
    id: "TradeSystemEnhancements"; // Literal type
    newResource_And_TradeGood_Types_Path?: string; // Path to JSON: Array of extended ItemData/TradeGood_VisualDetail
    itemVisuals_TradeGoods_And_Resources_Enhanced?: {
        iconSize_StandardPx?: { x: number; y: number };
        styleGuideline_Reference?: string; // e.g., "PixelArtCorePhilosophy_From_Prompt35"
        tooltip_Shows_FlavorText_And_Origin_cz?: boolean;
        resourceIcon_Database_Path?: string; // Path to JSON: Catalog of item icons
    };
    tradeScreen_VisualOverhaul?: {
        backgroundImage_PerStationType_Or_Faction_Template?: string;
        traderNPC_Portrait_And_Dialogue_Integration?: boolean;
        itemSlots_VisualStyle_MoreThematic?: boolean;
        priceChange_Indicators_Animated_UpDownArrows_ColorCoded?: boolean;
        uiElements_PixelArt_Refinement_Overall?: string; // Descriptive, refers to P35
    };
    tradeContext_Restriction_Reminder_cz?: string; // Descriptive
}

// Section 4: Přepracovaný Inventář Lodi (ShipInventoryEnhancementsConfig)
export interface ShipInventoryEnhancementsConfig {
    id: "ShipInventoryEnhancements"; // Literal type
    layout_ImprovedReadability_cz?: string; // Descriptive
    itemSlot_Functionality_DragAndDrop_Enhanced?: {
        allow_RearrangingItems_Within_InventoryGrid: boolean;
        visualFeedback_Dragging_ItemSpriteFollowsCursor_SlightlyTransparent: boolean;
        visualFeedback_ValidDropTarget_SlotHighlight_Color?: string; // Hex color
        visualFeedback_InvalidDropTarget_SlotHighlight_Color?: string; // Hex color
    };
    action_JettisonCargo_IntoSpace?: {
        enabled: boolean;
        button_UI_Element_InInventoryScreen_cz?: {
            id: string; text_cz: string; iconAsset: string; styleKey: string;
        };
        confirmationDialog_Required_cz?: {
            title_cz: string; message_cz: string; confirmText_cz: string; cancelText_cz: string;
        };
        visualEffect_CargoPod_EjectedFromShip_AssetPath?: string;
        soundEffect_Jettison?: string;
        canBe_PickedUp_By_OtherShips_Or_PlayerLater_IfContainerized?: boolean;
    };
    inventoryCapacity_Expansion_VisualAndFunctional?: {
        initialSlotCount_BaseShip?: number;
        expansionMethod_Research_TechId_Template?: string;
        expansionMethod_ShipModule_ItemId_Template?: string; // ItemId_Placeholder
        visualChange_InInventoryUI_MoreSlotsAppear?: boolean;
        visualChange_OnShipModel_ExternalCargoPods_Optional?: boolean;
    };
    itemVisuals_AllLootableItems_PixelArt_Enhanced?: {
        requirement_cz: string; // Descriptive
        iconStyleConsistency_AcrossAllItemTypes?: boolean;
    };
    inventoryScreen_Background_VisualEnhancement?: {
        newBackgroundImage_AssetPath?: string;
        ambientLighting_And_Shadows_OnItems_InSlots_Subtle?: boolean;
    };
}

// Section 5: Vylepšení Vizuální Stránky Craftingu (CraftingScreenEnhancementsConfig)
export interface CraftingScreenEnhancementsConfig {
    id: "CraftingScreenEnhancements"; // Literal type
    newResource_Integration_In_Blueprints?: boolean;
    blueprintAndMaterial_IconVisuals_Consistent_And_Detailed?: boolean;
    craftingScreen_Background_VisualOverhaul?: {
        newBackgroundImage_AssetPath?: string;
        animation_Elements_In_Background_cz?: string[]; // Descriptive
        colorTheme_Industrial_HighTech_cz?: string; // Descriptive
    };
    craftingProcess_Animation_InUI_Enhanced?: {
        displayArea_ForItemBeingCrafted_Visual_cz?: string; // Descriptive
        animation_Spritesheet_Path_Template?: string; // "assets/images/fx/crafting/crafting_process_{itemCategory}_anim.png"
        duration_Matches_CraftingTime?: boolean;
        soundEffect_CraftingInProgress_SpecificToMaterial_Optional?: boolean;
    };
    resultItem_Preview_Enhanced_cz?: string; // Descriptive
}
