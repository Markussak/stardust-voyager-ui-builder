// src/types/uiScreens.ts

export interface InitialLoadingScreenConfig {
    id: string; // "InitialLoadingScreen"
    screenName_cz: string; // "Načítání Hry"
    backgroundAsset_Animated_Path?: string; // "assets/images/ui/loading_screens/initial_load_animated_nebula_ship.png"
    logoGame_Display: boolean; // Zobrazit logo hry
    progressBar_Loading: {
        enabled: boolean;
        styleKey: string; // "ProgressBar_Loading_BlueWhite"
        labelText_cz_Template?: string; // "Načítání assetů: {percent}% ({currentAsset})"
    };
    loadingTips_cz?: string[]; // Pole tipů/lore textů zobrazovaných během načítání
    music_LoadingScreen_AssetPath: string; // "music/themes/loading_theme_ambient_hopeful.ogg"
    duration_MinSeconds: number; // Minimální doba zobrazení, i když se načte rychleji
    transitionTo_ScreenId: string; // "MainMenuScreen" (used by logic to know where to go next)
}

export interface TransitionLoadingScreenConfig {
    id: string; // "TransitionLoadingScreen"
    backgroundAsset_Subtle_Animated_Path?: string; // "assets/images/ui/loading_screens/transition_warp_lines_subtle_anim.png"
    loadingIndicator_Type: 'Spinning_Galaxy_Icon' | 'Pulsating_Nexus_Symbol' | 'Simple_Text_CZ';
    loadingIndicator_AssetPath?: string; // Pro ikonové indikátory
    loadingText_cz?: string; // "Načítání...", "Generování Systému...", "Synchronizace Dat..."
    fontStyleKey_LoadingText: string; // "StandardText_HUD_White"
    displayDuration_IfNoAsyncTask_ms: number; // Krátká doba zobrazení, pokud není žádná reálná práce na pozadí
}

// Placeholder for ScreenTransitionEffect if not defined elsewhere and needed by SceneManager concepts
// This was mentioned in previous prompts.
export interface ScreenTransitionEffect {
  type: 'fade' | 'slide' | 'wipe' | 'custom'; // Added 'custom' for more flexibility
  durationMs: number;
  shaderAsset_Path?: string; // For custom shader-based transitions
  // ... other properties like easing functions, direction for slide/wipe
}
