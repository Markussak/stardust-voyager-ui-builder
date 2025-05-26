// From src/types/diplomacy.ts - to be used as FactionId for game setup logic
// Assuming this is the canonical FactionId for game logic data.
export enum FactionId {
  Player = "player",
  SolarConfederacy = "solar_confederacy",
  KrallEmpire = "krall_empire",
  CultOfTheNexus = "cult_of_the_nexus",
  FreeTradersSyndicate = "free_traders_syndicate",
  PirateClan_RedMasks = "pirate_clan_red_masks",
  Guardians_AncientAI = "guardians_ancient_ai"
  // Add other factions from the prompt or existing code if necessary
  // For now, sticking to what's in diplomacy.ts as a base
}

// As defined in the prompt
export enum GameDifficulty {
    Easy = "Easy",         // Lehká
    Normal = "Normal",       // Normální
    Hard = "Hard",         // Těžká
    Nightmare = "Nightmare",   // Noční můra
    Roguelike = "Roguelike"  // S permadeath a dalšími výzvami
}

export enum PlayerOriginStory { // Příklady počátečních scénářů/původů
    YoungAdventurer = "YoungAdventurer", // Mladý dobrodruh
    ExCorporatePilot = "ExCorporatePilot", // Bývalý korporátní pilot
    VeteranSmuggler = "VeteranSmuggler",   // Ostřílený pašerák
    RefugeeSurvivor = "RefugeeSurvivor",   // Přeživší uprchlík
    MysteriousPast = "MysteriousPast"    // Záhadná minulost
}

// Define AlienRaceId as a string type alias for clarity,
// referencing raceId from src/types/aliens.ts AlienRaceDefinition
export type AlienRaceId = string;

// Base interfaces from the prompt that are expected to exist
// Adding them here for now, will be refined if actual files are found.
// If ButtonStyleDefinition, TooltipStyleDefinition, ScreenTransitionEffect,
// ItemIconDefinition, PixelArtIllustration, BaseItemData, PlayerSkillDefinition
// are found elsewhere, these can be removed or adjusted.

export interface Vector2D { x: number; y: number; }
export interface ColorPalette { [name: string]: string | string[]; }
export interface AnimationParams { /* ... z předchozích promptů ... */ }

// Assuming ButtonStyleDefinition might be an object with styling props
export interface ButtonStyleDefinition {
  fontKey?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  padding?: string;
  // ... other style properties
}

// Assuming TooltipStyleDefinition
export interface TooltipStyleDefinition {
  backgroundAsset?: string;
  backgroundColor?: string;
  textColor?: string;
  // ... other style properties
}

// Assuming ScreenTransitionEffect
export interface ScreenTransitionEffect {
  type: 'fade' | 'slide' | 'wipe';
  durationMs: number;
  // ... other properties
}

// Assuming ItemIconDefinition
export interface ItemIconDefinition {
    iconAsset: string;
    size?: Vector2D;
}

// Assuming BaseItemData (as found in src/types/inventory.ts - but re-defining for now if needed by other types before full integration)
export interface BaseItemData {
  id: string;
  name: string;
  type: string;
  description?: string;
  // rarity, value etc. can be added if used by NewGameSetup types directly
}

// Assuming PlayerSkillDefinition might look like this (simplified from CrewSkill)
export interface PlayerSkillDefinition {
    skillId: string;
    skillName: string;
    level: number;
}

// Assuming ShipClassDefinition (simplified, actual is in ships-extended.ts)
// This is just for satisfying type checker for now if other types reference it before full context.
export interface ShipClassDefinition {
    classId: string;
    className: string;
    // other properties
}

// Assuming CrewMemberData (simplified)
export interface CrewMemberData {
    crewMemberId: string;
    name: string;
    // other properties
}

// Assuming PixelArtIllustration
export interface PixelArtIllustration {
    assetUrl: string;
    altTextKey?: string;
    defaultAltText?: string;
}

// BaseSettingItem as per prompt for Label and Spacer
export interface BaseSettingItem {
  id: string; // All settings items need an ID
  itemType: string; // Type discriminator
  tooltipTextKey?: string;
  defaultTooltipText?: string;
  // common properties for settings items
}

// Forward declaration for AnyNewGameSetupElement, as it's used by NewGameStepDefinition
// and defined later as a union type.
// The initial `type AnyNewGameSetupElement = any;` should be replaced by the final definition below.

// Define a base for ButtonDefinition_SettingsAction if not found elsewhere (as per plan)
// For now, make it simple.
export interface ButtonDefinition_SettingsAction {
    labelKey: string;
    defaultLabel: string;
    action: any; // General action type
    styleKey?: string; // Reference to a ButtonStyleDefinition
    tooltipTextKey?: string;
    defaultTooltipText?: string;
    iconAsset?: string;
}

// As defined in the prompt
export interface ButtonDefinition_NewGameAction extends ButtonDefinition_SettingsAction {
    action: {
        type: 'NAVIGATE_NEXT_STEP' | 'NAVIGATE_PREVIOUS_STEP' | 'START_GAME_PROCESS' | 'CANCEL_NEW_GAME_NAVIGATE_MAINMENU';
        target?: string; // Není zde potřeba, řízeno logikou kroků (Not needed here, controlled by step logic)
    };
}

export interface NewGameStepDefinition {
    stepId: string; // např. "step_difficulty", "step_character", "step_ship", "step_summary"
    stepTitleKey: string;
    defaultStepTitle: string; // Název kroku v ČEŠTINĚ (Step title in CZECH)
    layoutColumns: 1 | 2; // Počet sloupců pro uspořádání prvků v tomto kroku (Number of columns)
    elements: AnyNewGameSetupElement[]; // Prvky UI pro tento krok (UI elements for this step)
}

export interface NewGameSetupScreenConfig {
    id: string;
    screenNameKey: string;
    defaultScreenName: string; // "Nová Hra - Nastavení" (New Game - Settings)
    panelStyle: {
        backgroundImageAsset?: string;
        backgroundColor: string;
        borderColor?: string;
        borderWidthPx?: number;
        widthPercentOfScreen: number;
        heightPercentOfScreen: number;
        paddingPx: number;
    };
    navigation: {
        nextButton: ButtonDefinition_NewGameAction;
        previousButton: ButtonDefinition_NewGameAction;
        startGameButton: ButtonDefinition_NewGameAction; // Na posledním kroku (On the last step)
        stepIndicator_Style?: 'Dots_Horizontal' | 'NumberedTabs_Horizontal' | 'TextLabel_CurrentStep';
        stepIndicator_FontStyleKey?: string;
    };
    steps: NewGameStepDefinition[]; // Definice jednotlivých kroků nastavení (Definition of individual setup steps)
    sharedTooltipStyle: TooltipStyleDefinition; // Assuming TooltipStyleDefinition is already defined (as per previous step)
    defaultScreenTransitionIn: ScreenTransitionEffect; // Assuming ScreenTransitionEffect is already defined
    defaultScreenTransitionOut: ScreenTransitionEffect; // Assuming ScreenTransitionEffect is already defined
    soundEffects: {
        openScreen: string;
        closeScreen_Cancel: string;
        nextStep: string;
        previousStep: string;
        selectionChange: string;
        startGame_Confirm: string;
    };
    playerData_Initial_StoreKey: string; // Kam se ukládají počáteční data hráče před startem hry (Where initial player data is stored)
}

// LabelElement_NewGame and SpacerElement_NewGame
// These extend BaseSettingItem which was added in the previous step.

export interface LabelElement_NewGame extends BaseSettingItem {
    itemType: 'Label_NewGameSetup';
    labelKey: string;
    defaultLabel: string;
    labelStyleKey: string;
}

export interface SpacerElement_NewGame extends BaseSettingItem {
    itemType: 'Spacer_NewGameSetup';
    heightPx: number;
}

// Now, define the AnyNewGameSetupElement union type properly.
// This requires forward declarations or definitions of all member types.
// For now, include the ones defined in this step and assume others will be added.
// We will add DifficultySelectionElement, CharacterCreationElement etc. to this union in subsequent steps.

// Step 1: Volba Obtížnosti a Herních Módů (DifficultySelectionElement)

export interface DifficultyOption {
    difficulty: GameDifficulty; // GameDifficulty enum is expected to be already defined
    nameKey: string;
    defaultName: string; // "Lehká", "Normální", "Těžká", "Noční Můra", "Roguelike"
    descriptionKey: string;
    defaultDescription: string; // Popis, co obtížnost ovlivňuje (AI, zdroje, penalizace)
    iconAsset?: string; // Ikona pro obtížnost
    tooltipTextKey?: string;
    defaultTooltipText?: string;
}

export interface GameModeOption {
    modeId: 'Permadeath' | 'Ironman' | 'GalaxySeed_Custom';
    labelKey: string;
    defaultLabel: string; // "Trvalá Smrt", "Režim Ironman", "Vlastní Seed Galaxie"
    descriptionKey: string;
    defaultDescription: string;
    controlType: 'Checkbox' | 'TextInput_Seed';
    defaultValue_Checkbox?: boolean;
    textInput_PlaceholderKey?: string;
    defaultTextInput_Placeholder?: string; // "Zadejte seed (volitelné)"
    textInput_MaxLength?: number;
}

export interface DifficultySelectionElement {
    elementType: 'DifficultySelector_Buttons' | 'DifficultySelector_Dropdown' | 'GameMode_Checkbox' | 'GameMode_TextInput';
    id: string;
    // Pro DifficultySelector:
    options_Difficulty?: DifficultyOption[];
    defaultDifficulty?: GameDifficulty; // GameDifficulty enum
    selectedDifficulty_StoreKey?: string; // Kam se ukládá vybraná obtížnost
    buttonStyleKey_Difficulty?: string; // Styl pro tlačítka obtížnosti
    dropdownStyleKey_Difficulty?: string; // Styl pro dropdown obtížnosti
    // Pro GameMode:
    gameModeOption?: GameModeOption;
    currentValue_StoreKey_GameMode?: string; // Kam se ukládá stav/hodnota herního módu
    checkboxStyleKey_GameMode?: string;
    textInputStyleKey_GameMode?: string;
}

// Step 2: Tvorba/Výběr Postavy Pilota (CharacterCreationElement)

export interface CharacterRaceOption {
    raceId: AlienRaceId; // AlienRaceId is expected to be already defined (string alias)
    nameKey: string;
    defaultName: string; // Název rasy v ČEŠTINĚ
    descriptionKey: string;
    defaultDescription: string; // Popis rasy v ČEŠTINĚ
    portrait_BaseAssetPath_Template: string; // "assets/images/portraits/player/{raceId}/{gender}_base.png"
    availableGendersOrTypes?: string[]; // např. ["Male", "Female", "TypeA"]
    passiveBonuses_Description?: string[]; // Popis rasových bonusů v ČEŠTINĚ
    iconAsset?: string; // Ikona rasy
}

export interface PortraitCustomizationOption {
    featureId: 'HairColor' | 'SkinTone' | 'EyeColor' | 'FacialFeature_Scar' | 'Accessory_Glasses';
    labelKey: string;
    defaultLabel: string;
    controlType: 'ColorPalette_Selector' | 'Sprite_Toggle_OnOff' | 'Sprite_Selector_Multiple';
    // Pro ColorPalette_Selector:
    availableColors_Palette?: Array<{ nameKey: string; defaultName: string; hexColor: string; previewAsset?: string; }>;
    // Pro Sprite_Toggle_OnOff nebo Sprite_Selector_Multiple:
    spriteOverlay_AssetPath_Template?: string; // např. "assets/images/portraits/player/human/hair_style01_{colorVariant}.png"
    spriteVariantCount?: number;
}

export interface PlayerOriginOption {
    originId: PlayerOriginStory; // PlayerOriginStory enum is expected to be already defined
    nameKey: string;
    defaultName: string; // Název původu v ČEŠTINĚ
    descriptionKey: string;
    defaultDescription: string; // Popis původu v ČEŠTINĚ
    startingBonus_Description: string[]; // Popis počátečních bonusů/postihů v ČEŠTINĚ
    startingReputation_Changes?: Array<{ factionId: FactionId; changeAmount: number; }>; // FactionId enum is expected to be defined
    startingItem_Id?: string; // ID unikátního startovního předmětu
    startingQuest_Id?: string; // ID malé úvodní mise
    iconAsset?: string;
}

export interface CharacterCreationElement {
    elementType: 'TextInput_PlayerName' | 'Selector_Race' | 'Selector_GenderOrType' | 'PortraitDisplay_Interactive' | 'PortraitCustomization_Feature' | 'Selector_OriginStory';
    id: string;
    // Pro TextInput_PlayerName:
    labelKey_PlayerName?: string;
    defaultLabel_PlayerName?: string; // "Jméno Pilota:"
    placeholder_PlayerNameKey?: string;
    defaultPlaceholder_PlayerName?: string; // "Zadejte jméno"
    playerName_StoreKey?: string;
    textInputStyleKey_PlayerName?: string;
    // Pro Selector_Race:
    races_Available?: CharacterRaceOption[];
    selectedRace_StoreKey?: string;
    raceSelector_Style?: 'Dropdown' | 'ClickablePortraitList';
    // Pro Selector_GenderOrType: (závisí na vybrané rase)
    selectedGender_StoreKey?: string;
    // Pro PortraitDisplay_Interactive:
    portrait_StoreKey?: string; // Ukládá se finální sestavený portrét (nebo jeho komponenty)
    portraitBase_DynamicAssetPath?: string; // Cesta se mění dle rasy/pohlaví
    portraitLayers_Customizable?: Array<{ layerId: string; defaultAssetPath?: string; zIndex: number; }>; // Pro vrstvení účesů, doplňků
    // Pro PortraitCustomization_Feature:
    customizationOption?: PortraitCustomizationOption;
    customizationValue_StoreKey?: string; // např. "newGameSettings.character.hairColor"
    // Pro Selector_OriginStory:
    origins_Available?: PlayerOriginOption[];
    selectedOrigin_StoreKey?: string;
    originSelector_Style?: 'Dropdown_WithDescription' | 'CardList_Selectable';
}

// Step 3: Výběr Počáteční Lodi (ShipSelectionElement)

export interface StartingShipOption {
    shipClassId: string; // Odkaz na ShipClassDefinition (Prompt 26). Assumes ShipClassDefinition is available or will be.
    shipNameKey: string;
    defaultShipName: string; // Název třídy lodi v ČEŠTINĚ
    descriptionKey: string;
    defaultDescription: string; // Krátký popis role a výhod/nevýhod v ČEŠTINĚ
    spriteAsset_TopDown: string; // Hlavní sprite lodi pro zobrazení
    baseStats_Preview: Array<{ statNameKey: string; defaultStatName: string; value: string | number; unit?: string; }>; // Klíčové statistiky
    startingModules_Preview?: string[]; // Názvy základních modulů
    iconAsset?: string; // Menší ikona lodi pro seznam
}

export interface ShipColorOption {
    colorSchemeNameKey: string;
    defaultColorSchemeName: string; // např. "Modrá Ocel", "Pouštní Kamufláž"
    primaryColor_Hex: string;
    secondaryColor_Hex?: string;
    accentColor_Hex?: string;
    previewSpriteAsset_ColorSwatch: string; // Malý vzorek barvy
}

export interface ShipSelectionElement {
    elementType: 'ShipSelector_Gallery' | 'ShipName_Input' | 'ShipColor_Selector';
    id: string;
    // Pro ShipSelector_Gallery:
    availableStartingShips?: StartingShipOption[];
    selectedShip_StoreKey?: string;
    galleryItem_Style?: any; // Styl pro zobrazení jedné lodi v galerii (sprite, název, krátký popis)
    shipDetailPanel_Style?: any; // Styl pro panel zobrazující detaily vybrané lodi
    // Pro ShipName_Input:
    labelKey_ShipName?: string;
    defaultLabel_ShipName?: string; // "Jméno Lodi:"
    placeholder_ShipNameKey?: string;
    defaultPlaceholder_ShipName?: string; // "Moje Loď"
    shipName_StoreKey?: string;
    // Pro ShipColor_Selector:
    labelKey_ShipColor?: string;
    defaultLabel_ShipColor?: string; // "Barevné Schéma Lodi:"
    availableColorSchemes?: ShipColorOption[];
    selectedShipColor_StoreKey?: string;
    colorSelector_Style?: 'Palette_Grid' | 'ImagePreviews_HorizontalStrip';
}

// Step 4: Výběr Počáteční Posádky (CrewSelectionElement_Optional - volitelné)

export interface StartingCrewMemberOption {
    crewMemberPresetId: string; // Odkaz na předdefinovaného člena posádky nebo šablonu. Assumes CrewMemberData might be relevant.
    name: string; // Jméno v ČEŠTINĚ
    roleOrSpecializationKey: string;
    defaultRoleOrSpecialization: string; // např. "Zkušený Mechanik", "Mladý Střelec"
    shortBioKey: string;
    defaultShortBio: string; // Krátké bio v ČEŠTINĚ
    portraitAsset: string; // Portrét
    keySkill_Preview: { // PlayerSkillDefinition or a simplified version
        skillNameKey: string;
        defaultSkillName: string;
        level: number;
    };
}

export interface CrewSelectionElement_Optional {
    elementType: 'CrewSelector_Optional';
    id: string;
    maxStartingCrew_ExcludingPlayer: number; // např. 0, 1 nebo 2
    availableCrewPool?: StartingCrewMemberOption[]; // Seznam kandidátů k výběru
    selectedCrew_StoreKey?: string; // Pole ID vybraných členů
    selectionUI_Style?: 'CardList_WithCheckboxes' | 'PortraitGallery_Selectable';
    option_StartSolo_TextKey?: string;
    defaultOption_StartSolo_Text?: string; // "Začít Sám"
}

// Step 5: Souhrn a Zahájení Hry (SummaryDisplayElement)

export interface SummaryDisplayElement {
    elementType: 'SummaryPanel_ReviewChoices';
    id: string;
    titleKey: string;
    defaultTitle: string; // "Souhrn Vašich Voleb"
    sectionsToDisplay: Array<{ // Co všechno se v souhrnu zobrazí
        sectionTitleKey: string;
        defaultSectionTitle: string; // např. "Pilot", "Loď", "Obtížnost"
        data_StoreKeys_ToDisplay: Array<{
            labelKey: string;
            defaultLabel: string;
            valueStoreKey: string;
            displayFormat?: 'Text' | 'IconAndText';
        }>;
    }>;
    panelStyle: any; // Define more specific style type if available, using 'any' for now
}

// Temporary placeholder types for elements to be defined in later steps
export interface DifficultySelectionElement_TEMP_PLACEHOLDER { elementType: 'DifficultySelector_Buttons' | 'DifficultySelector_Dropdown' | 'GameMode_Checkbox' | 'GameMode_TextInput'; id: string; }
export interface CharacterCreationElement_TEMP_PLACEHOLDER { elementType: 'TextInput_PlayerName' | 'Selector_Race' | 'Selector_GenderOrType' | 'PortraitDisplay_Interactive' | 'PortraitCustomization_Feature' | 'Selector_OriginStory'; id: string; }
export interface ShipSelectionElement_TEMP_PLACEHOLDER { elementType: 'ShipSelector_Gallery' | 'ShipName_Input' | 'ShipColor_Selector'; id: string; }
export interface CrewSelectionElement_Optional_TEMP_PLACEHOLDER { elementType: 'CrewSelector_Optional'; id: string; }
export interface SummaryDisplayElement_TEMP_PLACEHOLDER { elementType: 'SummaryPanel_ReviewChoices'; id: string; }

// Update AnyNewGameSetupElement to use the actual types defined or placeholder-defined
// This replaces the earlier `type AnyNewGameSetupElement = any;`
// The worker should find and replace `type AnyNewGameSetupElement = any;` (if it was added by a previous step)
// or the initial forward declaration with this full definition.
export type AnyNewGameSetupElement = 
    DifficultySelectionElement | 
    CharacterCreationElement | 
    ShipSelectionElement | 
    CrewSelectionElement_Optional | 
    SummaryDisplayElement | 
    LabelElement_NewGame | 
    SpacerElement_NewGame;