import React, { useState, useEffect } from 'react';
// Import necessary types from the newGameSetup.ts file
import {
    NewGameSetupScreenConfig,
    NewGameStepDefinition,
    // Will uncomment other types as they are used:
    // GameDifficulty,
    // PlayerOriginStory,
    // FactionId,
    // AlienRaceId
} from '../types/newGameSetup'; // Adjust path if necessary

// Placeholder for the actual configuration data.
// This would eventually be loaded or defined based on game data or a JSON file.
const newGameConfiguration: NewGameSetupScreenConfig = {
    id: "newGameSetupMain",
    screenNameKey: "newGame.screen.title",
    defaultScreenName: "Nová Hra - Nastavení",
    panelStyle: {
        backgroundColor: "#050510",
        widthPercentOfScreen: 80,
        heightPercentOfScreen: 90,
        paddingPx: 20,
        borderColor: "#3388FF",
        borderWidthPx: 2,
    },
    navigation: {
        nextButton: {
            labelKey: "newGame.button.next",
            defaultLabel: "Další",
            action: { type: 'NAVIGATE_NEXT_STEP' },
            styleKey: "Button_Primary"
        },
        previousButton: {
            labelKey: "newGame.button.previous",
            defaultLabel: "Předchozí",
            action: { type: 'NAVIGATE_PREVIOUS_STEP' },
            styleKey: "Button_Secondary"
        },
        startGameButton: {
            labelKey: "newGame.button.startGame",
            defaultLabel: "Zahájit Hru",
            action: { type: 'START_GAME_PROCESS' },
            styleKey: "Button_Success_Large"
        },
        stepIndicator_Style: 'Dots_Horizontal',
    },
    steps: [
        // Example step - more steps will be defined later based on the prompt's example
        {
            stepId: "step_difficulty_placeholder",
            stepTitleKey: "newGame.step.difficulty.title",
            defaultStepTitle: "Krok 1: Nastavení Hry (Placeholder)",
            layoutColumns: 1,
            elements: [
                {
                    elementType: "Label_NewGameSetup", // This is not an actual property of LabelElement_NewGame but used for switch
                    id: "diff_label_placeholder",
                    labelKey: "newGame.difficulty.selectLabel.placeholder",
                    defaultLabel: "Zvolte Obtížnost: (Placeholder Content)",
                    labelStyleKey: "HeaderMedium_Panel",
                    itemType: "Label_NewGameSetup" // itemType is required by LabelElement_NewGame
                }
            ]
        }
    ],
    sharedTooltipStyle: { // Placeholder
        backgroundColor: "rgba(0,0,0,0.8)",
        textColor: "#FFFFFF"
    },
    defaultScreenTransitionIn: { type: 'fade', durationMs: 500 },
    defaultScreenTransitionOut: { type: 'fade', durationMs: 500 },
    soundEffects: {
        openScreen: "sfx/ui/new_game_screen_open.wav",
        closeScreen_Cancel: "sfx/ui/new_game_cancel_return_main_menu.wav",
        nextStep: "sfx/ui/new_game_next_step_confirm.wav",
        previousStep: "sfx/ui/new_game_previous_step_return.wav",
        selectionChange: "sfx/ui/new_game_selection_change_click.wav",
        startGame_Confirm: "sfx/ui/new_game_start_adventure_begin_confirm.wav"
    },
    playerData_Initial_StoreKey: "newGameSettings"
};

const NewGameSetupScreen: React.FC = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [gameData, setGameData] = useState<Record<string, any>>({}); // To store selections

    const currentStep: NewGameStepDefinition | null = newGameConfiguration.steps[currentStepIndex] || null;

    const handleNext = () => {
        if (currentStepIndex < newGameConfiguration.steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            // Handle start game
            console.log("Attempting to start game with data:", gameData);
            // alert("Game Started with data: " + JSON.stringify(gameData)); // Placeholder action
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    // Placeholder for rendering elements - will be expanded in later steps
    const renderStepElements = () => {
        if (!currentStep) return <p>Konfigurace kroku chybí.</p>; // Step configuration missing

        const elementsToRender = currentStep.elements.map((element, index) => {
            const key = `${currentStep.stepId}_elem_${index}_${element.id}`;
            // The 'element' is of type AnyNewGameSetupElement.
            // We need to check 'itemType' for Label and Spacer, and 'elementType' for others.
            
            const baseElement = element as import('../types/newGameSetup').BaseSettingItem; // For itemType
            const specificElement = element as any; // For elementType, cast to any for now

            if (baseElement.itemType === 'Label_NewGameSetup') {
                const labelElement = element as import('../types/newGameSetup').LabelElement_NewGame;
                // For 2-column layout, ensure the item itself doesn't try to take full width if not needed
                // by default, div takes full width. If specific sizing is needed, it should be handled by element's style
                return <div key={key}><p><strong>{labelElement.defaultLabel}</strong> (ID: {labelElement.id})</p></div>;
            } else if (baseElement.itemType === 'Spacer_NewGameSetup') {
                 const spacerElement = element as import('../types/newGameSetup').SpacerElement_NewGame;
                return <div key={key} style={{ height: `${spacerElement.heightPx}px` }} />;
            } else if (specificElement.elementType) {
                // Handle other specific elements based on elementType
                // This part will be expanded significantly in subsequent tasks
                return <div key={key}><p>Element: {specificElement.elementType} (ID: {specificElement.id})</p></div>;
            }
            
            return <div key={key}><p>Neznámý element (ID: {specificElement.id})</p></div>; // Unknown element
        });

        if (currentStep.layoutColumns === 2) {
            return (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {elementsToRender}
                </div>
            );
        } else {
            // Default to single column layout (block display for each element)
            return (
                <div>
                    {elementsToRender}
                </div>
            );
        }
    };
    
    if (!currentStep) {
        return <div>Chyba: Aktuální krok není definován.</div>; // Error: Current step not defined
    }

    // Basic styling to represent the panel
    const panelStyle: React.CSSProperties = {
        backgroundColor: newGameConfiguration.panelStyle.backgroundColor,
        width: `${newGameConfiguration.panelStyle.widthPercentOfScreen}%`,
        height: `${newGameConfiguration.panelStyle.heightPercentOfScreen}%`,
        padding: `${newGameConfiguration.panelStyle.paddingPx}px`,
        border: `${newGameConfiguration.panelStyle.borderWidthPx}px solid ${newGameConfiguration.panelStyle.borderColor}`,
        margin: 'auto',
        overflowY: 'auto',
        color: '#FFF' // Assuming text color should be light for a dark background
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111' }}>
            <div style={panelStyle}>
                <h1>{newGameConfiguration.defaultScreenName}</h1>
                <h2>{currentStep.defaultStepTitle} (Krok {currentStepIndex + 1} / {newGameConfiguration.steps.length})</h2>
                
                <div>
                    {/* Render step indicator (dots example) */}
                    {newGameConfiguration.navigation.stepIndicator_Style === 'Dots_Horizontal' && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            {newGameConfiguration.steps.map((_, index) => (
                                <span key={index} style={{
                                    height: '10px',
                                    width: '10px',
                                    backgroundColor: index === currentStepIndex ? '#3388FF' : '#555',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    margin: '0 5px'
                                }}></span>
                            ))}
                        </div>
                    )}
                </div>

                <div id="step_content_area">
                    {renderStepElements()}
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    {currentStepIndex > 0 && (
                        <button onClick={handlePrevious} style={{padding: '10px', backgroundColor: '#555', color: 'white'}}>
                            {newGameConfiguration.navigation.previousButton.defaultLabel}
                        </button>
                    )}
                    {currentStepIndex < newGameConfiguration.steps.length - 1 ? (
                        <button onClick={handleNext} style={{padding: '10px', backgroundColor: '#007bff', color: 'white'}}>
                            {newGameConfiguration.navigation.nextButton.defaultLabel}
                        </button>
                    ) : (
                        <button onClick={handleNext} style={{padding: '10px', backgroundColor: '#28a745', color: 'white'}}>
                            {newGameConfiguration.navigation.startGameButton.defaultLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewGameSetupScreen;
