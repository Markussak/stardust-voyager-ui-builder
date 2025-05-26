// src/types/ship_visuals.ts

import { Vector2D, ColorPalette, AnimationParams } from './visuals_core'; // Adjust path if visuals_core.ts is not in the same directory

// --- From Prompt 35, Section IV: Detailování Lodí a Materiálovost ---

export interface ShipGreebleDefinition {
    greebleType: string; // Example: 'CoolingVent_Small', 'ServiceHatch_Rectangular', etc. from prompt
    sizePx_Range: [Vector2D, Vector2D];
    texture_Asset_Key: string; // např. "greeble_vent_dark_pixelated"
    placementLogic_Tags: string[]; // Kam se typicky umisťuje
    animation_IfActive?: AnimationParams;
}

export interface ShipPanelingStyle {
    panelShapeVariety: Array<'Rect_Beveled' | 'Hex_Tech' | 'Triangle_Inset' | 'Organic_Curved_Alien' | string>; // Allow custom strings
    panelTexture_Key_Template: string; // např. "panel_metal_worn_{variant}.png"
    panelLayering_Depth_Px: number; // 1-3px
    jointType_BetweenPanels: 'Visible_Seam_DarkLine' | 'Welded_IrregularTexture' | 'Riveted_PixelDots';
}

export interface ShipWearAndTearProfile {
    scratchProfile_Key: string; // např. "scratches_fine_surface_light"
    dentProfile_Key: string; // např. "dents_medium_impact_shaded"
    burnMark_Asset_Template_ByWeaponType?: Record<string, string>; // e.g., { "Laser": "decal_burn_laser_elongated.png" }
    rustOxidation_Texture_Key?: string;
    dirtGrime_Overlay_Asset?: string;
    visibleRepairs_Asset_Template?: string; // e.g., "decal_repair_patch_metal_{variant}.png"
}

// For PBR-like shaders in pixel art
export interface ShipMaterialShaderProperties {
    albedoTexture_Asset_Key: string;
    metallicFactor_Texture_Or_Value?: string | number; // Path to texture or a direct 0-1 value
    roughnessFactor_Texture_Or_Value?: string | number; // Path to texture or a direct 0-1 value
    normalMap_PixelArt_Asset_Key?: string;
    emissiveTexture_Asset_Key?: string; // For lights, engines, etc.
}

export interface ShipVisualsConfig {
    configId: string; // e.g., "Fighter_ClassX_Visuals"
    baseSprite_AssetPath: string;
    greebles?: ShipGreebleDefinition[];
    panelingStyle?: ShipPanelingStyle;
    wearAndTearProfile?: ShipWearAndTearProfile; // Default wear level or specific profile
    materialProperties?: ShipMaterialShaderProperties; // Default material for the ship hull
    engineThrusterEffects?: AnimationParams & { position_Local: Vector2D; color: string; scale?: number }; // Multiple thrusters possible
    // Add other common visual elements like bridge lights, faction decals etc.
}

// --- From Prompt 37: Weapon Visuals (especially for new weapon types) ---

// Visuals for the Nuclear Warhead projectile (as part of its definition)
export interface NuclearMissileVisuals {
    assetType: 'Sprite_AnimatedSheet';
    assetUrl: string; // "assets/images/projectiles/nuclear_missile_flying_anim_sheet.png"
    animationParams: AnimationParams & { soundEffect_Loop?: string };
    colorPalette: ColorPalette;
    dimensionsPx: Vector2D;
    trailEffect?: { // Simplified trail effect definition for now
        type: 'Particle_Emitter' | 'Ribbon';
        durationMs: number;
        color: string; // Hex or from ColorPalette
        particleAsset?: string; // if Particle_Emitter
    };
}

// Visuals for Nuclear Detonation in Space
export interface NuclearDetonationEffect_Space_Visuals extends AnimationParams {
    // Inherits frameCount, speed, loop, spritesheetUrl from AnimationParams
    shockwaveRadius_Px: number;
    empRadius_Px?: number;
    radiationPulse_VisualAsset?: string;
}

// Visuals for Nuclear Detonation on Planet Surface
export interface NuclearDetonationEffect_Surface_Visuals extends AnimationParams {
    // Inherits frameCount, speed, loop, spritesheetUrl from AnimationParams
    mushroomCloud_HeightPx: number;
    fireballRadius_Px: number;
    groundZero_CraterTexture_Asset: string;
    destructionRadius_CityDamage_Px: number;
    fallout_VisualEffect_AreaTexture?: string;
}

// General placeholder for visual effects of other new weapon concepts
// (Gravitational, Bio, Nano, Psionic)
// These would eventually need their own detailed interfaces.
export interface PlaceholderWeaponEffectVisuals {
    effectId: string; // e.g., "SingularityCollapse", "NaniteCloudConsume"
    animation: AnimationParams;
    soundEffect_Key?: string;
    // Other specific properties
}

// Visual aspects of PlanetaryDefenseAsset (from Prompt 37, Section 0)
// This is a focused subset of PlanetaryDefenseAsset, specifically for visuals.
// The full PlanetaryDefenseAsset would be defined later (Step 8 of this plan).
export interface PlanetaryDefenseAsset_Visuals {
    visualAsset_SystemMap?: string; // How it's seen from system map (e.g., shield glow)
    visualAsset_OrbitalView?: string; // How it's seen from orbital view
    // Potentially animation for active state, impact effects etc.
    activeState_Animation?: AnimationParams;
    impactEffect_Animation?: AnimationParams;
}
