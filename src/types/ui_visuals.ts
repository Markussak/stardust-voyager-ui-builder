// src/types/ui_visuals.ts

// --- From Prompt 35, Section V: Zjemnění Pixel Artu v Uživatelském Rozhraní (UI) ---

export interface UIPixelArtEnhancements {
    edgeDefinition_Style: 'Crisp_PixelPerfect' | 'Manual_AntiAlias_Subtle' | 'Dithered_SoftEdge_ForGlow';
    fontRendering_Mode: 'Native_PixelFont_NoAntiAlias' | 'PixelFont_With_Hinted_AntiAlias_IfLarge';
    panelTexturing_Detail: {
        backgroundTexture_Subtle_AssetPath_Template?: string; // např. "assets/ui/textures/panel_bg_metal_brushed_subtle_{variant}.png"
        gradientType_IfNoTexture: 'None' | 'Linear_Subtle_Dithered' | 'Radial_Soft_Dithered';
        innerBevel_Or_Shadow_DepthPx: number; // 0-2px
        borderStyle_Detail: 'SinglePixel_Contrast' | 'DoublePixel_Beveled' | 'Animated_EnergyBorder' | string; // Allow custom strings
    };
    iconDesign_Principles_cz: string[]; // ["Jasná silueta", "Omezená paleta (3-5 barev na ikonu)", "Sémantický detail", "Konzistence napříč sadou"]
    uiAnimation_Feel: 'Snappy_PixelPerfect_Frames' | 'Smooth_Minimal_Tweening_IfAppropriate';
    // This interface can be used to guide the styling of UI components,
    // potentially by having a global UI style configuration object of this type.
}

// Example of how it might be used in a specific UI component's style config
export interface ButtonStyleConfig_Enhanced {
    baseStyleKey: string; // Reference to a base CSS class or theme style
    pixelArtEnhancements?: UIPixelArtEnhancements; // Apply specific overrides or principles
    // Specific button states
    hoverEffect?: {
        animationType?: UIPixelArtEnhancements['uiAnimation_Feel'];
        sound_Asset?: string;
        // visual changes...
    };
    clickEffect?: {
        animationType?: UIPixelArtEnhancements['uiAnimation_Feel'];
        sound_Asset?: string;
        // visual changes...
    };
}
