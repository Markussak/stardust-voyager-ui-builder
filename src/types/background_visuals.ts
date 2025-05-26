// src/types/background_visuals.ts

import { Vector2D, ColorPalette, AnimationParams } from './visuals_core'; // Adjust path if visuals_core.ts is not in the same directory

// --- From Prompt 35, Section VI: Vylepšení Pixel Artu Pozadí (Vesmír a Menu) ---

export interface NebulaProperties_Enhanced {
    structureStyle_cz: string; // "Vláknitá struktura, prachové pásy, shluky pixelů různých barev a jasu"
    colorPalette_RealismInspired_Keys: string[]; // např. ["HubblePalette_Orion", "JWST_Carina_Colors"]
    animation_InternalDynamics: AnimationParams; // Pomalé víření, posun plynu
    lighting_From_EmbeddedStars: boolean; // Osvětlení zevnitř mlhoviny
    layering_Count: [number, number]; // např. [3, 7] vrstev s různými blend módy
    texture_Asset_Template?: string; // e.g. "assets/images/backgrounds/nebulas/nebula_typeA_layer_{index}.png"
    shader_Effect_Key?: string; // Key for a procedural shader effect for nebula rendering
}

export interface StarfieldProperties_Enhanced {
    starSize_Pixel_Distribution: Record<string, number>; // např. { "1x1px": 0.7, "2x2px_Cross": 0.2, "3x3px_Diamond": 0.1 }
    starColor_Distribution_Realistic_cz: string; // "Převaha bílých a žlutých, méně modrých a červených"
    twinkleAnimation_Subtle?: AnimationParams; // Optional, if not all starfields twinkle or use global setting
    densityVariation_AcrossScreen_Factor: number; // 0 (uniformní) - 1 (velké rozdíly)
    parallaxLayers_Count: number;
    layer_Asset_Template?: string; // e.g. "assets/images/backgrounds/starfields/starfield_layer_{index}_density_{level}.png"
}

export interface DistantGalaxyProperties_Enhanced {
    sprite_AssetPath_Template: string; // "assets/images/backgrounds/galaxies/distant_spiral_{variant}.png"
    sprite_VariantCount: number; // Alespoň 10-20 variant galaxií
    sizePx_Range: [Vector2D, Vector2D]; // např. [[16,16], [128,128]]
    rotation_Slow_Animation?: AnimationParams;
    colorTint_Variation?: boolean; // Allow slight color variations for more diversity
}

export interface SpaceBackgroundElement_Enhanced {
    elementId: string; // Unique ID for this specific background element configuration
    elementType: 'Nebula_Volumetric_PixelArt' | 'Starfield_Deep_Layered' | 'DistantGalaxy_DetailedSprite';
    // Conditional properties based on elementType
    nebula_Properties?: NebulaProperties_Enhanced;
    starfield_Properties?: StarfieldProperties_Enhanced;
    distantGalaxy_Properties?: DistantGalaxyProperties_Enhanced;
    // Common properties for all background elements
    depthLayer: number; // For parallax effect, lower is further away
    blendMode?: 'Normal' | 'Additive' | 'Multiply' | 'Screen'; // CSS blend modes or similar
    opacity?: number; // 0-1
    position_Initial_Offset?: Vector2D; // Initial offset if not filling screen or centered
    scrollSpeedFactor?: Vector2D; // For parallax scrolling relative to camera movement
}

// Main configuration for a complete space background scene
export interface SpaceBackgroundConfig {
    configId: string; // e.g., "MainMenuBackground", "InSystemDeepSpace"
    backgroundColor_Fallback: string; // e.g., "#000005" (very dark blue)
    elements: SpaceBackgroundElement_Enhanced[]; // An array of different layers and elements
    globalTwinkleEffect_Stars?: AnimationParams; // A global twinkle effect for all starfields if not specified per layer
    music_Ambient_Loop_AssetPath?: string; // Associated ambient music for this background type
}
