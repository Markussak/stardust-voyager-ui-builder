// src/types/ui_enhancements_p40.ts

import { AnimationParams, Vector2D } from './visuals_core'; // Adjust path if needed
import { ScreenTransitionEffect } from './uiScreens'; // Adjust path if needed (where ScreenTransitionEffect was defined)

// --- From Prompt 40, Section 0 (New or extended types for UI related features) ---

export interface GalaxyMap_PlanetOrbitVisual {
    planetId: string;
    orbitPath_SpriteAsset?: string; // Pokud je to komplexní sprite
    orbitLine_Color: string; // Hex color with alpha
    orbitLine_ThicknessPx: number;
    orbitLine_Style: 'Solid' | 'Dashed_Faint';
    animation_PlanetOnOrbit: AnimationParams; // Animace pohybu planety po orbitě na mapě
    displayCondition: 'AlwaysVisible_IfSystemExplored' | 'Visible_IfScanned_Detailed';
}

export interface PopUpEventNotification_Style {
    panelStyleKey: string; // Odkaz na globální styl UI panelu (např. "WarningPopup", "InfoPopup")
    titleFont_StyleKey: string;
    messageFont_StyleKey: string;
    icon_ByEventType_AssetPath_Prefix: string; // "assets/images/icons/events/popup_icon_" (war.png, disaster.png, signal.png)
    buttonStyleKey_Primary: string;
    buttonStyleKey_Secondary?: string;
    animation_AppearDisappear: ScreenTransitionEffect; // ScreenTransitionEffect defined in uiScreens.ts
    soundEffect_OnAppear: string;
}

export interface ShipRepairMechanics {
    repairAtStation_UI_Integration_ScreenId: string; // Obrazovka stanice, kde je oprava
    repairCost_Credits_PerHullPoint: number;
    repairCost_Materials_ForHeavyDamage_Enabled: boolean;
    repairTime_Seconds_PerHullPoint_AtStation: number;
    fieldRepair_Using_ConsumableItem: {
        itemId_RepairKit_Basic: string; // ID itemu
        hullPointsRepaired_Basic: number;
        itemId_RepairKit_Advanced: string;
        hullPointsRepaired_Advanced: number;
        animation_RepairEffect_OnShip: AnimationParams; // Vizuální efekt opravy na lodi
        soundEffect_FieldRepair: string;
    };
    crewSkill_Engineering_Influence_OnRepairSpeedAndCost: boolean;
    moduleRepair_SeparateFromHull: boolean; // Zda se moduly opravují zvlášť (viz Prompt 39)
}
